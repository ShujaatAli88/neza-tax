import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export type ServiceColor = "tax" | "insure" | "mortgage" | "business";

const ICON_BG: Record<ServiceColor, string> = {
  tax: "var(--color-tax)",
  insure: "var(--color-insure)",
  mortgage: "var(--color-mortgage)",
  business: "var(--color-ink)",
};

interface ServiceCardProps {
  color: ServiceColor;
  title: string;
  items: string[];
  blurb: string;
  href: string;
  linkLabel: string;
  size?: "default" | "large";
}

export function ServiceCard({
  color,
  title,
  items,
  blurb,
  href,
  linkLabel,
  size = "default",
}: ServiceCardProps) {
  return (
    <div className="card-surface group flex h-full flex-col p-7 md:p-8">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-white)]"
        style={{ backgroundColor: ICON_BG[color] }}
      >
        <Check size={20} strokeWidth={2.5} />
      </span>

      <Link href={href} className="mt-5 inline-flex items-center gap-1.5">
        <h3 className={size === "large" ? "text-[1.5rem]" : "text-[1.2rem]"}>{title}</h3>
        <ArrowRight
          size={18}
          className="text-[var(--color-ink-60)] transition-transform duration-150 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>

      <p className="mt-2 text-[0.9rem] text-[var(--color-ink-60)]">{blurb}</p>

      <ul className="mt-5 flex-1 divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)]">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 py-2.5 text-[0.92rem]">
            <Check
              size={14}
              strokeWidth={3}
              style={{ color: ICON_BG[color] }}
              className="shrink-0"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold"
        style={{ color: ICON_BG[color] }}
      >
        {linkLabel}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
