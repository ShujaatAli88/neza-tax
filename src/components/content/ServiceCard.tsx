import Link from "next/link";
import { Check, ArrowRight, type LucideIcon } from "lucide-react";

export type ServiceColor = "tax" | "insure" | "mortgage" | "business";

const ACCENT: Record<ServiceColor, string> = {
  tax: "var(--color-tax)",
  insure: "var(--color-insure)",
  mortgage: "var(--color-mortgage)",
  business: "var(--color-ink)",
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
      className="card-surface group relative flex h-full flex-col overflow-hidden p-7 transition-[border-color] duration-200 md:p-8"
      style={{ borderTop: `4px solid ${accent}` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.07] transition-opacity duration-200 group-hover:opacity-[0.12]"
        style={{ background: `radial-gradient(120% 100% at 20% 0%, ${accent}, transparent 70%)` }}
      />

      <span
        aria-hidden="true"
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--color-white)] transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: accent, boxShadow: `0 10px 20px -6px ${accent}` }}
      >
        <Icon size={26} strokeWidth={2} />
      </span>

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
        className="relative mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold"
        style={{ color: accent }}
      >
        {linkLabel}
        <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}
