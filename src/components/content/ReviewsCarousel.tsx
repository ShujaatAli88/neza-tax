"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import type { Testimonial } from "@/content/testimonials";

// Server-rendered markup is a plain responsive grid (1 col mobile, 3 col
// desktop) so it reads as a simple stacked list if JS never hydrates. Once
// mounted, the same items are re-laid-out into a horizontal scroll-snap
// track with arrow controls — progressive enhancement, not a JS dependency.
export function ReviewsCarousel({
  reviews,
  colors,
}: {
  reviews: Testimonial[];
  colors: string[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(reviews.length <= 3);

  useEffect(() => setHydrated(true), []);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scrollByOne = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-review-item]");
    const distance = item ? item.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  if (!hydrated) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((t, i) => (
          <TestimonialCard key={t.author} {...t} color={colors[i % colors.length]} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateEdges}
        role="region"
        aria-label="Client reviews"
        tabIndex={0}
        className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {reviews.map((t, i) => (
          <div
            key={t.author}
            data-review-item
            className="w-full shrink-0 snap-start sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)]"
          >
            <TestimonialCard {...t} color={colors[i % colors.length]} />
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous reviews"
            disabled={atStart}
            onClick={() => scrollByOne(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-white)] text-[var(--color-ink)] transition-opacity disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-[var(--color-ink)] hover:enabled:text-[var(--color-white)]"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            disabled={atEnd}
            onClick={() => scrollByOne(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-white)] text-[var(--color-ink)] transition-opacity disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-[var(--color-ink)] hover:enabled:text-[var(--color-white)]"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
