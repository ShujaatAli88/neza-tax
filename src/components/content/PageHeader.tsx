import { Container } from "@/components/ui/Container";

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
    <section className="band-white section pt-14 pb-10 md:pt-20">
      <Container>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl">{title}</h1>
        {sub && <p className="prose-measure mt-4 text-[1.1rem] text-[var(--color-ink-60)]">{sub}</p>}
      </Container>
    </section>
  );
}
