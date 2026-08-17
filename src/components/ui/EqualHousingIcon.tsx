import Image from "next/image";

// Sourced from HUD's official 300dpi Equal Housing Opportunity graphics
// (hud.gov/contactus/hudgraphics), background removed for transparency.
//
// Always rendered white-on-a-colored-badge rather than bare black line art —
// that way it reads clearly regardless of whether it sits on a light or dark
// section, instead of needing a separate dark/light variant threaded through
// every consumer.
export function EqualHousingIcon({
  className,
  title = "Equal Housing Opportunity",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--color-mortgage), white 15%), color-mix(in srgb, var(--color-mortgage), black 20%))",
        boxShadow: "0 10px 20px -6px color-mix(in srgb, var(--color-mortgage), transparent 25%)",
      }}
    >
      <Image src="/images/equal-housing-opportunity-white.png" alt={title} width={36} height={32} />
    </span>
  );
}
