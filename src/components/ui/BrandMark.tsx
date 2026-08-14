import Image from "next/image";

// Sitewide logo. If/when a separate "Neza Financial Group" master-brand logo
// file is supplied, this is the only place to change to bring back a
// per-route swap (Tax Services logo on /tax-services and /business-services,
// master-brand logo elsewhere) — don't reintroduce that split without an
// actual second logo file to show, a text-only stand-in reads as a missing logo.
export function BrandMark({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/images/Tax-Logo.png"
      alt="Neza Financial Group"
      width={1777}
      height={668}
      priority={priority}
      className="h-9 w-auto md:h-10"
    />
  );
}
