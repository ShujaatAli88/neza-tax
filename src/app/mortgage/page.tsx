import type { Metadata } from "next";
import { Home, RefreshCw, Building, Briefcase, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { MortgageDisclosure } from "@/components/compliance/MortgageDisclosure";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Mortgage Loans — Financing for Your Next Move",
  description:
    "Purchase, refinance, and investment property financing through C2 Financial Corporation. Jose Gonzalez, Mortgage Loan Originator, NMLS #2253898.",
};

const CATEGORIES = [
  {
    Icon: Home,
    title: "Home Purchase",
    body: "Financing options for primary residences, second homes, and other eligible home purchases.",
  },
  {
    Icon: RefreshCw,
    title: "Refinance",
    body: "Explore refinancing options to change your loan terms, access available equity, or better align your mortgage with your financial goals.",
  },
  {
    Icon: Building,
    title: "Investment Properties",
    body: "Financing options for real estate investors, including traditional and alternative loan programs for qualifying investment properties.",
  },
  {
    Icon: Briefcase,
    title: "Self-Employed Borrowers",
    body: "Financing can be more complex when you're self-employed. We can explore available mortgage programs based on your income, assets, property, and overall financial profile.",
  },
];

const PRODUCTS = ["Conventional", "FHA", "VA", "Jumbo", "USDA", "Other financing options"];

export default function MortgagePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Mortgage Loan Origination",
          description: "Purchase, refinance, and investment property financing through C2 Financial Corporation.",
          url: "/mortgage",
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Mortgage Loans", path: "/mortgage" }])} />

      <PageHeader title="Mortgage Loans" sub="Financing for Your Next Move" />

      <section className="band-white section pt-0">
        <Container>
          <p className="prose-measure text-[1.1rem] text-[var(--color-ink-60)]">
            Whether you&rsquo;re purchasing a home, refinancing your current mortgage, or financing
            an investment property, Jose Gonzalez provides mortgage loan origination services
            through C2 Financial Corporation and can help you explore financing options based on
            your goals and financial situation.
          </p>

          <div className="card-surface mt-6 p-5" style={{ borderLeft: "4px solid var(--color-mortgage)" }}>
            <p className="font-medium">
              {BUSINESS.owner}
              <br />
              <span className="text-[var(--color-ink-60)]">Mortgage Loan Originator</span>
              <br />
              <span className="font-mono text-[0.9rem] text-[var(--color-ink-60)]">
                NMLS #{BUSINESS.licenses.mloNmls} | CA DRE #{BUSINESS.licenses.joseDreCa}
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={BUSINESS.c2PrequalUrl} external variant="primary">
              Get Pre-Qualified
            </Button>
            <Button href={telHref()} variant="secondary">
              Call {BUSINESS.phone}
            </Button>
          </div>
          <p className="mt-3 text-[0.8rem] text-[var(--color-ink-60)]">
            Mortgage loan origination services offered through C2 Financial Corporation.
          </p>
        </Container>
      </section>

      <section className="band-ledger section">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map((c) => (
              <div
                key={c.title}
                className="card-surface group p-7"
                style={{ borderTop: "4px solid var(--color-mortgage)" }}
              >
                <IconBadge icon={c.Icon} color="var(--color-mortgage)" />
                <h3 className="mt-5 text-[1.1rem]">{c.title}</h3>
                <p className="mt-3 text-[0.92rem] text-[var(--color-ink-60)]">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="eyebrow mb-3">Loan products</p>
            <ul className="flex flex-wrap gap-2.5">
              {PRODUCTS.map((p) => (
                <li
                  key={p}
                  className="rounded-full bg-[var(--color-white)] px-4 py-2 text-[0.9rem] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 font-mono text-[0.85rem] text-[var(--color-ink-60)]">
            Mortgage loan origination services available to eligible borrowers throughout
            California.
          </p>
        </Container>
      </section>

      <section className="band-white section">
        <Container>
          <div className="card-surface flex flex-col gap-6 p-8 md:flex-row md:items-center md:p-10">
            <IconBadge icon={Compass} color="var(--color-mortgage)" size="lg" />
            <div>
              <h2>Personal Guidance Through the Loan Process</h2>
              <p className="mt-2 font-medium text-[var(--color-ink-60)]">
                A mortgage is more than choosing an interest rate.
              </p>
              <p className="prose-measure mt-3 text-[var(--color-ink-60)]">
                Jose works directly with borrowers throughout the mortgage process—from reviewing
                financing options and documentation requirements through loan processing and
                closing. Whether you&rsquo;re purchasing, refinancing, or investing, you&rsquo;ll
                have a direct point of contact throughout the process.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href={BUSINESS.c2PrequalUrl} external variant="primary">
                  Get Pre-Qualified
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact Jose
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="band-ledger py-10">
        <Container>
          <MortgageDisclosure variant="detailed" heading />
        </Container>
      </section>
    </>
  );
}
