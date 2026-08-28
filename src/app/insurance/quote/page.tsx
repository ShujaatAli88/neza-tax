import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { QuoteForm } from "@/components/content/QuoteForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Get an Insurance Quote",
  description:
    "Request a life, health, employee benefits, or dental & vision insurance quote from Neza Financial & Insurance Services.",
};

export default function InsuranceQuotePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insurance", path: "/insurance" },
          { name: "Get a Quote", path: "/insurance/quote" },
        ])}
      />

      <PageHeader
        eyebrow="Insurance"
        title="Get an Insurance Quote"
        sub="Tell us a bit about what you need, and we'll follow up with options that fit."
      />

      <section className="band-white section pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="card-surface p-7 md:p-8">
              <Suspense fallback={null}>
                <QuoteForm />
              </Suspense>
            </div>

            <div className="card-surface group h-fit p-7" style={{ borderTop: "4px solid var(--color-insure)" }}>
              <IconBadge icon={Phone} color="var(--color-insure)" size="sm" />
              <h3 className="mt-4 text-[1.05rem]">Prefer to Talk It Through?</h3>
              <p className="mt-2 text-[0.92rem] text-[var(--color-ink-60)]">
                Speak with a member of our team directly.
              </p>
              <Button href={telHref()} variant="secondary" className="mt-4 w-full">
                <Phone size={16} aria-hidden="true" />
                Call Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
