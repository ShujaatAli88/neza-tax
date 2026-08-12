import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Landmark, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServiceCard } from "@/components/content/ServiceCard";
import { GuaranteeBlock } from "@/components/content/GuaranteeBlock";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { ServiceAreaList } from "@/components/content/ServiceAreaList";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { TESTIMONIALS } from "@/content/testimonials";
import { getUpcomingDeadlines } from "@/config/deadlines";
import { BUSINESS, currentHours } from "@/config/business";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Tax, Insurance & Mortgage in Vista, CA",
  description:
    "Tax preparation, insurance and home loans from one office in Vista. Free estimates, free e-file, and a guarantee: if you're not happy, you don't pay.",
};

export default function HomePage() {
  const upcoming = getUpcomingDeadlines(new Date(), 3);

  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* Hero */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden pt-14 md:min-h-[640px] md:pt-20">
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
            {[
              "Free estimates",
              "E-file always free",
              `CA Ins. Lic. ${BUSINESS.licenses.caInsurance}`,
              "Se habla español",
            ].map((item) => (
              <li
                key={item}
                className="glass-surface flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[0.78rem] text-[var(--color-chrome-muted)]"
              >
                <Check size={12} strokeWidth={3} style={{ color: "var(--color-seal)" }} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Upcoming deadlines strip */}
      <section className="band-ledger py-6">
        <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow shrink-0">Upcoming deadlines</p>
          <ul className="flex flex-1 flex-wrap gap-x-8 gap-y-2 font-mono text-[0.85rem]">
            {upcoming.map((d) => (
              <li key={`${d.md}-${d.title}`} className="text-[var(--color-ink-60)]">
                <span className="font-medium text-[var(--color-ink)]">
                  {d.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>{" "}
                {d.title} · {d.daysAway}d
              </li>
            ))}
          </ul>
          <Link href="/deadlines" className="shrink-0 text-[0.85rem] font-medium underline underline-offset-4">
            All deadlines →
          </Link>
        </Container>
      </section>

      {/* Primary service cards */}
      <section className="band-white section">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <ServiceCard
              color="tax"
              size="large"
              title="Tax Services"
              items={[
                "Individual Tax Returns",
                "Business Tax Returns",
                "Amended & Prior-Year Returns",
                "Tax Planning",
              ]}
              blurb="For anyone who files — employee, self-employed, or behind."
              href="/tax"
              linkLabel="Explore Tax Services"
            />
            <ServiceCard
              color="insure"
              size="large"
              title="Insurance"
              items={["Life Insurance", "Health Insurance", "Employee Benefits", "Retirement Solutions"]}
              blurb="For families and for employers covering a team."
              href="/insurance"
              linkLabel="Explore Insurance"
            />
            <ServiceCard
              color="mortgage"
              size="large"
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

      {/* Business services cross-sell band */}
      <section className="band-ledger section pt-0">
        <Container>
          <div className="card-surface flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex items-start gap-5">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[var(--color-white)]"
                style={{ backgroundColor: "var(--color-ink)" }}
              >
                <Landmark size={22} strokeWidth={2} />
              </span>
              <div>
                <h3>Running a business too?</h3>
                <p className="prose-measure mt-2 text-[var(--color-ink-60)]">
                  Bookkeeping, payroll, LLC &amp; corporation formation, S-corp elections and
                  consulting — most people find us for one thing and stay for the rest.
                </p>
              </div>
            </div>
            <Button href="/business" variant="secondary" className="shrink-0">
              Explore business services
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Why people switch */}
      <section className="band-white section">
        <Container>
          <Eyebrow>Why people switch to Jose</Eyebrow>
          <div className="mt-6 grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <h3>He finds what the last preparer missed.</h3>
              <p className="mt-3 text-[var(--color-ink-60)]">
                Clients regularly come in after years with someone else and leave owing less. One
                self-employed client used the difference to pay off other debt.
              </p>
            </div>
            <div>
              <h3>He answers, and he&rsquo;s fast.</h3>
              <p className="mt-3 text-[var(--color-ink-60)]">
                Same-week appointments are normal here, not an exception. You&rsquo;ll talk to Jose
                — not a call center and not a different person each year.
              </p>
            </div>
            <div>
              <h3>If you&rsquo;re behind, he deals with the IRS.</h3>
              <p className="mt-3 text-[var(--color-ink-60)]">
                Late returns, amended returns, notices, payment plans. Being behind is a solvable
                problem and it&rsquo;s better to start than to wait.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Guarantee */}
      <section className="band-ledger section pt-0">
        <Container>
          <GuaranteeBlock />
        </Container>
      </section>

      {/* Testimonials */}
      <section className="band-white section">
        <Container>
          <div className="flex items-baseline justify-between">
            <Eyebrow>What clients say</Eyebrow>
            <Link href="/reviews" className="text-[0.9rem] font-medium underline underline-offset-4">
              Read all reviews →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <TestimonialCard key={t.author} {...t} />
            ))}
          </div>
        </Container>
      </section>

      {/* Service area */}
      <section className="band-ledger py-8">
        <Container>
          <p className="eyebrow mb-2">Serving North County San Diego</p>
          <ServiceAreaList />
        </Container>
      </section>

      {/* Final CTA */}
      <section className="section bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[var(--color-eggshell)]">Ready when you are.</h2>
            <address className="mt-3 not-italic text-[var(--color-chrome-muted)]">
              {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
              {BUSINESS.address.zip}
              <br />
              {currentHours()}
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
