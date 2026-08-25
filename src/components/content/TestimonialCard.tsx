"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Quote, Star, X } from "lucide-react";

// Testimonials vary a lot in length. Every card renders at the same fixed
// height (quote area clamped to a fixed number of lines) so paging through
// reviews of different lengths never shifts the layout. Whether a quote
// actually overflows those lines is measured from the rendered element
// (not guessed from character count, which varies with font/width) so a
// "Read more" only appears — and always appears — when text is truly clipped.
export function TestimonialCard({
  quote,
  author,
  location,
  source,
  color = "var(--color-ink)",
}: {
  quote: string;
  author: string;
  location?: string;
  source?: string;
  color?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const initial = author.trim().charAt(0).toUpperCase();

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    setIsTruncated(el.scrollHeight - el.clientHeight > 1);
  }, [quote]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  return (
    <>
      <figure
        className="card-surface group relative flex h-[440px] flex-col overflow-hidden p-7"
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
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} strokeWidth={0} fill="var(--color-seal)" />
            ))}
          </div>
          {source && (
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide"
              style={{ backgroundColor: `color-mix(in srgb, ${color}, transparent 88%)`, color }}
            >
              {source}
            </span>
          )}
        </div>
      </div>

      <blockquote
        ref={quoteRef}
        className="prose-measure relative mt-5 overflow-hidden text-[1.02rem] leading-relaxed italic line-clamp-6"
        style={{ fontFamily: "var(--font-display)", height: "9.75em" }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="relative mt-2 h-6">
        {isTruncated && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-fit text-[0.85rem] font-semibold underline underline-offset-4"
            style={{ color }}
          >
            Read more
          </button>
        )}
      </div>

      <figcaption className="relative mt-auto flex items-center gap-3 border-t border-[var(--color-rule)] pt-4">
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
          {location && <span className="font-mono text-[0.8rem] text-[var(--color-ink-60)]">{location}</span>}
        </div>
      </figcaption>
    </figure>

    {modalOpen &&
      createPortal(
        <div
          role="presentation"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Full review from ${author}`}
            onClick={(e) => e.stopPropagation()}
            className="card-surface relative max-h-[80vh] w-full max-w-lg overflow-y-auto p-7"
            style={{ borderTop: `4px solid ${color}` }}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink-60)] transition-colors hover:bg-[var(--color-rule)] hover:text-[var(--color-ink)]"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2 pr-8">
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} strokeWidth={0} fill="var(--color-seal)" />
                ))}
              </div>
              {source && (
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide"
                  style={{ backgroundColor: `color-mix(in srgb, ${color}, transparent 88%)`, color }}
                >
                  {source}
                </span>
              )}
            </div>

            <blockquote
              className="prose-measure relative mt-4 text-[1.02rem] leading-relaxed italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>

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
                {location && <span className="font-mono text-[0.8rem] text-[var(--color-ink-60)]">{location}</span>}
              </div>
            </figcaption>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
