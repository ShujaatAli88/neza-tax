import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Calculator,
  Umbrella,
  Home,
  Landmark,
  FileSearch,
  PhoneCall,
  Scale,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServiceCard } from "@/components/content/ServiceCard";
import { YearRoundSupportBlock } from "@/components/content/YearRoundSupportBlock";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { TESTIMONIALS } from "@/content/testimonials";
import { getUpcomingDeadlines, urgencyColor, urgencyTint } from "@/config/deadlines";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Tax, Insurance & Mortgage in Vista, CA",
  description:
    "Tax preparation, insurance and home loans from Neza Financial Group — tax services, business services, insurance and mortgage loans in one place.",
};

const ACCENTS = ["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)", "var(--color-ink)"];

export default function HomePage() {
  const upcoming = getUpcomingDeadlines(new Date(), 3);

  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* Hero */}
      <section className="relative flex items-center overflow-hidden py-14 sm:min-h-[clamp(560px,88svh,780px)] sm:py-16 md:py-20">
        <Image
          src="/images/tax-forms-planning-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(0,53,18,0.88) 0%, rgba(0,53,18,0.82) 45%, rgba(0,53,18,0.55) 100%)",
          }}
        />
        <Container className="hero-animate relative">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: "var(--color-seal)" }} />
            <Eyebrow className="!text-[var(--color-chrome-muted)] !tracking-[0.18em]">
              Tax · Insurance · Mortgage
            </Eyebrow>
          </div>

          <h1 className="text-shadow-soft mt-4 max-w-3xl text-[var(--color-eggshell)]">
            Neza Financial Group
          </h1>

          <p className="prose-measure mt-5 max-w-xl text-[1.2rem] leading-relaxed text-white/85">
            Helping individuals, families, and businesses with tax preparation, insurance
            solutions, and mortgage financing.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/contact" variant="invert">
              Book an appointment
            </Button>
            <Button href={telHref()} variant="glass">
              {BUSINESS.phone}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-3">
            {[`CA Ins. Lic. ${BUSINESS.licenses.caInsurance}`, "Se habla español", "Year-round support"].map(
              (item) => (
                <li
                  key={item}
                  className="glass-surface flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[0.78rem] text-[var(--color-chrome-muted)]"
                >
                  <Check size={12} strokeWidth={3} style={{ color: "var(--color-seal)" }} aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </Container>
      </section>

      {/* Upcoming deadlines strip */}
      <section className="band-ledger section pt-10">
        <Container>
          <div className="flex items-baseline justify-between">
            <Eyebrow>Upcoming deadlines</Eyebrow>
            <Link
              href="/tax-services"
              className="hidden items-center gap-1 text-[0.9rem] font-medium underline underline-offset-4 sm:inline-flex"
            >
              Tax services <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {upcoming.map((d) => {
              const color = urgencyColor(d.daysAway);
              return (
                <Link
                  key={`${d.md}-${d.title}`}
                  href="/tax-services"
                  className="card-surface flex items-start gap-4 p-5"
                >
                  <span
                    className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl"
                    style={{ backgroundColor: urgencyTint(d.daysAway) }}
                  >
                    <span className="font-mono text-[0.65rem] uppercase tracking-wide" style={{ color }}>
                      {d.date.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span
                      className="text-[1.2rem] leading-none font-semibold"
                      style={{ color, fontFamily: "var(--font-display)" }}
                    >
                      {d.date.getDate()}
                    </span>
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-medium">{d.title}</p>
                    <p className="mt-1.5 font-mono text-[0.8rem] font-medium" style={{ color }}>
                      {d.daysAway} day{d.daysAway === 1 ? "" : "s"} away
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            href="/tax-services"
            className="mt-6 inline-flex items-center gap-1 text-[0.9rem] font-medium underline underline-offset-4 sm:hidden"
          >
            Tax services <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Container>
      </section>

      {/* Primary service cards — all four, above the fold together */}
      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={ACCENTS} />

        <Container className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ServiceCard
              color="tax"
              icon={Calculator}
              title="Tax Services"
              items={[
                "Individual Tax Returns",
                "Business Tax Returns",
                "Amended & Prior-Year Returns",
                "Tax Planning",
              ]}
              blurb="For anyone who files — employee, self-employed, or behind."
              href="/tax-services"
              linkLabel="Explore Tax Services"
            />
            <ServiceCard
              color="business"
              icon={Landmark}
              title="Business Services"
              items={[
                "Bookkeeping & Accounting",
                "Payroll",
                "Business Tax Preparation",
                "LLC & Corporation Formation",
                "S-Corp Elections",
                "Business Consulting",
              ]}
              blurb="For owners who'd rather run the business than the paperwork."
              href="/business-services"
              linkLabel="Explore Business Services"
            />
            <ServiceCard
              color="insure"
              icon={Umbrella}
              title="Insurance"
              items={["Life Insurance", "Health Insurance", "Employee Benefits", "Retirement Solutions"]}
              blurb="For families and for employers covering a team."
              href="/insurance"
              linkLabel="Explore Insurance"
            />
            <ServiceCard
              color="mortgage"
              icon={Home}
              title="Mortgage Loans"
              items={[
                "Home Purchases",
                "Refinancing",
                "Investment Properties",
                "Conventional · FHA · VA · Jumbo & More",
              ]}
              blurb="Mortgage services offered through C2 Financial Corporation."
              href="/mortgage"
              linkLabel="Explore Mortgage Options"
            />
          </div>
        </Container>
      </section>

      {/* Why clients choose Neza */}
      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={ACCENTS.slice(0, 3)} />

        <Container className="relative z-10">
          <Eyebrow>Why clients choose Neza</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                color: "var(--color-tax)",
                Icon: FileSearch,
                title: "Experienced, Thorough Tax Preparation",
                body: "We take the time to review your tax situation carefully, identify potential issues and opportunities, and help you understand your return.",
              },
              {
                color: "var(--color-insure)",
                Icon: PhoneCall,
                title: "Responsive, Personal Service",
                body: "Same-week appointments are often available. You'll work with a knowledgeable member of our team who takes the time to understand your situation—not a call center.",
              },
              {
                color: "var(--color-mortgage)",
                Icon: Scale,
                title: "Help When Tax Problems Arise",
                body: "Late returns, amended returns, IRS notices, and payment options. If you're behind, we'll help you understand your options and determine the next steps.",
              },
            ].map((reason) => (
              <div key={reason.title} className="card-surface p-7" style={{ borderTop: `4px solid ${reason.color}` }}>
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--color-white)]"
                  style={{ backgroundColor: reason.color, boxShadow: `0 10px 20px -6px ${reason.color}` }}
                >
                  <reason.Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-[1.15rem]">{reason.title}</h3>
                <p className="mt-3 text-[0.92rem] text-[var(--color-ink-60)]">{reason.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Year-round tax support */}
      <section className="band-ledger section pt-0">
        <Container>
          <YearRoundSupportBlock />
        </Container>
      </section>

      {/* Testimonials */}
      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={ACCENTS.slice(0, 3)} />

        <Container className="relative z-10">
          <Eyebrow>What clients say</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.author} {...t} color={ACCENTS[i]} />
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="section bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[var(--color-eggshell)]">Ready when you are.</h2>
            <address className="mt-3 not-italic text-[var(--color-chrome-muted)]">
              {BUSINESS.hours.display} — {BUSINESS.hours.note}
            </address>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="invert">
              Book an appointment
            </Button>
            <Button href={telHref()} variant="onChrome">
              {BUSINESS.phone}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
