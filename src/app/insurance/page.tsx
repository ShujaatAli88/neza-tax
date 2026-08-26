import type { Metadata } from "next";
import Image from "next/image";
import { HeartPulse, Stethoscope, Users, Smile, PiggyBank, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Insurance & Financial Solutions",
  description:
    "Life insurance, health insurance, employee benefits, group health, dental & vision, and IRAs & retirement solutions from Neza Financial & Insurance Services.",
};

const SECTIONS = [
  {
    id: "life",
    color: "var(--color-insure)",
    Icon: HeartPulse,
    title: "Life Insurance",
    body: "Term and permanent life insurance options designed around your coverage needs, budget, and goals.",
    cta: "Get a Life Insurance Quote",
    quoteType: "Life Insurance",
  },
  {
    id: "health",
    color: "var(--color-tax)",
    Icon: Stethoscope,
    title: "Health Insurance",
    body: "Individual and family health insurance options, including Covered California plans, to help you find coverage that fits your household's needs and budget.",
    cta: "Get a Health Insurance Quote",
    quoteType: "Health Insurance",
  },
  {
    id: "employee-benefits",
    color: "var(--color-mortgage)",
    Icon: Users,
    title: "Employee Benefits",
    body: "Employee benefit solutions designed to help businesses offer valuable coverage to their employees, including group health insurance and other options for small and growing businesses.",
    cta: "Get an Employee Benefits Quote",
    quoteType: "Employee Benefits",
  },
  {
    id: "dental-vision",
    color: "var(--color-business)",
    Icon: Smile,
    title: "Dental & Vision",
    body: "Dental and vision coverage for individuals and families, as well as options that can be included as part of an employee benefits package.",
  },
  {
    id: "iras-retirement",
    color: "var(--color-insure)",
    Icon: PiggyBank,
    title: "IRAs & Retirement Solutions",
    body: "Retirement solutions for individuals and business owners, including Traditional and Roth IRAs, SEP IRAs, SIMPLE IRAs, and other retirement options based on your goals.",
  },
];

export default function InsurancePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Insurance & Financial Solutions",
          description:
            "Life, health, employee benefits, group health, dental & vision, and IRAs & retirement solutions.",
          url: "/insurance",
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insurance", path: "/insurance" }])} />

      <PageHeader
        title="Insurance & Financial Solutions"
        sub="Insurance and financial solutions for individuals, families, and businesses, with personalized guidance based on your needs and goals."
      />

      <Container className="pb-6 pt-1">
        <p className="text-[0.85rem] text-[var(--color-ink-60)]">Serving clients throughout California.</p>
      </Container>

      <section className="band-white section relative overflow-hidden pt-0">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />
        <Container className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="card-surface group flex h-full scroll-mt-24 flex-col p-7"
                style={{ borderTop: `4px solid ${s.color}` }}
              >
                <IconBadge icon={s.Icon} color={s.color} />
                <h3 className="mt-5 text-[1.1rem]">{s.title}</h3>
                <p className="mt-3 text-[0.92rem] text-[var(--color-ink-60)]">{s.body}</p>
                {s.cta && (
                  <div className="mt-auto pt-5">
                    <Button
                      href={`/insurance/quote?type=${encodeURIComponent(s.quoteType)}`}
                      variant="secondary"
                      className="w-full"
                    >
                      {s.cta}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="band-ledger section">
        <Container>
          <div className="card-surface flex flex-col gap-6 p-8 md:flex-row md:items-center md:p-10">
            <IconBadge icon={Compass} color="var(--color-insure)" size="lg" />
            <div>
              <h2>Guidance Based on Your Needs</h2>
              <p className="prose-measure mt-3 text-[var(--color-ink-60)]">
                Insurance and retirement needs aren&rsquo;t one-size-fits-all. We take the time to
                understand your situation, explain available options, and help you select
                solutions that align with your needs, budget, and goals.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="band-white py-8">
        <Container>
          <div
            className="card-surface flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center"
            style={{ borderLeft: "4px solid var(--color-insure)" }}
          >
            <Image
              src="/images/covered-ca-lia-badge.png"
              alt="Covered California — Licensed Insurance Agent"
              width={1183}
              height={238}
              className="h-auto w-[220px] shrink-0"
            />
            <div>
              <h3 className="text-[1rem]">Covered California Certified Insurance Agent</h3>
              <p className="mt-1.5 text-[0.9rem] text-[var(--color-ink-60)]">
                Get help comparing available health plans, understanding potential financial
                assistance, and completing enrollment through Covered California.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[var(--color-eggshell)]">Let&rsquo;s Find the Right Solution</h2>
            <p className="prose-measure mt-3 text-[var(--color-chrome-muted)]">
              Whether you&rsquo;re looking for life, health, dental &amp; vision insurance, employee
              benefits, or retirement options, we&rsquo;re here to help you understand your choices.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Button href="/contact" variant="invert">
              Request an Appointment
            </Button>
            <Button href={telHref()} variant="onChrome">
              Call Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
