import Image from "next/image";
import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";

export function YearRoundSupportBlock() {
  return (
    <div className="card-surface grid overflow-hidden md:grid-cols-[340px_1fr]">
      <div
        className="relative flex items-center justify-center overflow-hidden p-8"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--color-seal), white 18%), color-mix(in srgb, var(--color-seal), black 30%))",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
          style={{ backgroundColor: "white" }}
        />
        <div
          className="relative rounded-2xl bg-white p-3 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)]"
          style={{ transform: "rotate(-4deg)" }}
        >
          <Image
            src="/images/jose-man-photo.png"
            alt="Tax return, pen, and calculator"
            width={600}
            height={600}
            sizes="(min-width: 768px) 260px, 240px"
            className="h-auto w-[220px] rounded-xl sm:w-[260px]"
          />
        </div>
      </div>

      <div className="p-8 md:p-10">
        <IconBadge icon={CalendarClock} color="var(--color-seal)" size="lg" />
        <p className="eyebrow mb-2 mt-5" style={{ color: "var(--color-seal)" }}>
          Year-round tax support
        </p>
        <h3 className="text-[1.35rem]">Available every month of the year — not just April.</h3>
        <p className="prose-measure mt-3 text-[1.05rem] text-[var(--color-ink-60)]">
          Tax questions don&rsquo;t only happen during tax season. Neza Tax Services is available
          year-round for tax preparation, amended returns, IRS notices, business tax matters, and
          other tax needs.
        </p>
        <Link
          href="/tax-services"
          className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-semibold"
          style={{ color: "var(--color-seal)" }}
        >
          Explore Tax Services
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-seal), transparent 88%)" }}
          >
            <ArrowRight size={13} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}
