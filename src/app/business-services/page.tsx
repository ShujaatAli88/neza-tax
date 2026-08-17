import type { Metadata } from "next";
import { BookOpen, Wallet, FileText, Building2, FileCheck, Lightbulb } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { PhotoFeatureBlock } from "@/components/content/PhotoFeatureBlock";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Business Services — Bookkeeping, Payroll & LLC Formation",
  description:
    "Bookkeeping, payroll, business tax preparation, LLC and corporation formation, S-corporation elections and business consulting from Neza Business Services.",
};

const SECTIONS = [
  {
    id: "bookkeeping",
    color: "var(--color-ink)",
    Icon: BookOpen,
    title: "Bookkeeping & Accounting",
    body: "From getting QuickBooks set up right to a fully hands-off monthly close — we keep your books accurate and ready for tax time, not just caught up in April.",
  },
  {
    id: "payroll",
    color: "var(--color-tax)",
    Icon: Wallet,
    title: "Payroll Services",
    body: "Submit your employees' hours and we handle the rest, including quarterly returns with the IRS and EDD.",
  },
  {
    id: "business-tax",
    color: "var(--color-insure)",
    Icon: FileText,
    title: "Business Tax Preparation",
    body: "The tax side of running a business — handled by the same person who does your bookkeeping and payroll, so nothing falls through the cracks between them.",
  },
  {
    id: "formation",
    color: "var(--color-mortgage)",
    Icon: Building2,
    title: "LLC & Corporation Formation",
    body: "Setting up an LLC or corporation the right way from day one — entity choice, paperwork, and the accounts you'll need before your first client payment.",
  },
  {
    id: "s-corp",
    color: "var(--color-seal)",
    Icon: FileCheck,
    title: "S-Corporation Elections",
    body: "Form 2553, the deadlines around it, and what changes about your bookkeeping and payroll once the election is in place.",
  },
  {
    id: "consulting",
    color: "var(--color-ink)",
    Icon: Lightbulb,
    title: "Business Consulting",
    body: "Entity structure reviews, growth planning, and a second set of eyes on the business — on an ongoing or as-needed basis.",
  },
];

export default function BusinessServicesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Business Services",
          description:
            "Bookkeeping, payroll, business tax preparation, LLC and corporation formation, S-corp elections and consulting.",
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
        title="Business services"
        sub="Whether you're a two-person shop or a growing corporation, the paperwork shouldn't be the thing that slows you down."
      />

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
            image="/images/business-services-photo.png"
            imageAlt=""
            imageWidth={731}
            imageHeight={694}
            color="var(--color-ink)"
            eyebrow="Why clients stay"
            title="Most people find us for one thing and stay for the rest."
            body="If you're forming an LLC today, you'll need bookkeeping, payroll and a business return before long — and it's simpler when the same person set it all up."
            imagePosition="right"
          />
        </Container>
      </section>

      <section className="section bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[var(--color-eggshell)]">Let's talk about the business.</h2>
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
