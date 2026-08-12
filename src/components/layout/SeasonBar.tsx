"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNextDeadline, urgencyColor, type ResolvedDeadline } from "@/config/deadlines";

const SESSION_KEY = "neza-seasonbar-dismissed";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function SeasonBar() {
  const [deadline, setDeadline] = useState<ResolvedDeadline | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const compute = () => setDeadline(getNextDeadline(new Date()));
    compute();

    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
    const msUntilMidnight = midnight.getTime() - now.getTime();
    const timeout = setTimeout(compute, msUntilMidnight);

    if (sessionStorage.getItem(SESSION_KEY) !== "1") {
      setDismissed(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  if (!deadline || dismissed) return null;

  const color = urgencyColor(deadline.daysAway);

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setDismissed(true);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-10 items-center border-b border-[var(--color-rule)] bg-[var(--color-paper)]"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 md:px-10">
        <p className="truncate font-mono text-[0.8rem]">
          <span aria-hidden="true" style={{ color }}>
            ▸{" "}
          </span>
          <span className="hidden sm:inline text-[var(--color-ink-60)]">NEXT DEADLINE </span>
          <time className="font-medium" style={{ color }}>
            {formatDate(deadline.date)}
          </time>
          <span className="mx-1.5 hidden md:inline">{deadline.title}</span>
          <span className="mx-1.5 md:hidden">
            {deadline.title.length > 32 ? `${deadline.title.slice(0, 32)}…` : deadline.title}
          </span>
          <span className="font-medium" style={{ color }}>
            {deadline.daysAway} day{deadline.daysAway === 1 ? "" : "s"}
          </span>
          <Link href="/deadlines" className="ml-2 hidden underline underline-offset-2 sm:inline">
            Book before this →
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss deadline notice"
          className="shrink-0 px-1 text-[var(--color-ink-60)] hover:text-[var(--color-ink)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
