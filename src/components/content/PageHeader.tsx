import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
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
      </Container>
    </section>
  );
}
