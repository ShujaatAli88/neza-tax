import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Clock, Mail, Languages, UploadCloud } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { ContactForm } from "@/components/content/ContactForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { CONTACT_CONTENT } from "@/content/contact";
import { BUSINESS } from "@/config/business";
import { telHref, mailtoHref, directionsHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Neza Financial Group for tax services, business services, insurance, or mortgage loans. Request an appointment online or call us directly.",
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />

      <PageHeader eyebrow={CONTACT_CONTENT.intro.heading} title={CONTACT_CONTENT.title} />

      <section className="band-white section pt-0">
        <Container>
          <p className="prose-measure text-[1.05rem] text-[var(--color-ink-60)]">
            {CONTACT_CONTENT.intro.body}
          </p>
          <p className="mt-3 font-medium">{CONTACT_CONTENT.intro.note}</p>

          <div
            className="card-surface mt-8 flex flex-col items-center gap-6 p-6 text-center sm:flex-row sm:text-left"
            style={{ borderLeft: "4px solid var(--color-seal)" }}
          >
            <div
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full"
              style={{ boxShadow: "0 0 0 4px var(--color-ledger), 0 10px 24px -8px rgba(16,24,20,0.3)" }}
            >
              <Image
                src="/images/jose_profile_image.png"
                alt="Jose M. Gonzalez"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow" style={{ color: "var(--color-seal)" }}>
                Founder
              </p>
              <h3 className="mt-1 text-[1.15rem]">Jose M. Gonzalez</h3>
              <p className="mt-1.5 text-[0.92rem] text-[var(--color-ink-60)]">
                Personal service is at the heart of how we work — a real person follows up with
                you, not a call center.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="card-surface p-7 md:p-8">
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="card-surface group p-7" style={{ borderTop: "4px solid var(--color-tax)" }}>
                <IconBadge icon={MapPin} color="var(--color-tax)" size="sm" />
                <h3 className="mt-4 text-[1.05rem]">Visit Our Office</h3>

                <address className="mt-3 not-italic">
                  <p className="text-[0.95rem] font-medium">{BUSINESS.brand}</p>
                  <p className="mt-1 text-[0.85rem] text-[var(--color-ink-60)]">
                    Located at the Neza Tax Services office
                  </p>
                  <p className="mt-1.5 text-[0.9rem] text-[var(--color-ink-60)]">
                    {BUSINESS.address.street}
                    <br />
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                  </p>
                </address>

                <div className="mt-4 space-y-3 border-t border-[var(--color-rule)] pt-4 text-[0.9rem]">
                  <div className="flex items-start gap-2.5">
                    <Clock size={16} className="mt-0.5 shrink-0" style={{ color: "var(--color-tax)" }} aria-hidden="true" />
                    <p>
                      <span className="font-medium">Office Visits By Appointment</span>
                      <br />
                      <span className="text-[var(--color-ink-60)]">{BUSINESS.hours.note}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="shrink-0" style={{ color: "var(--color-tax)" }} aria-hidden="true" />
                    <a href={telHref()} className="underline underline-offset-4">
                      {BUSINESS.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="shrink-0" style={{ color: "var(--color-tax)" }} aria-hidden="true" />
                    <a href={mailtoHref()} className="underline underline-offset-4">
                      {BUSINESS.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Languages size={16} className="shrink-0" style={{ color: "var(--color-tax)" }} aria-hidden="true" />
                    <span>Se Habla Español</span>
                  </div>
                </div>

                <div className="mt-4 border-t border-[var(--color-rule)] pt-4">
                  <a
                    href={directionsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold"
                    style={{ color: "var(--color-tax)" }}
                  >
                    <MapPin size={16} aria-hidden="true" />
                    Get Directions
                  </a>
                </div>
              </div>

              <div className="card-surface group p-7" style={{ borderTop: "4px solid var(--color-insure)" }}>
                <IconBadge icon={Phone} color="var(--color-insure)" size="sm" />
                <h3 className="mt-4 text-[1.05rem]">Prefer to Call?</h3>
                <p className="mt-2 text-[0.92rem] text-[var(--color-ink-60)]">
                  Speak with a member of our team directly.
                </p>
                <Button href={telHref()} variant="secondary" className="mt-4 w-full">
                  <Phone size={16} aria-hidden="true" />
                  Call Us
                </Button>
              </div>
            </div>
          </div>

          {/* Secondary, supporting option — visually quieter than the form/sidebar
              above (no colored border-top, no primary/invert button) since this
              is not competing with the main contact form as a call to action.
              SecureDock is a separate, no-login upload tool — never the Client
              Portal — see src/config/business.ts. */}
          <div className="mt-8 flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-ledger)] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <IconBadge icon={UploadCloud} color="var(--color-ink-60)" size="sm" />
              <div>
                <h3 className="text-[1rem]">Need to send us documents?</h3>
                <p className="mt-1 text-[0.9rem] text-[var(--color-ink-60)]">
                  Securely send documents without logging into the Client Portal.
                </p>
              </div>
            </div>
            <Button
              href={BUSINESS.secureDockUrl}
              variant="secondary"
              external
              ariaLabel="Upload documents securely via SecureDock (opens in a new tab)"
              className="shrink-0"
            >
              Upload Documents Securely
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
