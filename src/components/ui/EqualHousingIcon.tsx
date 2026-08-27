import Image from "next/image";

// Sourced from HUD's official 300dpi Equal Housing Opportunity graphics
// (hud.gov/contactus/hudgraphics) — this is the standard black/white mark,
// shown as-is rather than reinterpreted inside a custom colored badge. Use
// the black version on light backgrounds and the white version (house in
// white, the equal-sign bars showing through in black) on dark ones.
export function EqualHousingIcon({
  className,
  onDark = false,
  title = "Equal Housing Opportunity",
}: {
  className?: string;
  onDark?: boolean;
  title?: string;
}) {
  return (
    <Image
      src={onDark ? "/images/equal-housing-opportunity-white.png" : "/images/equal-housing-opportunity-black.png"}
      alt={title}
      width={280}
      height={300}
      className={`h-14 w-auto shrink-0 ${className ?? ""}`}
    />
  );
}
