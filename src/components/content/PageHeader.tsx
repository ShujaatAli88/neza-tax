import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function PageHeader({
  eyebrow,
  title,
  sub,
  cta,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  // Opt-in only — omitted on every page except the one that needs it, so this
  // never affects the other pages sharing this component.
  cta?: React.ReactNode;
}) {
  return (
    <section className="band-white section relative pt-14 pb-10 md:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-[0.08]"
        style={{ background: "radial-gradient(60% 100% at 15% 0%, var(--color-tax), transparent 70%)" }}
      />
      <Container className="relative">
        {eyebrow && <SectionEyebrow className="mb-3">{eyebrow}</SectionEyebrow>}
        <h1 className="max-w-3xl">{title}</h1>
        {sub && <p className="prose-measure mt-4 text-[1.1rem] text-[var(--color-ink-60)]">{sub}</p>}
        {cta && <div className="mt-6">{cta}</div>}
      </Container>
    </section>
  );
}
