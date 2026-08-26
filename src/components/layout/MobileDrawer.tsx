"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV } from "@/config/nav";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";
import { Button } from "@/components/ui/Button";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);

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
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--color-rule)] py-4 text-lg font-medium transition-colors hover:text-[var(--color-tax)]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--color-rule)] py-4 text-lg font-medium transition-colors hover:text-[var(--color-tax)]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex flex-col gap-3 px-6 py-6">
            <Button href={telHref()} variant="secondary">
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
