import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/content/PageHeader";
import { ContactForm } from "@/components/content/ContactForm";
import { MortgageDisclosure } from "@/components/compliance/MortgageDisclosure";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { CONTACT_CONTENT } from "@/content/contact";
import { BUSINESS, mortgageContact } from "@/config/business";
import { telHref, mailtoHref, directionsHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Neza Financial Group for tax services, business services, insurance, or mortgage loans. Request an appointment online or call us directly.",
};

export default function ContactPage() {
  const mortgage = mortgageContact();

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

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="card-surface p-7 md:p-8">
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="card-surface p-7" style={{ borderTop: "4px solid var(--color-tax)" }}>
                <h3 className="text-[1.05rem]">Visit Our Office</h3>
                <address className="mt-3 not-italic text-[0.95rem] text-[var(--color-ink-60)]">
                  {BUSINESS.brand}
                  <br />
                  {BUSINESS.address.street}
                  <br />
                  {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                  <br />
                  Office Visits By Appointment
                  <br />
                  {BUSINESS.hours.note}
                  <br />
                  <a href={telHref()} className="underline underline-offset-4">
                    {BUSINESS.phone}
                  </a>
                  <br />
                  <a href={mailtoHref()} className="underline underline-offset-4">
                    {BUSINESS.email}
                  </a>
                  <br />
                  Se Habla Español
                </address>
                <a
                  href={directionsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold"
                  style={{ color: "var(--color-tax)" }}
                >
                  <MapPin size={16} aria-hidden="true" />
                  Get Directions
                </a>
              </div>

              <div className="card-surface p-7" style={{ borderTop: "4px solid var(--color-insure)" }}>
                <h3 className="text-[1.05rem]">Prefer to Call?</h3>
                <p className="mt-2 text-[0.92rem] text-[var(--color-ink-60)]">
                  Speak with a member of our team directly.
                </p>
                <Button href={telHref()} variant="secondary" className="mt-4 w-full">
                  <Phone size={16} aria-hidden="true" />
                  Call Us
                </Button>
              </div>

              <div className="card-surface p-7" style={{ borderTop: "4px solid var(--color-mortgage)" }}>
                <h3 className="text-[1.05rem]">Mortgage Loans</h3>
                <p className="mt-2 text-[0.92rem] text-[var(--color-ink-60)]">
                  Contact Jose through C2 Financial for mortgage questions.
                </p>
                <address className="mt-3 not-italic text-[0.9rem] text-[var(--color-ink-60)]">
                  <a href={telHref(mortgage.phoneRaw)} className="underline underline-offset-4">
                    {mortgage.phone}
                  </a>
                  <br />
                  <a href={mailtoHref(mortgage.email)} className="underline underline-offset-4">
                    {mortgage.email}
                  </a>
                </address>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="band-ledger py-10">
        <Container>
          <MortgageDisclosure />
        </Container>
      </section>
    </>
  );
}
