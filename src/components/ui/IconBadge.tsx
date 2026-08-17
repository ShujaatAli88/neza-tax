import type { LucideIcon } from "lucide-react";

const SIZES = {
  sm: { box: "h-11 w-11", icon: 18, radius: "rounded-xl" },
  md: { box: "h-12 w-12", icon: 22, radius: "rounded-2xl" },
  lg: { box: "h-14 w-14", icon: 26, radius: "rounded-2xl" },
} as const;

export function IconBadge({
  icon: Icon,
  color,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { box, icon, radius } = SIZES[size];

  return (
    <span
      aria-hidden="true"
      className={`flex ${box} ${radius} shrink-0 items-center justify-center text-[var(--color-white)] transition-transform duration-200 group-hover:scale-105 ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${color}, white 15%), color-mix(in srgb, ${color}, black 20%))`,
        boxShadow: `0 12px 22px -8px color-mix(in srgb, ${color}, transparent 25%), inset 0 1px 0 rgba(255,255,255,0.25)`,
      }}
    >
      <Icon size={icon} strokeWidth={2} />
    </span>
  );
}
