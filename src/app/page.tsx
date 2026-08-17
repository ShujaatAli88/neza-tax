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
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
import { ServiceCard } from "@/components/content/ServiceCard";
import { PhotoFeatureBlock } from "@/components/content/PhotoFeatureBlock";
import { YearRoundSupportBlock } from "@/components/content/YearRoundSupportBlock";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { CalendarDateBadge } from "@/components/content/CalendarDateBadge";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { TESTIMONIALS } from "@/content/testimonials";
import { getUpcomingDeadlines, urgencyColor } from "@/config/deadlines";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Tax, Insurance & Mortgage in Vista, CA",
  description:
    "Tax preparation, insurance and home loans from Neza Financial Group — tax services, business services, insurance and mortgage loans in one place.",
};

const ACCENTS = ["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)", "var(--color-ink)"];

const CREDENTIALS = [
  {
    name: "CTEC Registered",
    blurb: "California Tax Education Council registration",
    image: "/images/badge-ctec.jpg",
    width: 574,
    height: 265,
    color: "var(--color-tax)",
  },
  {
    name: "IRS e-file Provider",
    blurb: "Authorized to electronically file federal returns",
    image: "/images/badge-efile.png",
    width: 611,
    height: 265,
    color: "var(--color-insure)",
  },
  {
    name: "IRS Registered Tax Return Preparer",
    blurb: "IRS Registered Tax Return Preparer program",
    image: "/images/badge-rtrp.jpg",
    width: 329,
    height: 108,
    color: "var(--color-mortgage)",
  },
];

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

      {/* Proudly serving the community */}
      <section className="relative overflow-hidden bg-[var(--color-chrome)] py-16 text-[var(--color-eggshell)] sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <Container className="relative grid gap-12 md:grid-cols-[1fr_420px] md:items-center md:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: "var(--color-seal)" }} />
              <Eyebrow className="!text-[var(--color-chrome-muted)] !tracking-[0.18em]">
                Proudly Serving the Community
              </Eyebrow>
            </div>
            <h2 className="mt-4 text-[var(--color-eggshell)]">Who We Are</h2>
            <p className="prose-measure mt-5 text-[1.05rem] leading-relaxed text-white/80">
              Neza Financial Group provides Tax Services, Business Services, Insurance, and
              Mortgage Loans to individuals, families, and business owners throughout San Diego
              County.
            </p>
            <Button href="/about" variant="invert" className="mt-7">
              Meet Neza Financial Group
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-[380px]">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[26px]"
              style={{
                background: "color-mix(in srgb, var(--color-seal), transparent 55%)",
                transform: "rotate(3deg)",
              }}
            />
            <div
              className="relative overflow-hidden rounded-[20px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
              style={{ transform: "rotate(-2deg)" }}
            >
              <Image
                src="/images/community-income-tax.jpg"
                alt="Income tax return and calculator"
                width={546}
                height={324}
                sizes="(min-width: 768px) 380px, 90vw"
                className="h-auto w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(0,53,18,0.4), transparent 55%)" }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Upcoming deadlines strip */}
      <section className="band-ledger section pt-10">
        <Container>
          <div className="flex items-baseline justify-between">
            <SectionEyebrow>Upcoming deadlines</SectionEyebrow>
            <Link
              href="/tax-services"
              className="hidden items-center gap-1 text-[0.9rem] font-medium underline underline-offset-4 sm:inline-flex"
            >
              Tax services <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {upcoming.map((d, i) => {
              const urgency = urgencyColor(d.daysAway);
              const badgeColor = ACCENTS[i % ACCENTS.length];
              return (
                <Link
                  key={`${d.md}-${d.title}`}
                  href="/tax-services"
                  className="card-surface group flex items-start gap-4 p-5"
                >
                  <CalendarDateBadge
                    month={d.date.toLocaleDateString("en-US", { month: "short" })}
                    day={d.date.getDate()}
                    color={badgeColor}
                  />
                  <div>
                    <p className="text-[0.95rem] font-medium">{d.title}</p>
                    <p className="mt-1.5 font-mono text-[0.8rem] font-medium" style={{ color: urgency }}>
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

      {/* Who we serve */}
      <section className="band-white section pt-0">
        <Container>
          <PhotoFeatureBlock
            image="/images/home-trust-photo.png"
            imageAlt=""
            imageWidth={1040}
            imageHeight={1005}
            color="var(--color-insure)"
            eyebrow="Who we serve"
            title="Individuals, families, and business owners — all in one place."
            body="What began with a focus on tax preparation has grown into a broader range of services designed to help our clients with their personal, business, and financial needs."
            cta={{ label: "Learn About Neza", href: "/about" }}
          />
        </Container>
      </section>

      {/* Why clients choose Neza */}
      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={ACCENTS.slice(0, 3)} />

        <Container className="relative z-10">
          <SectionEyebrow>Why clients choose Neza</SectionEyebrow>
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
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow className="justify-center">What clients say</SectionEyebrow>
            <h2 className="mt-4">Real Feedback From Real Clients.</h2>
            <p className="prose-measure mx-auto mt-4 text-[1.05rem] text-[var(--color-ink-60)]">
              We&rsquo;d rather let the people we&rsquo;ve worked with speak for us.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.author} {...t} color={ACCENTS[i]} />
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications & affiliations */}
      <section className="band-ledger section relative overflow-hidden">
        <SectionDecor colors={ACCENTS.slice(0, 3)} />

        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow className="justify-center">Certifications &amp; Affiliations</SectionEyebrow>
            <h2 className="mt-4">Backed by Real Credentials</h2>
            <p className="prose-measure mx-auto mt-4 text-[1.05rem] text-[var(--color-ink-60)]">
              We hold ourselves to state and federal standards for tax preparation — not just
              promises.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {CREDENTIALS.map((c) => (
              <div
                key={c.name}
                className="card-surface group relative flex flex-col items-center overflow-hidden p-8 text-center"
                style={{ borderTop: `4px solid ${c.color}` }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.1] transition-opacity duration-300 group-hover:opacity-[0.18]"
                  style={{ background: `radial-gradient(120% 100% at 50% 0%, ${c.color}, transparent 70%)` }}
                />
                <div className="relative flex h-24 w-full items-center justify-center rounded-xl bg-white">
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={c.width}
                    height={c.height}
                    className="max-h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <p className="relative mt-5 text-[0.98rem] font-semibold">{c.name}</p>
                <p className="relative mt-1.5 text-[0.85rem] text-[var(--color-ink-60)]">{c.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
