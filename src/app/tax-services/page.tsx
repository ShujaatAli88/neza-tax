import type { Metadata } from "next";
import { User, Building2, FileEdit, History } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { YearRoundSupportBlock } from "@/components/content/YearRoundSupportBlock";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { telHref } from "@/lib/contact";

// This page's 3 testimonials are curated separately from the shared
// TESTIMONIALS list (used by the homepage carousel) so a swap here doesn't
// affect the homepage. Cherrie Chase's location was not provided in the
// client's testimonial — needs to be filled in before go-live.
const TAX_TESTIMONIALS = [
  {
    quote:
      "Jose saved me a lot of money as I am self employed for the first time and wasn't sure how to approach self employment tax and deductions etc. I was able to payoff other debt with the money I saved that I thought I would have to send to the IRS. thank you Jose!",
    author: "Jeffrey Chambers",
    location: "Escondido, CA",
  },
  {
    quote:
      "Jose did a great job on my elderly fathers taxes with very little input from me. He also made some suggestions that will help with his financial management in the future. I highly recommended Neza for your tax preparation needs 5 star all the way. Thanks Jose.",
    author: "Michael Erickson",
    location: "Oceanside, CA",
  },
  {
    quote:
      "I was referred to Neza Tax Services from my boyfriend, who uses this Financial Group for all of his accounting needs. I work in hospice and unfortunately, due to COVID, it has been a very busy year and I did not have time to do my taxes. Last minute, I decided to give Jose Gonzalez a call to see if they can do my taxes this year. Not only is Jose knowledgeable in his field, his keen-eye to detail, his thoughtful and communicative style, made me feel comfortable collaborating with him no matter how demanding or pressing the solution. He was able to maximize my returns and honestly, because I hate doing taxes, the amount that I spent for his services was well worth every dollar (which wasn't much or what I expected). I highly and enthusiastically recommend using Neza Tax Services! I will definitely use them again next year! He was also able to do my taxes while I was out of town in Seattle. I was able to sign my return and do everything electronically while I was out on a Ferry in the Puget Sound! How is that for efficiency?!",
    author: "Cherrie Chase",
    location: "",
  },
];

export const metadata: Metadata = {
  title: "Neza Tax Services — Tax Preparation for Individuals & Businesses",
  description:
    "Individual and business tax preparation, amended and prior-year filing, and year-round tax support from Neza Tax Services.",
};

const SECTIONS = [
  {
    id: "individual",
    color: "var(--color-tax)",
    Icon: User,
    title: "Individual Tax Preparation",
    body: "Federal and state individual income tax preparation for a variety of tax situations, including wages, investments, rental properties, retirement income, self-employment, and more.",
  },
  {
    id: "business",
    color: "var(--color-insure)",
    Icon: Building2,
    title: "Business Tax Returns",
    body: (
      <>
        Tax preparation and filing for <strong>LLCs, partnerships, S corporations, and C
        corporations</strong>, including applicable federal and state business entity returns.
      </>
    ),
  },
  {
    id: "amended",
    color: "var(--color-ink)",
    Icon: FileEdit,
    title: "Amended Returns",
    body: "Need to correct a previously filed return? We can review the original return, identify necessary changes, and prepare amended federal or state returns when appropriate.",
  },
  {
    id: "prior-year",
    color: "var(--color-seal)",
    Icon: History,
    title: "Prior-Year Returns",
    body: "Behind on filing? We can help prepare prior-year tax returns and work with you to get your tax filings back on track.",
  },
];

export default function TaxServicesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Tax Preparation",
          description: "Individual and business tax preparation, amended and prior-year filing.",
          url: "/tax-services",
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tax Services", path: "/tax-services" }])} />

      <PageHeader
        eyebrow="Neza Tax Services"
        title="Professional tax preparation for individuals and businesses"
        sub="Serving individuals and businesses locally and remotely."
      />

      <section className="band-white section relative overflow-hidden pt-0">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />
        <Container className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="card-surface group scroll-mt-24 p-7"
                style={{ borderTop: `4px solid ${s.color}` }}
              >
                <IconBadge icon={s.Icon} color={s.color} />
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
          <SectionEyebrow>What clients say</SectionEyebrow>
          <div className="mt-6 grid items-start gap-6 md:grid-cols-3">
            {TAX_TESTIMONIALS.map((t, i) => (
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
          <div>
            <h2 className="text-[var(--color-eggshell)]">Ready to Get Started?</h2>
            <p className="prose-measure mt-3 text-[var(--color-chrome-muted)]">
              Whether you need help preparing your current tax return, catching up on prior-year
              returns, amending a return, or planning ahead, Neza Tax Services is here to help.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Button href="/contact" variant="invert">
              Request an Appointment
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
