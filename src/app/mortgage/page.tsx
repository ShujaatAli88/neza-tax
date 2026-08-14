import type { Metadata } from "next";
import { Home, RefreshCw, Building } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
  { Icon: Home, title: "Purchase", body: "Financing for buying your next home." },
  { Icon: RefreshCw, title: "Refinance", body: "Refinancing your current mortgage." },
  { Icon: Building, title: "Investment Properties", body: "Financing for investment real estate." },
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

      <PageHeader
        title="Mortgage Loans"
        sub="Financing for your next move."
      />

      <section className="band-white section pt-0">
        <Container>
          <p className="prose-measure text-[1.1rem] text-[var(--color-ink-60)]">
            Whether you&rsquo;re purchasing a home, refinancing your current mortgage, or financing
            an investment property, I can help you explore loan options available through C2
            Financial.
          </p>

          <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--color-ledger)] p-5">
            <p className="font-medium">
              {BUSINESS.owner}
              <br />
              <span className="text-[var(--color-ink-60)]">Mortgage Loan Originator</span>
              <br />
              <span className="font-mono text-[0.9rem] text-[var(--color-ink-60)]">
                NMLS #{BUSINESS.licenses.mloNmls}
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
            Mortgage services offered through C2 Financial Corporation.
          </p>
        </Container>
      </section>

      <section className="band-ledger section">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <div key={c.title} className="card-surface p-7" style={{ borderTop: "4px solid var(--color-mortgage)" }}>
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--color-white)]"
                  style={{ backgroundColor: "var(--color-mortgage)", boxShadow: "0 10px 20px -6px var(--color-mortgage)" }}
                >
                  <c.Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-[1.15rem]">{c.title}</h3>
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
                  className="rounded-full border border-[var(--color-rule)] bg-[var(--color-white)] px-4 py-2 text-[0.9rem] font-medium"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 font-mono text-[0.85rem] text-[var(--color-ink-60)]">
            Licensed to serve borrowers across all of California.
          </p>
        </Container>
      </section>

      <section className="band-white py-10">
        <Container>
          <MortgageDisclosure />
        </Container>
      </section>
    </>
  );
}
