import type { Metadata } from "next";
import { HeartPulse, Stethoscope, Users, UsersRound, Smile, PiggyBank } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/content/PageHeader";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { InsuranceDisclosure } from "@/components/compliance/InsuranceDisclosure";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Insurance & Financial Solutions",
  description:
    "Life insurance, health insurance, employee benefits, group health, dental & vision, and retirement solutions from Neza Financial & Insurance Services.",
};

const SECTIONS = [
  {
    id: "life",
    color: "var(--color-insure)",
    Icon: HeartPulse,
    title: "Life Insurance",
    body: "Coverage for what your family depends on — term and permanent options, matched to your budget and your goals.",
  },
  {
    id: "health",
    color: "var(--color-tax)",
    Icon: Stethoscope,
    title: "Health Insurance",
    body: "Individual and family plans, including Covered California options, for coverage that fits your household.",
  },
  {
    id: "employee-benefits",
    color: "var(--color-mortgage)",
    Icon: Users,
    title: "Employee Benefits",
    body: "Benefits do two things at once — they keep good people from leaving, and they come with tax advantages on the business side. Available to groups as small as two.",
  },
  {
    id: "group-health",
    color: "var(--color-seal)",
    Icon: UsersRound,
    title: "Group Health",
    body: "Group health plans for teams of any size, set up and administered without the paperwork landing entirely on you.",
  },
  {
    id: "dental-vision",
    color: "var(--color-ink)",
    Icon: Smile,
    title: "Dental & Vision",
    body: "Dental and vision coverage alongside your health plan, for individuals or as part of a group benefits package.",
  },
  {
    id: "retirement",
    color: "var(--color-insure)",
    Icon: PiggyBank,
    title: "Retirement Solutions",
    body: "From solo 401(k)s to larger group retirement plans, including options that aren't tied to market risk.",
  },
];

export default function InsurancePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Insurance & Financial Solutions",
          description:
            "Life, health, employee benefits, group health, dental & vision, and retirement solutions.",
          url: "/insurance",
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insurance", path: "/insurance" }])} />

      <PageHeader
        title="Insurance & Financial Solutions"
        sub="Coverage for your family, and for the team you're responsible for. Licensed to serve clients across all of California."
      />

      <section className="band-white section relative overflow-hidden pt-0">
        <SectionDecor colors={["var(--color-tax)", "var(--color-insure)", "var(--color-mortgage)"]} />
        <Container className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="card-surface group scroll-mt-24 p-7"
                style={{ borderTop: `4px solid ${s.color}` }}
              >
                <IconBadge icon={s.Icon} color={s.color} />
                <h3 className="mt-5 text-[1.1rem]">{s.title}</h3>
                <p className="mt-3 text-[0.92rem] text-[var(--color-ink-60)]">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="band-ledger py-8">
        <Container>
          <InsuranceDisclosure />
        </Container>
      </section>

      <section className="section bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[var(--color-eggshell)]">Let's find the right coverage.</h2>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="invert">
              Book an appointment
            </Button>
            <Button href={telHref()} variant="onChrome">
              Call us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
