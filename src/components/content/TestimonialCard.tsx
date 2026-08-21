"use client";

import { useState } from "react";
import { Quote, Star } from "lucide-react";

// Testimonials vary a lot in length. Rather than let a long one stretch its
// card (and its row) far past the others, quotes past this length clamp to a
// fixed number of lines with a "Read more" toggle instead of being cut for good.
const LONG_QUOTE_THRESHOLD = 500;

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
  const [expanded, setExpanded] = useState(false);
  const isLong = quote.length > LONG_QUOTE_THRESHOLD;
  const initial = author.trim().charAt(0).toUpperCase();

  return (
    <figure
      className="card-surface group relative flex h-full flex-col overflow-hidden p-7"
      style={{ borderTop: `4px solid ${color}` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.14]"
        style={{ background: `radial-gradient(120% 100% at 85% 0%, ${color}, transparent 70%)` }}
      />

      <div className="relative flex items-center justify-between">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[var(--color-white)] transition-transform duration-200 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, ${color}, white 15%), color-mix(in srgb, ${color}, black 20%))`,
            boxShadow: `0 12px 22px -8px color-mix(in srgb, ${color}, transparent 25%)`,
          }}
        >
          <Quote size={18} strokeWidth={0} fill="currentColor" aria-hidden="true" />
        </span>
        <div className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} strokeWidth={0} fill="var(--color-seal)" />
          ))}
        </div>
      </div>

      <blockquote
        className={`prose-measure relative mt-5 flex-1 text-[1.02rem] leading-relaxed italic ${
          isLong && !expanded ? "line-clamp-6" : ""
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="relative mt-2 w-fit text-[0.85rem] font-semibold underline underline-offset-4"
          style={{ color }}
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}

      <figcaption className="relative mt-5 flex items-center gap-3 border-t border-[var(--color-rule)] pt-4">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.85rem] font-semibold text-[var(--color-white)]"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, ${color}, white 15%), color-mix(in srgb, ${color}, black 20%))`,
          }}
        >
          {initial}
        </span>
        <div>
          <span className="block font-medium text-[var(--color-ink)]">{author}</span>
          <span className="font-mono text-[0.8rem] text-[var(--color-ink-60)]">{location}</span>
        </div>
      </figcaption>
    </figure>
  );
}
