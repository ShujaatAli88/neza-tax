export function TestimonialCard({
  quote,
  author,
  location,
}: {
  quote: string;
  author: string;
  location: string;
}) {
  return (
    <figure className="card-surface flex h-full flex-col p-7">
      <span aria-hidden="true" className="text-[2.25rem] leading-none text-[var(--color-rule)]">
        &ldquo;
      </span>
      <blockquote className="prose-measure -mt-2 flex-1 text-[0.98rem]">{quote}</blockquote>
      <figcaption className="mt-5 border-t border-[var(--color-rule)] pt-4 font-mono text-[0.85rem] text-[var(--color-ink-60)]">
        {author} — {location}
      </figcaption>
    </figure>
  );
}
