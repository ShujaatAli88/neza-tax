import type { Metadata } from "next";
import { BookOpen, Wallet, Building2, FileCheck, ClipboardList, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { PhotoFeatureBlock } from "@/components/content/PhotoFeatureBlock";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { telHref } from "@/lib/contact";
import { BUSINESS } from "@/config/business";

export const metadata: Metadata = {
  title: "Business Services — Bookkeeping, Payroll & Business Formation",
  description:
    "Bookkeeping, payroll, business formation, S-corporation elections, business compliance support, and registered agent services from Neza Business Services.",
};

const SECTIONS = [
  {
    id: "bookkeeping",
    color: "var(--color-business)",
    Icon: BookOpen,
    title: "Bookkeeping Services",
    body: "QuickBooks setup, ongoing bookkeeping, account reconciliation, financial reporting, and clean-up services to help keep your books accurate and organized.",
  },
  {
    id: "payroll",
    color: "var(--color-tax)",
    Icon: Wallet,
    title: "Payroll Services",
    body: "Payroll processing, payroll tax deposits, quarterly and annual payroll tax filings, W-2s, and ongoing payroll support for businesses with employees.",
  },
  {
    id: "formation",
    color: "var(--color-mortgage)",
    Icon: Building2,
    title: "Business Formation",
    body: "Assistance with LLC and corporation formation, EIN applications, required filings, and other steps involved in getting your business established.",
  },
  {
    id: "s-corp",
    color: "var(--color-seal)",
    Icon: FileCheck,
    title: "S-Corporation Elections",
    body: "Assistance with Form 2553, election deadlines, and understanding the payroll and tax filing requirements that come with S corporation taxation.",
  },
  {
    id: "compliance",
    color: "var(--color-insure)",
    Icon: ClipboardList,
    title: "Business Compliance & Support",
    body: "Ongoing assistance with business filings, including Statements of Information, entity compliance requirements, and other administrative filings needed to keep your business in good standing.",
  },
  {
    id: "registered-agent",
    color: "var(--color-business)",
    Icon: MapPin,
    title: "Registered Agent Services",
    body: "Registered agent services for California businesses, providing a reliable point of contact for official state and legal correspondence.",
  },
];

export default function BusinessServicesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Business Services",
          description:
            "Bookkeeping, payroll, business formation, S-corp elections, business compliance support, and registered agent services.",
          url: "/business-services",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Business Services", path: "/business-services" },
        ])}
      />

      <PageHeader
        title="Practical support for starting, managing, and growing your business."
        sub="From business formation and bookkeeping to payroll and business compliance, Neza Tax Services helps business owners stay organized, compliant, and focused on running their business."
      />

      <Container className="pb-6 pt-1">
        <p className="text-[0.85rem] text-[var(--color-ink-60)]">
          Business Services provided by Neza Tax Services, part of Neza Financial Group LLC.
        </p>
      </Container>

      <section className="band-white section relative overflow-hidden pt-0">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />
        <Container className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="card-surface group scroll-mt-24 p-7"
                style={{ borderTop: `4px solid ${s.color}` }}
              >
                <IconBadge icon={s.Icon} color={s.color} />
                <h3 className="mt-5 text-[1.1rem]">{s.title}</h3>
                <p className="mt-3 text-[0.92rem] text-[var(--color-ink-60)]">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="band-ledger section">
        <Container>
          <PhotoFeatureBlock
            image="/images/business-services-support-photo.jpg"
            imageAlt=""
            imageWidth={1600}
            imageHeight={900}
            imageFit="framed"
            color="var(--color-ink)"
            eyebrow="Ongoing Business Support"
            title="One place for ongoing business support."
            body="Your business needs can change as you grow. From formation and registered agent services to bookkeeping, payroll, and ongoing compliance support, Neza Tax Services can help keep your business organized and on track."
            imagePosition="right"
          />
        </Container>
      </section>

      <section className="band-white section">
        <Container>
          <div
            className="card-surface flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10"
            style={{ borderTop: "4px solid var(--color-tax)" }}
          >
            <div>
              <h3>Need Business Tax Preparation?</h3>
              <p className="mt-2 text-[var(--color-ink-60)]">
                We also prepare tax returns for LLCs, partnerships, S corporations, and C
                corporations through Neza Tax Services.
              </p>
            </div>
            <Button href="/tax-services" variant="secondary" className="shrink-0">
              Explore Tax Services
            </Button>
          </div>
        </Container>
      </section>

      <section className="section bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[var(--color-eggshell)]">Let's talk about your business.</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              href={BUSINESS.schedulerUrl}
              variant="invert"
              external
              ariaLabel="Schedule an appointment — Business Services"
            >
              Schedule an Appointment
            </Button>
            <Button href={telHref()} variant="onChrome">
              Call Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
