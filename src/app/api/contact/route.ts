import { NextRequest, NextResponse } from "next/server";
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const helpType = typeof body.helpType === "string" ? body.helpType.trim() : "";
  const preferredDate = typeof body.preferredDate === "string" ? body.preferredDate.trim() : "";
  const preferredTime = typeof body.preferredTime === "string" ? body.preferredTime.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !phone || !email || !helpType) {
    return NextResponse.json(
      { ok: false, error: "Name, phone, email, and how we can help are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  if (!HELP_OPTIONS.includes(helpType)) {
    return NextResponse.json({ ok: false, error: "Invalid selection." }, { status: 400 });
  }

  // FormSubmit.co — free, no signup, no API key. The destination inbox gets a
  // one-time "Activate Form" email on the very first submission; every
  // submission after that is delivered automatically, forever, for free.
  const destination = process.env.CONTACT_TO_EMAIL || BUSINESS.email;

  try {
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(destination)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Phone: phone,
        Email: email,
        "How can we help": helpType,
        "Preferred date": preferredDate || "(not provided)",
        "Preferred time": preferredTime || "(not provided)",
        Message: message || "(none)",
        _subject: `New appointment request — ${helpType}`,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!formSubmitRes.ok) {
      const details = await formSubmitRes.text().catch(() => "");
      console.error("[contact] FormSubmit rejected the request:", formSubmitRes.status, details);
      return NextResponse.json(
        { ok: false, error: "That didn't send. Please call us at " + BUSINESS.phone + " instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to reach FormSubmit:", error);
    return NextResponse.json(
      { ok: false, error: "That didn't send. Please call us at " + BUSINESS.phone + " instead." },
      { status: 502 },
    );
  }
}
