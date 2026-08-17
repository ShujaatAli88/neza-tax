"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  User,
  Phone as PhoneIcon,
  Mail,
  HelpCircle,
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle2,
  MailCheck,
  PhoneCall,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

const HELP_OPTIONS = [
  "Tax Services",
  "Business Services",
  "Life Insurance",
  "Health Insurance",
  "Mortgage Loans",
  "Other",
];

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

export function ContactForm() {
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
      helpType: String(data.get("helpType") ?? "").trim(),
      preferredDate: data.get("preferredDate"),
      preferredTime: data.get("preferredTime"),
      message: data.get("message"),
      website: data.get("website"), // honeypot — real visitors never see or fill this in
    };

    const errors: Record<string, string> = {};
    if (!payload.name) errors.name = "Name is required.";
    if (!payload.phone) errors.phone = "Phone is required.";
    if (!payload.email) errors.email = "Email is required.";
    else if (!EMAIL_RE.test(payload.email)) errors.email = "Enter a valid email address.";
    if (!payload.helpType) errors.helpType = "Please select how we can help.";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
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
    "w-full rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-white)] py-3 pr-4 pl-11 text-[0.95rem] transition-colors duration-150 focus:border-[var(--color-tax)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tax)]";
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
    const steps = [
      { Icon: MailCheck, label: "We'll review your message" },
      { Icon: CalendarCheck, label: "Confirm your appointment time" },
      { Icon: PhoneCall, label: "Follow up by phone or email" },
    ];

    return (
      <div role="status" aria-live="polite" className="card-surface p-8 text-center md:p-10">
        <span
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-[var(--color-white)]"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--color-tax), white 15%), color-mix(in srgb, var(--color-tax), black 15%))",
            boxShadow: "0 14px 28px -8px color-mix(in srgb, var(--color-tax), transparent 30%)",
          }}
        >
          <CheckCircle2 size={40} strokeWidth={2} aria-hidden="true" />
        </span>

        <h3 className="mt-5 text-[1.4rem]">Message sent!</h3>
        <p className="prose-measure mx-auto mt-2 text-[var(--color-ink-60)]">
          We usually reply within one business day. If it&rsquo;s urgent, call{" "}
          <a href={telHref()} className="font-medium underline underline-offset-4" style={{ color: "var(--color-tax)" }}>
            {BUSINESS.phone}
          </a>
          .
        </p>

        <div className="mt-8 grid gap-4 border-t border-[var(--color-rule)] pt-8 sm:grid-cols-3">
          {steps.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-tax), transparent 88%)" }}
              >
                <Icon size={18} style={{ color: "var(--color-tax)" }} aria-hidden="true" />
              </span>
              <p className="text-[0.82rem] text-[var(--color-ink-60)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real visitors and screen readers alike */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
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

      <div>
        <label htmlFor="helpType" className={labelClass}>
          How can we help? *
        </label>
        <FieldShell icon={HelpCircle}>
          <select id="helpType" name="helpType" required className={fieldClass("helpType")} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {HELP_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FieldShell>
        <FieldError field="helpType" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            Preferred Date
          </label>
          <FieldShell icon={Calendar}>
            <input id="preferredDate" name="preferredDate" type="date" className={inputClass} />
          </FieldShell>
        </div>
        <div>
          <label htmlFor="preferredTime" className={labelClass}>
            Preferred Time
          </label>
          <FieldShell icon={Clock}>
            <input id="preferredTime" name="preferredTime" type="time" className={inputClass} />
          </FieldShell>
        </div>
      </div>

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
