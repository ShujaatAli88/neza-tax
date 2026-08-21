import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { LegalSections } from "@/components/content/LegalSections";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PRIVACY_SECTIONS } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Neza Financial Group collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/legal/privacy" },
        ])}
      />

      <PageHeader eyebrow="Legal" title="Privacy Policy" />

      <section className="band-white section pt-0">
        <Container>
          <p className="prose-measure mb-8 text-[0.9rem] text-[var(--color-ink-60)]">
            Last Updated: August 20, 2026
          </p>
          <LegalSections sections={PRIVACY_SECTIONS} />
        </Container>
      </section>
    </>
  );
}
