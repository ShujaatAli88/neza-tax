import { BUSINESS } from "@/config/business";
import { cn } from "@/lib/cn";

export function InsuranceDisclosure({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn("text-[0.85rem]", className)}
      style={{ color: onDark ? "var(--color-chrome-muted)" : "var(--color-ink-60)" }}
    >
      Jose Gonzalez, California Insurance License #{BUSINESS.licenses.caInsurance}.
    </p>
  );
}
