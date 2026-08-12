import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  Check,
  Calculator,
  Umbrella,
  Home,
  FileSearch,
  PhoneCall,
  Scale,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServiceCard } from "@/components/content/ServiceCard";
import { GuaranteeBlock } from "@/components/content/GuaranteeBlock";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { ServiceAreaList } from "@/components/content/ServiceAreaList";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { TESTIMONIALS } from "@/content/testimonials";
import { getUpcomingDeadlines, urgencyColor, urgencyTint } from "@/config/deadlines";
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
      <section className="band-ledger section pt-10">
        <Container>
          <div className="flex items-baseline justify-between">
            <Eyebrow>Upcoming deadlines</Eyebrow>
            <Link
              href="/deadlines"
              className="hidden items-center gap-1 text-[0.9rem] font-medium underline underline-offset-4 sm:inline-flex"
            >
              All deadlines <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {upcoming.map((d) => {
              const color = urgencyColor(d.daysAway);
              return (
                <Link
                  key={`${d.md}-${d.title}`}
                  href="/deadlines"
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
            href="/deadlines"
            className="mt-6 inline-flex items-center gap-1 text-[0.9rem] font-medium underline underline-offset-4 sm:hidden"
          >
            All deadlines <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Container>
      </section>

      {/* Primary service cards */}
      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />

        <Container className="relative z-10">
          <div className="grid gap-6 md:grid-cols-3">
            <ServiceCard
              color="tax"
              icon={Calculator}
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
              icon={Umbrella}
              size="large"
              title="Insurance"
              items={["Life Insurance", "Health Insurance", "Employee Benefits", "Retirement Solutions"]}
              blurb="For families and for employers covering a team."
              href="/insurance"
              linkLabel="Explore Insurance"
            />
            <ServiceCard
              color="mortgage"
              icon={Home}
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
      <section className="band-ledger section relative overflow-hidden pt-0">
        <SectionDecor colors={["var(--color-ink)", "var(--color-seal)"]} />

        <Container className="relative z-10">
          <div
            className="card-surface relative overflow-hidden p-8 md:p-10"
            style={{ borderTop: "4px solid var(--color-ink)" }}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[var(--color-white)]"
                  style={{ backgroundColor: "var(--color-ink)", boxShadow: "0 10px 20px -6px var(--color-ink)" }}
                >
                  <Landmark size={26} strokeWidth={2} />
                </span>
                <div>
                  <h3>Running a business too?</h3>
                  <p className="prose-measure mt-2 text-[var(--color-ink-60)]">
                    Most people find us for one thing and stay for the rest — bookkeeping, payroll and
                    business taxes are simpler when the same person set it all up.
                  </p>
                </div>
              </div>
              <Button href="/business" variant="secondary" className="shrink-0">
                Explore business services
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2.5 border-t border-[var(--color-rule)] pt-6">
              {[
                "Bookkeeping & Accounting",
                "Payroll Services",
                "LLC & Corporation Formation",
                "S-Corp Elections",
                "Business Consulting",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-rule)] px-3.5 py-1.5 text-[0.82rem] font-medium text-[var(--color-ink-60)]"
                >
                  <Check size={13} strokeWidth={3} style={{ color: "var(--color-ink)" }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why people switch */}
      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />

        <Container className="relative z-10">
          <Eyebrow>Why people switch to Jose</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                color: "var(--color-tax)",
                Icon: FileSearch,
                title: "He finds what the last preparer missed.",
                body: "Clients regularly come in after years with someone else and leave owing less. One self-employed client used the difference to pay off other debt.",
              },
              {
                color: "var(--color-insure)",
                Icon: PhoneCall,
                title: "He answers, and he’s fast.",
                body: "Same-week appointments are normal here, not an exception. You’ll talk to Jose — not a call center and not a different person each year.",
              },
              {
                color: "var(--color-mortgage)",
                Icon: Scale,
                title: "If you’re behind, he deals with the IRS.",
                body: "Late returns, amended returns, notices, payment plans. Being behind is a solvable problem and it’s better to start than to wait.",
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

      {/* Guarantee */}
      <section className="band-ledger section pt-0">
        <Container>
          <GuaranteeBlock />
        </Container>
      </section>

      {/* Testimonials */}
      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />

        <Container className="relative z-10">
          <div className="flex items-baseline justify-between">
            <Eyebrow>What clients say</Eyebrow>
            <Link href="/reviews" className="text-[0.9rem] font-medium underline underline-offset-4">
              Read all reviews →
            </Link>
          </div>
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
