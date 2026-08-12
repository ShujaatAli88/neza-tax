"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NAV } from "@/config/nav";
import { cn } from "@/lib/cn";

const COLOR_VAR: Record<string, string> = {
  tax: "var(--color-tax)",
  insure: "var(--color-insure)",
  mortgage: "var(--color-mortgage)",
};

export function MegaMenu() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenLabel(null);
    }
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenLabel(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <nav ref={navRef} aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const isOpen = openLabel === item.label;
          return (
            <li key={item.label} className="relative">
              {hasChildren ? (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenLabel(isOpen ? null : item.label)}
                  className="flex items-center gap-1 px-3 py-2 text-[0.95rem] font-medium text-[var(--color-eggshell)] hover:text-[var(--color-chrome-muted)]"
                >
                  {item.label}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                    className={cn("transition-transform", isOpen && "rotate-180")}
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-[0.95rem] font-medium text-[var(--color-eggshell)] hover:text-[var(--color-chrome-muted)]"
                >
                  {item.label}
                </Link>
              )}

              {hasChildren && isOpen && (
                <div
                  className="card-surface absolute left-0 top-full z-40 mt-3 w-[380px] overflow-hidden !shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                  style={{
                    borderTop: `3px solid ${item.color ? COLOR_VAR[item.color] : "var(--color-ink)"}`,
                  }}
                >
                  <ul className="divide-y divide-[var(--color-rule)]">
                    {item.children!.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpenLabel(null)}
                          className="block px-5 py-3.5 hover:bg-[var(--color-ledger)]"
                        >
                          <span className="block text-[0.95rem] font-medium text-[var(--color-ink)]">
                            {child.label}
                          </span>
                          <span className="mt-0.5 block text-[0.85rem] text-[var(--color-ink-60)]">
                            {child.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={item.href}
                    onClick={() => setOpenLabel(null)}
                    className="block border-t border-[var(--color-rule)] px-5 py-3 text-[0.85rem] font-medium underline underline-offset-4"
                  >
                    View all {item.label.toLowerCase()} →
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
