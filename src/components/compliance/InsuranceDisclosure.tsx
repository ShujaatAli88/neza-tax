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
      className={cn("text-[0.85rem] leading-relaxed", className)}
      style={{ color: onDark ? "var(--color-chrome-muted)" : "var(--color-ink-60)" }}
    >
      Neza Financial &amp; Insurance Services
      <br />
      A DBA of Neza Financial Group LLC
      <br />
      CA Insurance Lic. #{BUSINESS.licenses.caInsurance}
    </p>
  );
}
