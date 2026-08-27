import type { Metadata } from "next";
import { User, Building2, FileEdit, IdCard, FileSearch, Scale } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { YearRoundSupportBlock } from "@/components/content/YearRoundSupportBlock";
import { CalendarDateBadge } from "@/components/content/CalendarDateBadge";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { getUpcomingDeadlines, urgencyColor, formatDaysAway } from "@/config/deadlines";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

// Page is statically generated; this keeps the Upcoming Deadlines counters
// from freezing at build time — Next regenerates it at most once an hour so
// "days away" (and the eventual roll into next year) stays correct without
// needing a redeploy. Deadlines only move at day boundaries, so hourly is
// comfortably fresh without forcing this page to render per-request.
export const revalidate = 3600;

const DEADLINE_ACCENTS = ["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"];

// Moved from the homepage's "Why clients choose Neza" — these two read as
// selling points specifically in a tax context, less so sitting alongside
// the company-wide reasons that replaced them on the homepage.
const TAX_REASONS = [
  {
    color: "var(--color-tax)",
    Icon: FileSearch,
    title: "Experienced, Thorough Tax Preparation",
    body: "We take the time to review your tax situation carefully, identify potential issues and opportunities, and help you understand your return.",
  },
  {
    color: "var(--color-mortgage)",
    Icon: Scale,
    title: "Help When Tax Problems Arise",
    body: "Late returns, amended returns, IRS notices, and payment options. If you're behind, we'll help you understand your options and determine the next steps.",
  },
];

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
    id: "amended-prior-year",
    color: "var(--color-business)",
    Icon: FileEdit,
    title: "Amended & Prior-Year Returns",
    body: "Need to correct a previously filed return or catch up on unfiled years? We can prepare amended federal and state returns and help bring prior-year tax filings up to date.",
  },
  {
    id: "itin",
    color: "var(--color-seal)",
    Icon: IdCard,
    title: "ITIN Application & Renewal",
    body: "Assistance with new Individual Taxpayer Identification Number (ITIN) applications and renewals, including preparation of Form W-7 and required supporting documentation.",
  },
];

export default function TaxServicesPage() {
  const upcoming = getUpcomingDeadlines(3);

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
        cta={
          <Button
            href={BUSINESS.schedulerUrl}
            variant="primary"
            external
            ariaLabel="Schedule an appointment — Tax Services"
          >
            Schedule an Appointment
          </Button>
        }
      />

      {/* Upcoming deadlines — moved here from the homepage */}
      <section className="band-white section pt-0">
        <Container>
          <SectionEyebrow>Upcoming deadlines</SectionEyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {upcoming.map((d, i) => {
              const urgency = urgencyColor(d.daysAway);
              const badgeColor = DEADLINE_ACCENTS[i % DEADLINE_ACCENTS.length];
              return (
                <div key={`${d.md}-${d.title}`} className="card-surface group flex items-start gap-4 p-5">
                  <CalendarDateBadge
                    month={d.date.toLocaleDateString("en-US", { month: "short" })}
                    day={d.date.getDate()}
                    color={badgeColor}
                  />
                  <div>
                    <p className="text-[0.95rem] font-medium">{d.title}</p>
                    <p className="mt-1.5 font-mono text-[0.8rem] font-medium" style={{ color: urgency }}>
                      {formatDaysAway(d.daysAway)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

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

      {/* Why choose Neza for tax — moved from the homepage's "Why clients
          choose Neza," which now carries company-wide reasons instead. */}
      <section className="band-white section relative overflow-hidden pt-0">
        <SectionDecor colors={["var(--color-tax)", "var(--color-mortgage)"]} />
        <Container className="relative z-10">
          <SectionEyebrow>Why choose Neza for tax</SectionEyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {TAX_REASONS.map((reason) => (
              <div
                key={reason.title}
                className="card-surface group p-7"
                style={{ borderTop: `4px solid ${reason.color}` }}
              >
                <IconBadge icon={reason.Icon} color={reason.color} />
                <h3 className="mt-5 text-[1.15rem]">{reason.title}</h3>
                <p className="mt-3 text-[0.92rem] text-[var(--color-ink-60)]">{reason.body}</p>
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
            <Button
              href={BUSINESS.schedulerUrl}
              variant="invert"
              external
              ariaLabel="Schedule an appointment — Ready to Get Started"
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
