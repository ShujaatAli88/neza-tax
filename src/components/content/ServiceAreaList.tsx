import { BUSINESS } from "@/config/business";
import { cn } from "@/lib/cn";

export function ServiceAreaList({ onDark = false }: { onDark?: boolean }) {
  return (
    <p
      className={cn(
        "font-mono text-[0.85rem]",
        onDark ? "text-[var(--color-chrome-muted)]" : "text-[var(--color-ink-60)]",
      )}
    >
      {BUSINESS.serviceArea.join(" · ")}
    </p>
  );
}
