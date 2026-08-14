import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHeader } from "@/components/content/PageHeader";
import { InsuranceDisclosure } from "@/components/compliance/InsuranceDisclosure";
import { MortgageDisclosure } from "@/components/compliance/MortgageDisclosure";
import { JsonLd, personSchema, breadcrumbSchema } from "@/lib/schema";
import { ABOUT_CONTENT } from "@/content/about";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About Neza Financial Group",
  description:
    "Neza Financial Group provides tax services, business services, insurance, and mortgage loans through Jose Gonzalez and the Neza Tax Services team.",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <PageHeader eyebrow={ABOUT_CONTENT.eyebrow} title={ABOUT_CONTENT.title} />

      <section className="band-white section pt-0">
        <Container>
          <div className="prose-measure space-y-4 text-[1.05rem] text-[var(--color-ink-60)]">
            {ABOUT_CONTENT.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="band-ledger section">
        <Container>
          <div className="card-surface p-8 md:p-10" style={{ borderTop: "4px solid var(--color-seal)" }}>
            <h2>{ABOUT_CONTENT.approach.title}</h2>
            <div className="prose-measure mt-4 space-y-3 text-[var(--color-ink-60)]">
              {ABOUT_CONTENT.approach.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="band-white section">
        <Container>
          <p className="eyebrow mb-6">{ABOUT_CONTENT.founder.title}</p>
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
            <div className="w-full max-w-[220px]">
              <div className="card-surface overflow-hidden">
                <Image
                  src="/images/jose_profile_image.png"
                  alt={ABOUT_CONTENT.founder.name}
                  width={512}
                  height={512}
                  className="aspect-square w-full object-cover"
                />
              </div>
              <p className="mt-4 text-[1.3rem]" style={{ fontFamily: "var(--font-display)" }}>
                {ABOUT_CONTENT.founder.name}
              </p>
              <p className="mt-1 font-mono text-[0.8rem] uppercase tracking-wide text-[var(--color-ink-60)]">
                {ABOUT_CONTENT.founder.role}
              </p>
            </div>
            <div className="prose-measure space-y-3 text-[var(--color-ink-60)]">
              {ABOUT_CONTENT.founder.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="band-ledger section">
        <Container>
          <Eyebrow>How We Can Help</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {ABOUT_CONTENT.helpItems.map((item) => (
              <div
                key={item.title}
                className="card-surface p-7"
                style={{ borderTop: `4px solid ${item.color}` }}
              >
                <h3 className="text-[1.1rem]">{item.title}</h3>
                <p className="mt-3 text-[0.92rem] text-[var(--color-ink-60)]">{item.body}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold"
                  style={{ color: item.color }}
                >
                  {item.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="band-white section">
        <Container>
          <div className="card-surface flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h3>{ABOUT_CONTENT.visit.title}</h3>
              <p className="mt-2 font-medium">{ABOUT_CONTENT.visit.hoursTitle}</p>
              <p className="mt-1 text-[var(--color-ink-60)]">{BUSINESS.hours.note}</p>
              <p className="mt-3 text-[0.8rem] text-[var(--color-ink-60)]">{ABOUT_CONTENT.visit.disclaimer}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Button href="/contact">Request an Appointment</Button>
              <Button href={telHref()} variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="band-ledger py-10">
        <Container>
          <p className="eyebrow mb-4">Licensing &amp; Disclosures</p>
          <InsuranceDisclosure className="mb-4" />
          <MortgageDisclosure />
        </Container>
      </section>
    </>
  );
}
