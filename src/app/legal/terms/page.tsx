import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { LegalSections } from "@/components/content/LegalSections";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { TERMS_SECTIONS } from "@/content/terms";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing your use of the Neza Financial Group website.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/legal/terms" },
        ])}
      />

      <PageHeader eyebrow="Legal" title="Terms of Use" />

      <section className="band-white section pt-0">
        <Container>
          <p className="prose-measure mb-8 text-[0.9rem] text-[var(--color-ink-60)]">
            Last Updated: August 20, 2026
          </p>
          <LegalSections sections={TERMS_SECTIONS} />
        </Container>
      </section>
    </>
  );
}
