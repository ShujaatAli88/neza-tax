"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  Phone as PhoneIcon,
  Mail,
  Tag,
  Calendar,
  MapPinned,
  HeartPulse,
  Wallet,
  CheckCircle2,
  Ruler,
  Cigarette,
  DollarSign,
  CalendarClock,
  Building2,
  Hash,
  Briefcase,
  Shield,
  Users,
  Smile,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

// Slugs feed the /insurance/quote?type= URL param — must stay in sync with
// the `quoteSlug` values on the cards in src/app/insurance/page.tsx. Medicare
// is deliberately absent: Medicare inquiries only ever go through the
// appointment scheduler, never this form.
const QUOTE_TYPES = [
  { slug: "life", label: "Life Insurance" },
  { slug: "health", label: "Health Insurance" },
  { slug: "employee-benefits", label: "Employee Benefits" },
  { slug: "dental-vision", label: "Dental & Vision" },
] as const;

const BENEFITS_OF_INTEREST = ["Health", "Dental", "Vision", "Life Insurance", "Disability"];

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FieldShell({
  icon: Icon,
  align = "center",
  children,
}: {
  icon: typeof User;
  align?: "center" | "top";
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <Icon
        size={18}
        aria-hidden="true"
        className={`pointer-events-none absolute left-3.5 text-[var(--color-ink-60)] ${
          align === "top" ? "top-3.5" : "top-1/2 -translate-y-1/2"
        }`}
      />
      {children}
    </div>
  );
}

