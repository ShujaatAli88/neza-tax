import { NextRequest, NextResponse } from "next/server";
import { BUSINESS } from "@/config/business";

export const runtime = "nodejs";

// Kept in sync with QUOTE_TYPES (by slug) in QuoteForm.tsx. Medicare is
// deliberately absent — Medicare inquiries only go through the scheduler.
const QUOTE_TYPES = ["Life Insurance", "Health Insurance", "Employee Benefits", "Dental & Vision"];

// Best-effort in-memory rate limit — see the same note in api/contact/route.ts.
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
const ZIP_RE = /^\d{5}(-\d{4})?$/;

function str(body: Record<string, unknown>, key: string): string {
  return typeof body[key] === "string" ? (body[key] as string).trim() : "";
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
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const quoteType = str(body, "quoteType");
  const firstName = str(body, "firstName");
  const lastName = str(body, "lastName");
  const email = str(body, "email");
  const phone = str(body, "phone");
  const zip = str(body, "zip");
  const preferredContact = str(body, "preferredContact");
  const notes = str(body, "notes");

  // Shared fields required for every quote type.
  if (!firstName || !lastName || !phone || !email || !quoteType || !zip || !preferredContact) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  if (!QUOTE_TYPES.includes(quoteType)) {
    return NextResponse.json({ ok: false, error: "Invalid selection." }, { status: 400 });
  }

  if (!ZIP_RE.test(zip)) {
    return NextResponse.json({ ok: false, error: "Enter a valid ZIP code." }, { status: 400 });
  }

  const payload: Record<string, string> = {
    "Quote Type": quoteType,
    "First Name": firstName,
    "Last Name": lastName,
    Phone: phone,
    Email: email,
    "ZIP Code": zip,
    "Preferred Contact Method": preferredContact,
  };

  // Type-specific fields and their own required checks — a request for one
  // quote type is never blocked by fields that only apply to a different one.
  if (quoteType === "Life Insurance") {
    const dateOfBirth = str(body, "dateOfBirth");
    const tobaccoUse = str(body, "tobaccoUse");
    if (!dateOfBirth || !tobaccoUse) {
      return NextResponse.json(
        { ok: false, error: "Date of birth and tobacco use are required for a life insurance quote." },
        { status: 400 },
      );
    }
    payload["Date of Birth"] = dateOfBirth;
    payload["Tobacco Use"] = tobaccoUse;
    payload["Height"] = str(body, "height") || "(not provided)";
    payload["Weight"] = str(body, "weight") || "(not provided)";
    payload["Existing Health Conditions"] = str(body, "existingConditions") || "(none provided)";
    payload["Desired Coverage Amount"] = str(body, "coverageAmount") || "(not provided)";
    payload["Term Desired"] = str(body, "termDesired") || "(not provided)";
  }

  if (quoteType === "Health Insurance") {
    const householdSize = str(body, "householdSize");
    const currentlyInsured = str(body, "currentlyInsured");
    if (!householdSize || !currentlyInsured) {
      return NextResponse.json(
        { ok: false, error: "Household size and current coverage status are required for a health insurance quote." },
        { status: 400 },
      );
    }
    payload["Household Size"] = householdSize;
    payload["Currently Insured"] = currentlyInsured;
    payload["Household Income"] = str(body, "householdIncome") || "(none provided)";
  }

  if (quoteType === "Employee Benefits") {
    const businessName = str(body, "businessName");
    const numEmployees = str(body, "numEmployees");
    const industry = str(body, "industry");
    if (!businessName || !numEmployees || !industry) {
      return NextResponse.json(
        { ok: false, error: "Business name, number of employees, and industry are required for an employee benefits quote." },
        { status: 400 },
      );
    }
    payload["Business Name"] = businessName;
    payload["Number of Employees"] = numEmployees;
    payload["Industry"] = industry;
    payload["Current Carrier"] = str(body, "currentCarrier") || "(none)";
    payload["Benefits of Interest"] = str(body, "benefitsOfInterest") || "(none selected)";
  }

  if (quoteType === "Dental & Vision") {
    const applicantType = str(body, "applicantType");
    const numPeople = str(body, "numPeople");
    const coverageInterest = str(body, "coverageInterest");
    if (!applicantType || !numPeople || !coverageInterest) {
      return NextResponse.json(
        { ok: false, error: "Please complete the dental & vision coverage details." },
        { status: 400 },
      );
    }
    payload["Who Needs Coverage"] = applicantType;
    payload["Number of People"] = numPeople;
    payload["Coverage Interested In"] = coverageInterest;
  }

  payload["Notes"] = notes || "(none)";
  payload["_subject"] = `New insurance quote request — ${quoteType}`;
  payload["_template"] = "table";
  payload["_captcha"] = "false";

  const destination = process.env.CONTACT_TO_EMAIL || BUSINESS.email;

  try {
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(destination)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!formSubmitRes.ok) {
      const details = await formSubmitRes.text().catch(() => "");
      console.error("[insurance-quote] FormSubmit rejected the request:", formSubmitRes.status, details);
      return NextResponse.json(
        { ok: false, error: "That didn't send. Please call us at " + BUSINESS.phone + " instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[insurance-quote] Failed to reach FormSubmit:", error);
    return NextResponse.json(
      { ok: false, error: "That didn't send. Please call us at " + BUSINESS.phone + " instead." },
      { status: 502 },
    );
  }
}
