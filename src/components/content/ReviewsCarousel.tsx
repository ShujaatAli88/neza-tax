"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { BUSINESS } from "@/config/business";

const AUTOPLAY_MS = 7000;
const VISIBLE = 3; // desktop count — tablet/mobile hide slots 2/3 via CSS, see below

// Official Google "G" mark (brand colors), used only to link out to the
// business's real Google listing — never restyled to the site's gold theme.
function GoogleGIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    </svg>
  );
}

interface ReviewItem {
  quote: string;
  author: string;
  location?: string;
  source?: string;
}

// Server-rendered markup is a plain stacked list (all reviews, one after
// another) so it degrades gracefully if JS never hydrates. Once mounted, it
// becomes a windowed slider — 3 cards visible on desktop, 2 on tablet, 1 on
// mobile (slots 2/3 are just hidden via CSS, not removed from the DOM, so no
// JS breakpoint detection or hydration-mismatch risk) — that auto-advances
// one review at a time, pausing on hover/focus and honoring reduced motion.
export function ReviewsCarousel({
  reviews,
  colors,
}: {
  reviews: ReviewItem[];
  colors: string[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    setHydrated(true);
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!hydrated || paused || reduceMotionRef.current || reviews.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [hydrated, paused, reviews.length]);

  if (!hydrated) {
    return (
      <div className="space-y-6">
        {reviews.map((t, i) => (
          <TestimonialCard key={`${t.author}-${i}`} {...t} color={colors[i % colors.length]} />
        ))}
        <div className="flex justify-center">
          <GoogleReviewsLink />
        </div>
      </div>
    );
  }

  const visible = Array.from({ length: Math.min(VISIBLE, reviews.length) }, (_, i) => ({
    review: reviews[(index + i) % reviews.length],
    slot: i,
    key: (index + i) % reviews.length,
  }));
  const goPrev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div role="region" aria-label="Client reviews" aria-live="polite" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ review, slot, key }) => (
          <div key={key} className={slot === 1 ? "hidden sm:block" : slot === 2 ? "hidden lg:block" : undefined}>
            <TestimonialCard {...review} color={colors[key % colors.length]} />
          </div>
        ))}
      </div>

      {reviews.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous review"
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-white)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-white)]"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <span className="font-mono text-[0.8rem] text-[var(--color-ink-60)]">
            {index + 1} / {reviews.length}
          </span>
          <button
            type="button"
            aria-label="Next review"
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-white)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-white)]"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <GoogleReviewsLink />
      </div>
    </div>
  );
}

function GoogleReviewsLink() {
  return (
    <a
      href={BUSINESS.social.google}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] bg-[var(--color-ink)] py-3 pl-3 pr-6 text-[0.9rem] font-semibold text-[var(--color-white)] shadow-[0_10px_24px_-6px_rgba(19,22,24,0.45)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-6px_rgba(19,22,24,0.5)]"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-white)]">
        <GoogleGIcon />
      </span>
      View All Reviews on Google
    </a>
  );
}