export function QuoteForm() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("type");
  const initialSlug = QUOTE_TYPES.some((t) => t.slug === requestedSlug) ? (requestedSlug as string) : "";

  const [quoteSlug, setQuoteSlug] = useState(initialSlug);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const quoteLabel = QUOTE_TYPES.find((t) => t.slug === quoteSlug)?.label ?? "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const str = (key: string) => String(data.get(key) ?? "").trim();

    // Only fields relevant to the selected quote type are read here — fields
    // for OTHER types were never rendered, so they're simply absent from
    // `data` (React unmounts them entirely, it doesn't just hide them).
    const payload: Record<string, unknown> = {
      quoteType: quoteLabel,
      firstName: str("firstName"),
      lastName: str("lastName"),
      email: str("email"),
      phone: str("phone"),
      zip: str("zip"),
      preferredContact: str("preferredContact"),
      notes: str("notes"),
      website: str("website"), // honeypot — real visitors never see or fill this in
    };

    const errors: Record<string, string> = {};
    if (!payload.firstName) errors.firstName = "First name is required.";
    if (!payload.lastName) errors.lastName = "Last name is required.";
    if (!payload.phone) errors.phone = "Phone is required.";
    if (!payload.email) errors.email = "Email is required.";
    else if (!EMAIL_RE.test(payload.email as string)) errors.email = "Enter a valid email address.";
    if (!quoteSlug) errors.quoteType = "Please select a quote type.";
    if (!payload.zip) errors.zip = "ZIP code is required.";
    if (!payload.preferredContact) errors.preferredContact = "Please select a preferred contact method.";

    if (quoteSlug === "life") {
      payload.dateOfBirth = str("dateOfBirth");
      payload.tobaccoUse = str("tobaccoUse");
      payload.height = str("height");
      payload.weight = str("weight");
      payload.existingConditions = str("existingConditions");
      payload.coverageAmount = str("coverageAmount");
      payload.termDesired = str("termDesired");
      if (!payload.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
      if (!payload.tobaccoUse) errors.tobaccoUse = "Please select an option.";
    }

    if (quoteSlug === "health") {
      payload.householdSize = str("householdSize");
      payload.currentlyInsured = str("currentlyInsured");
      payload.householdIncome = str("householdIncome");
      if (!payload.householdSize) errors.householdSize = "Household size is required.";
      if (!payload.currentlyInsured) errors.currentlyInsured = "Please select an option.";
    }

    if (quoteSlug === "employee-benefits") {
      payload.businessName = str("businessName");
      payload.numEmployees = str("numEmployees");
      payload.industry = str("industry");
      payload.currentCarrier = str("currentCarrier");
      payload.benefitsOfInterest = BENEFITS_OF_INTEREST.filter((b) => data.get(`benefit-${b}`) === "on").join(", ");
      if (!payload.businessName) errors.businessName = "Business name is required.";
      if (!payload.numEmployees) errors.numEmployees = "Number of employees is required.";
      if (!payload.industry) errors.industry = "Industry is required.";
    }

    if (quoteSlug === "dental-vision") {
      payload.applicantType = str("applicantType");
      payload.numPeople = str("numPeople");
      payload.coverageInterest = str("coverageInterest");
      if (!payload.applicantType) errors.applicantType = "Please select who needs coverage.";
      if (!payload.numPeople) errors.numPeople = "Number of people is required.";
      if (!payload.coverageInterest) errors.coverageInterest = "Please select a coverage option.";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/insurance-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.ok) {
        setStatus("success");
        setFieldErrors({});
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || `That didn't send. Call us at ${BUSINESS.phone} instead.`);
      }
    } catch {
      setStatus("error");
      setErrorMessage(`That didn't send. Check your connection, or call ${BUSINESS.phone}.`);
    }
  }

  const inputClass =
    "w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-white)] py-3 pr-4 pl-11 text-[0.95rem] transition-colors duration-150 focus:border-[var(--color-insure)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-insure)]";
  const labelClass = "mb-1.5 block text-[0.9rem] font-medium";

  function fieldClass(field: string) {
    return fieldErrors[field] ? `${inputClass} border-[var(--color-mortgage)]` : inputClass;
  }

  function FieldError({ field }: { field: string }) {
    if (!fieldErrors[field]) return null;
    return (
      <p role="alert" className="mt-1.5 text-[0.8rem] font-medium" style={{ color: "var(--color-mortgage)" }}>
        {fieldErrors[field]}
      </p>
    );
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="card-surface p-8 text-center md:p-10">
        <span
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-[var(--color-white)]"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--color-insure), white 15%), color-mix(in srgb, var(--color-insure), black 15%))",
            boxShadow: "0 14px 28px -8px color-mix(in srgb, var(--color-insure), transparent 30%)",
          }}
        >
          <CheckCircle2 size={40} strokeWidth={2} aria-hidden="true" />
        </span>

        <h3 className="mt-5 text-[1.4rem]">Quote request sent!</h3>
        <p className="prose-measure mx-auto mt-2 text-[var(--color-ink-60)]">
          We usually reply within one business day. If it&rsquo;s urgent, call{" "}
          <a href={telHref()} className="font-medium underline underline-offset-4" style={{ color: "var(--color-insure)" }}>
            {BUSINESS.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real visitors and screen readers alike */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="quote-website">Leave this field blank</label>
        <input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="quoteType" className={labelClass}>
          Quote Type *
        </label>
        <FieldShell icon={Tag}>
          <select
            id="quoteType"
            name="quoteType"
            required
            aria-required="true"
            className={fieldClass("quoteType")}
            value={quoteSlug}
            onChange={(e) => setQuoteSlug(e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            {QUOTE_TYPES.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.label}
              </option>
            ))}
          </select>
        </FieldShell>
        <FieldError field="quoteType" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name *
          </label>
          <FieldShell icon={User}>
            <input id="firstName" name="firstName" type="text" required aria-required="true" className={fieldClass("firstName")} />
          </FieldShell>
          <FieldError field="firstName" />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name *
          </label>
          <FieldShell icon={User}>
            <input id="lastName" name="lastName" type="text" required aria-required="true" className={fieldClass("lastName")} />
          </FieldShell>
          <FieldError field="lastName" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone *
          </label>
          <FieldShell icon={PhoneIcon}>
            <input id="phone" name="phone" type="tel" required aria-required="true" className={fieldClass("phone")} />
          </FieldShell>
          <FieldError field="phone" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <FieldShell icon={Mail}>
            <input id="email" name="email" type="email" required aria-required="true" className={fieldClass("email")} />
          </FieldShell>
          <FieldError field="email" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="zip" className={labelClass}>
            ZIP Code *
          </label>
          <FieldShell icon={MapPinned}>
            <input
              id="zip"
              name="zip"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{5}(-[0-9]{4})?"
              required
              aria-required="true"
              className={fieldClass("zip")}
            />
          </FieldShell>
          <FieldError field="zip" />
        </div>
        <div>
          <label htmlFor="preferredContact" className={labelClass}>
            Preferred Contact Method *
          </label>
          <FieldShell icon={PhoneIcon}>
            <select
              id="preferredContact"
              name="preferredContact"
              required
              aria-required="true"
              className={fieldClass("preferredContact")}
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
              <option value="Text">Text</option>
            </select>
          </FieldShell>
          <FieldError field="preferredContact" />
        </div>
      </div>

      {/* Type-specific fields — a fully separate subtree per type, so React
          unmounts (not just hides) whatever isn't the current selection.
          aria-live announces the change to screen reader users when the
          quote type selection swaps this section's contents. */}
      <div aria-live="polite">
        {quoteSlug === "life" && (
          <fieldset className="space-y-5 border-t border-[var(--color-rule)] pt-5">
            <legend className="mb-1 text-[0.85rem] font-semibold uppercase tracking-wide text-[var(--color-ink-60)]">
              Life Insurance Details
            </legend>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="dateOfBirth" className={labelClass}>
                  Date of Birth *
                </label>
                <FieldShell icon={Calendar}>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    aria-required="true"
                    className={fieldClass("dateOfBirth")}
                  />
                </FieldShell>
                <FieldError field="dateOfBirth" />
              </div>
              <div>
                <label htmlFor="tobaccoUse" className={labelClass}>
                  Tobacco Use *
                </label>
                <FieldShell icon={Cigarette}>
                  <select
                    id="tobaccoUse"
                    name="tobaccoUse"
                    required
                    aria-required="true"
                    className={fieldClass("tobaccoUse")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </FieldShell>
                <FieldError field="tobaccoUse" />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="height" className={labelClass}>
                  Height
                </label>
                <FieldShell icon={Ruler}>
                  <input id="height" name="height" type="text" placeholder={`e.g. 5'10"`} className={inputClass} />
                </FieldShell>
              </div>
              <div>
                <label htmlFor="weight" className={labelClass}>
                  Weight
                </label>
                <FieldShell icon={Ruler}>
                  <input id="weight" name="weight" type="text" placeholder="e.g. 180 lbs" className={inputClass} />
                </FieldShell>
              </div>
            </div>

            <div>
              <label htmlFor="existingConditions" className={labelClass}>
                Existing Health Conditions
              </label>
              <FieldShell icon={HeartPulse} align="top">
                <textarea
                  id="existingConditions"
                  name="existingConditions"
                  rows={3}
                  className={inputClass}
                  placeholder="List any current health conditions, or leave blank if none."
                />
              </FieldShell>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="coverageAmount" className={labelClass}>
                  Desired Coverage Amount
                </label>
                <FieldShell icon={DollarSign}>
                  <input
                    id="coverageAmount"
                    name="coverageAmount"
                    type="text"
                    placeholder="e.g. $250,000"
                    className={inputClass}
                  />
                </FieldShell>
              </div>
              <div>
                <label htmlFor="termDesired" className={labelClass}>
                  Term Desired
                </label>
                <FieldShell icon={CalendarClock}>
                  <select id="termDesired" name="termDesired" className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="10 years">10 years</option>
                    <option value="15 years">15 years</option>
                    <option value="20 years">20 years</option>
                    <option value="30 years">30 years</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </FieldShell>
              </div>
            </div>
          </fieldset>
        )}

        {quoteSlug === "health" && (
          <fieldset className="space-y-5 border-t border-[var(--color-rule)] pt-5">
            <legend className="mb-1 text-[0.85rem] font-semibold uppercase tracking-wide text-[var(--color-ink-60)]">
              Health Insurance Details
            </legend>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="householdSize" className={labelClass}>
                  Household Size *
                </label>
                <FieldShell icon={Users}>
                  <input
                    id="householdSize"
                    name="householdSize"
                    type="number"
                    min={1}
                    required
                    aria-required="true"
                    placeholder="Number of people needing coverage"
                    className={fieldClass("householdSize")}
                  />
                </FieldShell>
                <FieldError field="householdSize" />
              </div>
              <div>
                <label htmlFor="currentlyInsured" className={labelClass}>
                  Currently Insured? *
                </label>
                <FieldShell icon={Shield}>
                  <select
                    id="currentlyInsured"
                    name="currentlyInsured"
                    required
                    aria-required="true"
                    className={fieldClass("currentlyInsured")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FieldShell>
                <FieldError field="currentlyInsured" />
              </div>
            </div>

            <div>
              <label htmlFor="householdIncome" className={labelClass}>
                Household Income
              </label>
              <FieldShell icon={Wallet}>
                <input
                  id="householdIncome"
                  name="householdIncome"
                  type="text"
                  inputMode="numeric"
                  className={inputClass}
                  placeholder="Approximate annual household income"
                />
              </FieldShell>
            </div>
          </fieldset>
        )}

        {quoteSlug === "employee-benefits" && (
          <fieldset className="space-y-5 border-t border-[var(--color-rule)] pt-5">
            <legend className="mb-1 text-[0.85rem] font-semibold uppercase tracking-wide text-[var(--color-ink-60)]">
              Business & Group Details
            </legend>

            <div>
              <label htmlFor="businessName" className={labelClass}>
                Business Name *
              </label>
              <FieldShell icon={Building2}>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  aria-required="true"
                  className={fieldClass("businessName")}
                />
              </FieldShell>
              <FieldError field="businessName" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="numEmployees" className={labelClass}>
                  Number of Employees *
                </label>
                <FieldShell icon={Hash}>
                  <input
                    id="numEmployees"
                    name="numEmployees"
                    type="number"
                    min={1}
                    required
                    aria-required="true"
                    className={fieldClass("numEmployees")}
                  />
                </FieldShell>
                <FieldError field="numEmployees" />
              </div>
              <div>
                <label htmlFor="industry" className={labelClass}>
                  Industry *
                </label>
                <FieldShell icon={Briefcase}>
                  <input id="industry" name="industry" type="text" required aria-required="true" className={fieldClass("industry")} />
                </FieldShell>
                <FieldError field="industry" />
              </div>
            </div>

            <div>
              <label htmlFor="currentCarrier" className={labelClass}>
                Current Carrier (if any)
              </label>
              <FieldShell icon={Shield}>
                <input id="currentCarrier" name="currentCarrier" type="text" className={inputClass} />
              </FieldShell>
            </div>

            <fieldset>
              <legend className={labelClass}>Benefits of Interest</legend>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {BENEFITS_OF_INTEREST.map((b) => (
                  <label key={b} className="flex items-center gap-2 text-[0.92rem]">
                    <input type="checkbox" name={`benefit-${b}`} className="h-4 w-4 accent-[var(--color-insure)]" />
                    {b}
                  </label>
                ))}
              </div>
            </fieldset>
          </fieldset>
        )}

        {quoteSlug === "dental-vision" && (
          <fieldset className="space-y-5 border-t border-[var(--color-rule)] pt-5">
            <legend className="mb-1 text-[0.85rem] font-semibold uppercase tracking-wide text-[var(--color-ink-60)]">
              Dental &amp; Vision Details
            </legend>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="applicantType" className={labelClass}>
                  Who Needs Coverage? *
                </label>
                <FieldShell icon={Users}>
                  <select
                    id="applicantType"
                    name="applicantType"
                    required
                    aria-required="true"
                    className={fieldClass("applicantType")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="Individual">Individual</option>
                    <option value="Family">Family</option>
                  </select>
                </FieldShell>
                <FieldError field="applicantType" />
              </div>
              <div>
                <label htmlFor="numPeople" className={labelClass}>
                  Number of People *
                </label>
                <FieldShell icon={Hash}>
                  <input
                    id="numPeople"
                    name="numPeople"
                    type="number"
                    min={1}
                    required
                    aria-required="true"
                    className={fieldClass("numPeople")}
                  />
                </FieldShell>
                <FieldError field="numPeople" />
              </div>
            </div>

            <div>
              <label htmlFor="coverageInterest" className={labelClass}>
                Coverage Interested In *
              </label>
              <FieldShell icon={Smile}>
                <select
                  id="coverageInterest"
                  name="coverageInterest"
                  required
                  aria-required="true"
                  className={fieldClass("coverageInterest")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Dental">Dental</option>
                  <option value="Vision">Vision</option>
                  <option value="Both">Both</option>
                </select>
              </FieldShell>
              <FieldError field="coverageInterest" />
            </div>
          </fieldset>
        )}
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Additional Notes
        </label>
        <FieldShell icon={MessageCircle} align="top">
          <textarea id="notes" name="notes" rows={4} className={inputClass} />
        </FieldShell>
      </div>

      {status === "error" && (
        <p role="alert" className="text-[0.9rem] font-medium" style={{ color: "var(--color-mortgage)" }}>
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Get My Quote"}
      </Button>

      <div className="space-y-1.5 border-t border-[var(--color-rule)] pt-4 text-[0.8rem] text-[var(--color-ink-60)]">
        <p>Submitting this form does not guarantee coverage, pricing, or eligibility.</p>
        <p>
          The information above, including any health or income details you provide, is used
          solely to prepare your quote and will be handled in accordance with our{" "}
          <Link href="/legal/privacy" className="font-medium underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
