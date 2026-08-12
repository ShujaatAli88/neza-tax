import { Quote } from "lucide-react";

export function TestimonialCard({
  quote,
  author,
  location,
  color = "var(--color-ink)",
}: {
  quote: string;
  author: string;
  location: string;
  color?: string;
}) {
  return (
    <figure
      className="card-surface relative flex h-full flex-col overflow-hidden p-7"
      style={{ borderTop: `4px solid ${color}` }}
    >
      <Quote
        aria-hidden="true"
        size={88}
        strokeWidth={0}
        fill={color}
        className="pointer-events-none absolute -top-3 -right-3 opacity-[0.07]"
      />

      <div
        className="relative mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wide"
        style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`, color }}
      >
        Client review
      </div>

      <blockquote className="prose-measure relative flex-1 text-[0.98rem]">{quote}</blockquote>

      <figcaption className="relative mt-5 border-t border-[var(--color-rule)] pt-4">
        <span className="block font-medium text-[var(--color-ink)]">{author}</span>
        <span className="font-mono text-[0.8rem] text-[var(--color-ink-60)]">{location}</span>
      </figcaption>
    </figure>
  );
}
