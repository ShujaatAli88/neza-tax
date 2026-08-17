import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "onChrome" | "invert" | "glass" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-[0.95rem] font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-ink),white_8%),var(--color-ink))] text-[var(--color-white)] shadow-[0_10px_24px_-6px_rgba(16,26,21,0.45)] hover:shadow-[0_16px_32px_-6px_rgba(16,26,21,0.5)] hover:-translate-y-0.5",
  secondary:
    "border-2 border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-white)] hover:-translate-y-0.5",
  onChrome:
    "border-2 border-[var(--color-eggshell)] text-[var(--color-eggshell)] hover:bg-[var(--color-eggshell)] hover:text-[var(--color-chrome)]",
  invert:
    "bg-[linear-gradient(135deg,var(--color-white),color-mix(in_srgb,var(--color-eggshell),black_4%))] text-[var(--color-chrome)] shadow-[0_10px_24px_-6px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.4)] hover:-translate-y-0.5",
  glass:
    "glass-surface border border-white/30 text-[var(--color-eggshell)] hover:bg-white/20 hover:border-white/50",
  ghost: "rounded-none px-0 py-0 text-[var(--color-ink)] underline underline-offset-4 hover:no-underline",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  external?: boolean;
}

export function Button({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  onClick,
  external,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
