import { CalendarClock } from "lucide-react";

export function YearRoundSupportBlock() {
  return (
    <div className="card-surface flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:p-10">
      <span
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[var(--color-white)]"
        style={{ backgroundColor: "var(--color-seal)" }}
      >
        <CalendarClock size={26} strokeWidth={2} />
      </span>
      <div>
        <p className="eyebrow mb-2" style={{ color: "var(--color-seal)" }}>
          Year-round tax support
        </p>
        <p className="prose-measure text-[1.05rem]">
          Tax questions don&rsquo;t only happen during tax season. Neza Tax Services is available
          year-round for tax preparation, amended returns, IRS notices, business tax matters, and
          other tax needs.
        </p>
      </div>
    </div>
  );
}
