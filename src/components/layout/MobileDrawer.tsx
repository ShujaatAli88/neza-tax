"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV } from "@/config/nav";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";
import { Button } from "@/components/ui/Button";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-[1.5px] w-6 bg-[var(--color-eggshell)] transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-[1.5px] w-6 bg-[var(--color-eggshell)] transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`h-[1.5px] w-6 bg-[var(--color-eggshell)] transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 top-[var(--header-h,64px)] z-50 overflow-y-auto bg-[var(--color-ledger)]"
        >
          <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
            {NAV.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isExpanded = expanded === item.label;
              return (
                <div key={item.label} className="border-b border-[var(--color-rule)]">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-4 text-lg font-medium"
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label} submenu`}
                        onClick={() => setExpanded(isExpanded ? null : item.label)}
                        className="p-4"
                      >
                        <svg
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          aria-hidden="true"
                          className={isExpanded ? "rotate-180" : ""}
                        >
                          <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {hasChildren && isExpanded && (
                    <ul className="pb-3 pl-4">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 text-[0.95rem] text-[var(--color-ink-60)]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3 px-6 py-6">
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Client Portal — coming soon"
              className="cursor-not-allowed rounded-[var(--radius-pill)] border-2 border-[var(--color-ink)] px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--color-ink)] opacity-50"
            >
              Client Portal
            </button>
            <Button href={telHref()} variant="secondary">
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
