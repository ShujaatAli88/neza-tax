import { EqualHousingIcon } from "@/components/ui/EqualHousingIcon";
import { BUSINESS } from "@/config/business";
import { cn } from "@/lib/cn";

// The ONLY place mortgage licensing text is authored. Every page that shows this
// disclosure imports this component — never retype the NMLS/DRE numbers elsewhere,
// that's exactly how the two DRE numbers (Jose's vs. C2's) end up swapped by accident.
//
// variant="compact"  — one combined line per party (footer)
// variant="detailed" — split across lines, optional "Mortgage Licensing" heading (mortgage page)
export function MortgageDisclosure({
  variant = "detailed",
  heading = false,
  onDark = false,
  className,
}: {
  variant?: "compact" | "detailed";
  heading?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  const muted = onDark ? "var(--color-chrome-muted)" : "var(--color-ink-60)";
  const strong = onDark ? "var(--color-eggshell)" : "var(--color-ink)";

  return (
    <div className={cn("text-[0.85rem]", className)} style={{ color: muted }}>
      {heading && (
        <p className="eyebrow mb-3" style={onDark ? { color: "var(--color-chrome-muted)" } : undefined}>
          Mortgage Licensing
        </p>
      )}

      {variant === "compact" ? (
        <>
          <p style={{ color: strong }}>
            Jose Gonzalez | Mortgage Loan Originator | NMLS #{BUSINESS.licenses.mloNmls} | CA DRE #
            {BUSINESS.licenses.joseDreCa}
          </p>
          <p className="mt-2">
            Mortgage loan origination services offered through C2 Financial Corporation | NMLS #
            {BUSINESS.licenses.c2Nmls} | CA DRE #{BUSINESS.licenses.c2DreCa}
          </p>
        </>
      ) : (
        <>
          <p style={{ color: strong }}>
            Jose Gonzalez, Mortgage Loan Originator
            <br />
            NMLS #{BUSINESS.licenses.mloNmls} | CA DRE #{BUSINESS.licenses.joseDreCa}
          </p>
          <p className="mt-3">
            Mortgage loan origination services offered through:
            <br />
            C2 Financial Corporation
            <br />
            NMLS #{BUSINESS.licenses.c2Nmls} | CA DRE #{BUSINESS.licenses.c2DreCa}
          </p>
        </>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <EqualHousingIcon onDark={onDark} />
        <a
          href="https://nmlsconsumeraccess.org/Home.aspx/MainSearch"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4"
          style={{ color: strong }}
        >
          NMLS Consumer Access
        </a>
      </div>
    </div>
  );
}
