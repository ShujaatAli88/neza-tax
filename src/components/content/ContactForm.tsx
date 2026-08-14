"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/config/business";

const HELP_OPTIONS = [
  "Tax Services",
  "Business Services",
  "Life Insurance",
  "Health Insurance",
  "Mortgage Loans",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      helpType: data.get("helpType"),
      preferredDate: data.get("preferredDate"),
      preferredTime: data.get("preferredTime"),
      message: data.get("message"),
      company: data.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.ok) {
        setStatus("success");
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
    "w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-white)] px-4 py-3 text-[0.95rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]";
  const labelClass = "mb-1.5 block text-[0.9rem] font-medium";

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card-surface p-8"
        style={{ borderTop: "4px solid var(--color-tax)" }}
      >
        <p className="text-[1.05rem] font-medium">Message sent.</p>
        <p className="mt-2 text-[var(--color-ink-60)]">
          Jose usually replies within one business day. If it&rsquo;s urgent, call{" "}
          {BUSINESS.phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real visitors, invisible to screen readers */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name *
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="helpType" className={labelClass}>
          How can we help? *
        </label>
        <select id="helpType" name="helpType" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {HELP_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            Preferred Date
          </label>
          <input id="preferredDate" name="preferredDate" type="date" className={inputClass} />
        </div>
        <div>
          <label htmlFor="preferredTime" className={labelClass}>
            Preferred Time
          </label>
          <input id="preferredTime" name="preferredTime" type="time" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message / Additional Information
        </label>
        <textarea id="message" name="message" rows={4} className={inputClass} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[0.9rem] font-medium" style={{ color: "var(--color-mortgage)" }}>
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Request Appointment"}
      </Button>

      <div className="space-y-1.5 border-t border-[var(--color-rule)] pt-4 text-[0.8rem] text-[var(--color-ink-60)]">
        <p>Submitting this form does not confirm an appointment. We will contact you to confirm availability.</p>
        <p>
          Please do not include Social Security numbers, tax documents, financial account numbers, or
          other sensitive personal information in this form.
        </p>
      </div>
    </form>
  );
}
