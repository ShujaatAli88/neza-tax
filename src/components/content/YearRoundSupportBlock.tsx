import Image from "next/image";
import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";

export function YearRoundSupportBlock() {
  return (
    <div className="card-surface grid overflow-hidden md:grid-cols-[340px_1fr]">
      <div className="relative min-h-[280px]">
        <Image
          src="/images/tax-support-photo.jpg"
          alt=""
          fill
          sizes="(min-width: 768px) 340px, 100vw"
          className="object-cover"
        />
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
