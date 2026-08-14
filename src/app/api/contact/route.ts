import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BUSINESS } from "@/config/business";

export const runtime = "nodejs";

const HELP_OPTIONS = [
  "Tax Services",
  "Business Services",
  "Life Insurance",
  "Health Insurance",
  "Mortgage Loans",
  "Other",
];

// Best-effort in-memory rate limit. Resets on cold start / redeploy and isn't
// shared across serverless instances — fine as a first layer, not a hard guarantee.
// For real guarantees under load, swap in Vercel KV or Upstash Redis.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please call us instead." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real users never populate this field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const helpType = typeof body.helpType === "string" ? body.helpType.trim() : "";
  const preferredDate = typeof body.preferredDate === "string" ? body.preferredDate.trim() : "";
  const preferredTime = typeof body.preferredTime === "string" ? body.preferredTime.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !phone || !helpType) {
    return NextResponse.json(
      { ok: false, error: "Name, phone, and how we can help are required." },
      { status: 400 },
    );
  }

  if (!HELP_OPTIONS.includes(helpType)) {
    return NextResponse.json({ ok: false, error: "Invalid selection." }, { status: 400 });
  }

  const submissionHtml = `
    <h2>New appointment request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email || "(not provided)")}</p>
    <p><strong>How can we help:</strong> ${escapeHtml(helpType)}</p>
    <p><strong>Preferred date:</strong> ${escapeHtml(preferredDate || "(not provided)")}</p>
    <p><strong>Preferred time:</strong> ${escapeHtml(preferredTime || "(not provided)")}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(message || "(none)").replace(/\n/g, "<br/>")}</p>
  `;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    // Not configured yet — don't lose the submission, but don't claim delivery either.
    console.warn(
      "[contact] SMTP not configured — logging submission instead of emailing.",
      { name, phone, email, helpType, preferredDate, preferredTime, message },
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email delivery isn't configured yet. Please call us at " + BUSINESS.phone + " instead.",
      },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT ?? 587) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"${BUSINESS.brand} Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email || undefined,
      subject: `New appointment request — ${helpType}`,
      html: submissionHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return NextResponse.json(
      { ok: false, error: "That didn't send. Please call us at " + BUSINESS.phone + " instead." },
      { status: 502 },
    );
  }
}
