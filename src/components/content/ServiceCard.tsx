import Link from "next/link";
import { Check, ArrowRight, type LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";

export type ServiceColor = "tax" | "insure" | "mortgage" | "business";

const ACCENT: Record<ServiceColor, string> = {
  tax: "var(--color-tax)",
  insure: "var(--color-insure)",
  mortgage: "var(--color-mortgage)",
  business: "var(--color-business)",
};

interface ServiceCardProps {
  color: ServiceColor;
  icon: LucideIcon;
  title: string;
  items: string[];
  blurb: string;
  href: string;
  linkLabel: string;
  size?: "default" | "large";
}

export function ServiceCard({
  color,
  icon: Icon,
  title,
  items,
  blurb,
  href,
  linkLabel,
  size = "default",
}: ServiceCardProps) {
  const accent = ACCENT[color];

  return (
    <div
      className="card-surface group relative flex h-full flex-col overflow-hidden p-7 md:p-8"
      style={{
        borderTop: `4px solid ${accent}`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-[0.1] transition-opacity duration-300 group-hover:opacity-[0.18]"
        style={{ background: `radial-gradient(120% 100% at 15% 0%, ${accent}, transparent 70%)` }}
      />

      <IconBadge icon={Icon} color={accent} size="lg" className="relative" />

      <Link href={href} className="relative mt-6 inline-flex items-center gap-1.5">
        <h3 className={size === "large" ? "text-[1.5rem]" : "text-[1.2rem]"}>{title}</h3>
        <ArrowRight
          size={18}
          className="text-[var(--color-ink-60)] transition-transform duration-150 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>

      <p className="relative mt-2 text-[0.9rem] text-[var(--color-ink-60)]">{blurb}</p>

      <ul className="relative mt-5 flex-1 divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)]">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 py-2.5 text-[0.92rem]">
            <Check size={14} strokeWidth={3} style={{ color: accent }} className="shrink-0" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="relative mt-6 inline-flex items-center gap-2 text-[0.9rem] font-semibold"
        style={{ color: accent }}
      >
        {linkLabel}
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1"
          style={{ backgroundColor: `color-mix(in srgb, ${accent}, transparent 88%)` }}
        >
          <ArrowRight size={13} aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
