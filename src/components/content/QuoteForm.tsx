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
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

const QUOTE_TYPES = ["Life Insurance", "Health Insurance", "Employee Benefits"];

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
  const requestedType = searchParams.get("type");
  const initialType = QUOTE_TYPES.includes(requestedType ?? "") ? (requestedType as string) : "";

  const [quoteType, setQuoteType] = useState(initialType);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      quoteType: String(data.get("quoteType") ?? "").trim(),
      dateOfBirth: data.get("dateOfBirth"),
      zip: String(data.get("zip") ?? "").trim(),
      healthConditions: data.get("healthConditions"),
      householdIncome: data.get("householdIncome"),
      message: data.get("message"),
      website: data.get("website"), // honeypot — real visitors never see or fill this in
    };

    const errors: Record<string, string> = {};
    if (!payload.name) errors.name = "Name is required.";
    if (!payload.phone) errors.phone = "Phone is required.";
    if (!payload.email) errors.email = "Email is required.";
    else if (!EMAIL_RE.test(payload.email)) errors.email = "Enter a valid email address.";
    if (!payload.quoteType) errors.quoteType = "Please select a quote type.";
    if (!payload.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
    if (!payload.zip) errors.zip = "ZIP code is required.";

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
            className={fieldClass("quoteType")}
            value={quoteType}
            onChange={(e) => setQuoteType(e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            {QUOTE_TYPES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FieldShell>
        <FieldError field="quoteType" />
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name *
        </label>
        <FieldShell icon={User}>
          <input id="name" name="name" type="text" required className={fieldClass("name")} />
        </FieldShell>
        <FieldError field="name" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone *
          </label>
          <FieldShell icon={PhoneIcon}>
            <input id="phone" name="phone" type="tel" required className={fieldClass("phone")} />
          </FieldShell>
          <FieldError field="phone" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <FieldShell icon={Mail}>
            <input id="email" name="email" type="email" required className={fieldClass("email")} />
          </FieldShell>
          <FieldError field="email" />
        </div>
      </div>

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
              className={fieldClass("dateOfBirth")}
            />
          </FieldShell>
          <FieldError field="dateOfBirth" />
        </div>
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
              className={fieldClass("zip")}
            />
          </FieldShell>
          <FieldError field="zip" />
        </div>
      </div>

      {quoteType === "Life Insurance" && (
        <div>
          <label htmlFor="healthConditions" className={labelClass}>
            Health Conditions
          </label>
          <FieldShell icon={HeartPulse} align="top">
            <textarea
              id="healthConditions"
              name="healthConditions"
              rows={3}
              className={inputClass}
              placeholder="List any current health conditions, or leave blank if none."
            />
          </FieldShell>
        </div>
      )}

      {quoteType === "Health Insurance" && (
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
      )}

      <div>
        <label htmlFor="message" className={labelClass}>
          Message / Additional Information
        </label>
        <FieldShell icon={MessageSquare} align="top">
          <textarea id="message" name="message" rows={4} className={inputClass} />
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
