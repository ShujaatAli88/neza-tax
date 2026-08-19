import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, Landmark, Umbrella, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { PhotoFeatureBlock } from "@/components/content/PhotoFeatureBlock";
import { InsuranceDisclosure } from "@/components/compliance/InsuranceDisclosure";
import { MortgageDisclosure } from "@/components/compliance/MortgageDisclosure";
import { JsonLd, personSchema, breadcrumbSchema } from "@/lib/schema";
import { ABOUT_CONTENT } from "@/content/about";
import { telHref } from "@/lib/contact";

const HELP_ICONS = [Calculator, Landmark, Umbrella, Home];

// Bolds the client-specified phrase within a specific founder-bio paragraph
// (by 0-based index) without embedding markup in the plain-text content file.
const FOUNDER_BOLD: Record<number, string> = {
  0: "tax services, business services, life and health insurance, and mortgage lending",
  3: "Mortgage Loan Originator with C2 Financial Corporation",
};

function renderFounderParagraph(text: string, i: number) {
  const bold = FOUNDER_BOLD[i];
  if (!bold) return text;
  const idx = text.indexOf(bold);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong>{bold}</strong>
      {text.slice(idx + bold.length)}
    </>
  );
}

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
          <PhotoFeatureBlock
            image="/images/about-approach-photo-v2.jpg"
            imageAlt=""
            imageWidth={625}
            imageHeight={350}
            imageFit="framed"
            color="var(--color-tax)"
            eyebrow={ABOUT_CONTENT.approach.title}
            title={ABOUT_CONTENT.approach.paragraphs[0]}
            body={ABOUT_CONTENT.approach.paragraphs.slice(1)}
          />
        </Container>
      </section>

      <section className="band-white section">
        <Container>
          <SectionEyebrow className="mb-6">{ABOUT_CONTENT.founder.title}</SectionEyebrow>
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
                <p key={i}>{renderFounderParagraph(p, i)}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="band-ledger section">
        <Container>
          <SectionEyebrow>How We Can Help</SectionEyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {ABOUT_CONTENT.helpItems.map((item, i) => (
              <div
                key={item.title}
                className="card-surface group p-7"
                style={{ borderTop: `4px solid ${item.color}` }}
              >
                <IconBadge icon={HELP_ICONS[i]} color={item.color} />
                <h3 className="mt-5 text-[1.1rem]">{item.title}</h3>
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

      <section className="section bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[var(--color-eggshell)]">Ready to Get Started?</h2>
            <p className="prose-measure mt-3 text-[var(--color-chrome-muted)]">
              Whether you need help with <strong>Tax Services</strong>, <strong>Business Services</strong>,{" "}
              <strong>Insurance</strong>, or <strong>Mortgage Loans</strong>, we&rsquo;re here to help.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Button href="/contact" variant="invert">
              Request an Appointment
            </Button>
            <Button href={telHref()} variant="onChrome">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>

      <section className="band-ledger py-10">
        <Container>
          <SectionEyebrow className="mb-4">Licensing &amp; Disclosures</SectionEyebrow>
          <InsuranceDisclosure className="mb-4" />
          <MortgageDisclosure />
        </Container>
      </section>
    </>
  );
}
