import type { Metadata } from "next";
import { User, Building2, Briefcase, FileEdit, History } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHeader } from "@/components/content/PageHeader";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { YearRoundSupportBlock } from "@/components/content/YearRoundSupportBlock";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { TESTIMONIALS } from "@/content/testimonials";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Neza Tax Services — Tax Preparation for Individuals & Businesses",
  description:
    "Individual and business tax preparation, self-employed returns, amended and prior-year filing, and year-round tax support from Neza Tax Services.",
};

const SECTIONS = [
  {
    id: "individual",
    color: "var(--color-tax)",
    Icon: User,
    title: "Individual Tax Preparation",
    body: "W-2 employees, families, retirees and first-time filers. We review your situation carefully, look for deductions and credits you qualify for, and walk you through the return before it's filed.",
  },
  {
    id: "business",
    color: "var(--color-insure)",
    Icon: Building2,
    title: "Business Tax Returns",
    body: "Sole proprietors through corporations — Schedule C, 1065, 1120, and 1120-S. We handle the filing and the planning conversation that should happen before it.",
  },
  {
    id: "self-employed",
    color: "var(--color-mortgage)",
    Icon: Briefcase,
    title: "Self-Employed",
    body: "1099 contractors, gig work and freelancers. Self-employment tax, quarterly estimates, and the deductions people miss in their first year on their own.",
  },
  {
    id: "amended",
    color: "var(--color-ink)",
    Icon: FileEdit,
    title: "Amended Returns",
    body: "Filed something wrong, or found out later you missed a deduction. We'll review what was filed and correct it — generally within three years of the original filing.",
  },
  {
    id: "prior-year",
    color: "var(--color-seal)",
    Icon: History,
    title: "Prior-Year Returns",
    body: "Behind by a year, or by several. Bring what you have — missing documents can often be pulled directly from the IRS — and we'll get you caught up.",
  },
];

export default function TaxServicesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Tax Preparation",
          description:
            "Individual and business tax preparation, self-employed returns, amended and prior-year filing.",
          url: "/tax-services",
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tax Services", path: "/tax-services" }])} />

      <PageHeader
        eyebrow="Neza Tax Services"
        title="Professional tax preparation for individuals and businesses"
        sub="Tax preparation for clients across California and other states."
      />

      <section className="band-white section relative overflow-hidden pt-0">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />
        <Container className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="card-surface scroll-mt-24 p-7"
                style={{ borderTop: `4px solid ${s.color}` }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--color-white)]"
                  style={{ backgroundColor: s.color, boxShadow: `0 10px 20px -6px ${s.color}` }}
                >
                  <s.Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-[1.15rem]">{s.title}</h3>
                <p className="mt-3 text-[0.92rem] text-[var(--color-ink-60)]">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="band-ledger section">
        <Container>
          <YearRoundSupportBlock />
        </Container>
      </section>

      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />
        <Container className="relative z-10">
          <Eyebrow>What clients say</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <TestimonialCard
                key={t.author}
                {...t}
                color={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"][i]}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[var(--color-eggshell)]">Ready to file?</h2>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="invert">
              Book an appointment
            </Button>
            <Button href={telHref()} variant="onChrome">
              Call us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
