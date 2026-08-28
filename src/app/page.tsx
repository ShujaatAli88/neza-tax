import type { Metadata } from "next";
import Image from "next/image";
import {
  Check,
  Calculator,
  Umbrella,
  Home,
  Landmark,
  Award,
  PhoneCall,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
import { ServiceCard } from "@/components/content/ServiceCard";
import { PhotoFeatureBlock } from "@/components/content/PhotoFeatureBlock";
import { ReviewsCarousel } from "@/components/content/ReviewsCarousel";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { TESTIMONIALS } from "@/content/testimonials";
import { GOOGLE_REVIEWS } from "@/content/googleReviews";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Tax, Insurance & Mortgage in Vista, CA",
  description:
    "Tax preparation, insurance and home loans from Neza Financial Group — tax services, business services, insurance and mortgage loans in one place.",
};

const ACCENTS = ["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)", "var(--color-business)"];

interface Credential {
  key: string;
  name: string;
  alt?: string;
  subtext: string[];
  color: string;
  image: { src: string; width: number; height: number };
}

const CREDENTIALS: Credential[] = [
  {
    key: "ctec",
    name: "CTEC Registered Tax Preparer",
    subtext: ["California Tax Education Council"],
    color: "var(--color-tax)",
    image: { src: "/images/badge-ctec.jpg", width: 574, height: 265 },
  },
  {
    key: "efile",
    name: "IRS Authorized e-file Provider",
    subtext: ["Authorized electronic filing provider"],
    color: "var(--color-business)",
    image: { src: "/images/badge-efile.png", width: 611, height: 265 },
  },
  {
    key: "insurance",
    name: "Covered California Certified Insurance Agent",
    alt: "Covered California Licensed Insurance Agent",
    subtext: [`CA Insurance Lic. #${BUSINESS.licenses.caInsurance}`],
    color: "var(--color-insure)",
    image: { src: "/images/covered-ca-lia-badge.png", width: 1183, height: 238 },
  },
  {
    key: "mortgage",
    name: "Mortgage Loan Originator",
    subtext: [
      `Jose Gonzalez · NMLS #${BUSINESS.licenses.mloNmls} · CA DRE #${BUSINESS.licenses.joseDreCa}`,
      "Mortgage loan origination through C2 Financial Corporation",
    ],
    color: "var(--color-mortgage)",
    image: { src: "/images/equal-housing-opportunity-black.png", width: 280, height: 300 },
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* Hero */}
      <section className="hero-viewport relative flex items-center overflow-hidden">
        <Image
          src="/images/hero-tax-financial-new.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-ambient object-cover"
          style={{ objectPosition: "60% 45%" }}
        />
        {/* Directional duotone grade — densest behind the text column, clearing
            toward the right so the photo actually reads, plus a soft vignette
            so the frame feels art-directed. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(19,22,24,0.92) 0%, rgba(19,22,24,0.86) 38%, rgba(19,22,24,0.4) 72%, rgba(19,22,24,0.22) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 100%, rgba(8,9,10,0.45) 0%, transparent 55%)",
          }}
        />
        <Container className="relative">
          <div className="hero-fade-1 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: "var(--color-seal)" }} />
            <Eyebrow className="!text-[var(--color-chrome-muted)] !tracking-[0.18em]">
              Tax · Business · Insurance · Mortgage
            </Eyebrow>
          </div>

          <h1 className="hero-headline text-shadow-soft max-w-3xl text-[var(--color-eggshell)]">
            Neza Financial Group
          </h1>

          <p className="hero-fade-2 prose-measure max-w-xl text-[1.2rem] leading-relaxed text-white/85">
            Tax, business, insurance, and mortgage services for individuals, families, and
            business owners.
          </p>

          <div className="hero-fade-3 flex flex-wrap gap-4">
            <Button href="/contact" variant="invert">
              Request an Appointment
            </Button>
            <Button href={telHref()} variant="glass">
              {BUSINESS.phone}
            </Button>
          </div>

          <div className="hero-fade-4">
            <span
              aria-hidden="true"
              className="mb-4 block h-px w-8"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-seal), color-mix(in srgb, var(--color-seal), transparent 70%))",
              }}
            />
            <ul className="flex flex-wrap gap-3">
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
          </div>
        </Container>
      </section>

      {/* Proudly serving the community */}
      <section
        id="community"
        className="relative scroll-mt-16 overflow-hidden bg-[var(--color-chrome)] py-14 text-[var(--color-eggshell)] sm:py-16"
      >
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
                Proudly Serving Our Community
              </Eyebrow>
            </div>
            <h2 className="mt-4 text-[var(--color-eggshell)]">Who We Are</h2>
            <p className="prose-measure mt-5 text-[1.05rem] leading-relaxed text-white/80">
              Neza Financial Group provides <strong>Tax Services</strong>,{" "}
              <strong>Business Services</strong>, <strong>Life &amp; Health Insurance</strong>, and{" "}
              <strong>Mortgage Loans</strong> to individuals, families, and business owners.
            </p>
            <Button href="/about" variant="invert" className="mt-7">
              Meet Neza Financial Group
            </Button>
          </div>

          <div className="relative mx-auto h-full min-h-[260px] w-full max-w-[380px] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <Image
              src="/images/community-tax-photo.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 380px, 90vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(19,22,24,0.4), transparent 55%)" }}
            />
          </div>
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
                "ITIN Application & Renewal",
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
                "Bookkeeping Services",
                "Payroll Services",
                "Business Formation",
                "Business Compliance & Support",
              ]}
              blurb="For owners who'd rather run the business than the paperwork."
              href="/business-services"
              linkLabel="Explore Business Services"
            />
            <ServiceCard
              color="insure"
              icon={Umbrella}
              title="Insurance"
              items={["Life Insurance", "Health Insurance", "Employee Benefits", "IRAs & Retirement Solutions"]}
              blurb="For families and for employers covering a team."
              href="/insurance"
              linkLabel="Explore Insurance"
            />
            <ServiceCard
              color="mortgage"
              icon={Home}
              title="Mortgage Loans"
              items={[
                "Home Purchase Loans",
                "Refinance Options",
                "Investment Property Loans",
                "Home Equity & Cash-Out Options",
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
            image="/images/home-trust-photo-v2.jpg"
            imageAlt=""
            imageWidth={525}
            imageHeight={350}
            imageFit="framed"
            color="var(--color-insure)"
            eyebrow="Who we serve"
            title="Individuals, families, and business owners — all in one place."
            body="What began with a focus on tax preparation has grown into a broader range of services designed to help our clients with their personal, business, and financial needs."
            cta={{ label: "Learn About Neza", href: "/about" }}
          />
        </Container>
      </section>

      {/* Why clients choose Neza — company-wide reasons, not tax-specific,
          since this sits right after the four equal service cards. The two
          retired tax-specific reasons moved to /tax-services.
          NOTE (flag, not acted on): "Who We Serve" below repeats some of
          "Who We Are" above it — worth a call on whether both stay once the
          rest of this page settles. */}
      <section className="band-white section relative overflow-hidden">
        <SectionDecor colors={ACCENTS.slice(0, 3)} />

        <Container className="relative z-10">
          <SectionEyebrow>Why clients choose Neza</SectionEyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                color: "var(--color-tax)",
                Icon: Award,
                title: "Experience You Can Rely On",
                body: "Years of experience across tax, business, insurance, and mortgage services — one team you can count on for accurate, dependable guidance.",
              },
              {
                color: "var(--color-insure)",
                Icon: PhoneCall,
                title: "Responsive, Personal Service",
                body: "Same-week appointments are often available. You'll work with a knowledgeable member of our team who takes the time to understand your situation—not a call center.",
              },
              {
                color: "var(--color-mortgage)",
                Icon: Layers,
                title: "Multiple Services, One Trusted Team",
                body: "Tax, business, insurance, and mortgage needs handled by one organization — no juggling multiple providers or re-explaining your situation.",
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
          <div className="mt-10">
            <ReviewsCarousel
              reviews={[
                ...GOOGLE_REVIEWS.map((r) => ({ ...r, source: "Google Review" })),
                ...TESTIMONIALS.slice(0, 3),
              ]}
              colors={ACCENTS}
            />
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
              Our tax, insurance, and mortgage services are backed by recognized licenses,
              registrations, certifications, and authorizations.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((c) => (
              <div
                key={c.key}
                className="card-surface group relative flex flex-col items-center overflow-hidden p-8 text-center"
                style={{ borderTop: `4px solid ${c.color}` }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.1] transition-opacity duration-300 group-hover:opacity-[0.18]"
                  style={{ background: `radial-gradient(120% 100% at 50% 0%, ${c.color}, transparent 70%)` }}
                />
                {/* Every card gets the identical h-20/w-40 bounding box — a
                    fixed maximum display area, not just a max-height — so
                    logos with very different source aspect ratios (the wide
                    Covered CA badge vs. the squarer CTEC/e-file badges) read
                    as the same visual weight instead of some floating small
                    in whitespace while another runs edge-to-edge. */}
                <div className="relative flex h-20 w-40 items-center justify-center rounded-xl bg-white">
                  <Image
                    src={c.image.src}
                    alt={c.alt ?? c.name}
                    width={c.image.width}
                    height={c.image.height}
                    className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <p className="relative mt-5 text-[0.98rem] font-semibold">{c.name}</p>
                {c.subtext.map((line, i) => (
                  <p
                    key={i}
                    className={`relative text-[0.85rem] text-[var(--color-ink-60)] ${i === 0 ? "mt-1.5" : "mt-0.5"}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <p className="prose-measure relative mx-auto mt-8 max-w-2xl text-center text-[0.78rem] text-[var(--color-ink-60)]">
            This website is owned and maintained by {BUSINESS.legalName}, which is solely
            responsible for its content. This site is not maintained by or affiliated with
            Covered California, and Covered California bears no responsibility for its content.
            The e-mail addresses and telephone number that appear throughout this site belong to
            {" "}
            {BUSINESS.legalName} and cannot be used to contact Covered California.
          </p>
        </Container>
      </section>
    </>
  );
}
