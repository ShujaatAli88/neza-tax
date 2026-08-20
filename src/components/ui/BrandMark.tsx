"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

// Per Jose's own instruction: the Neza Tax Services logo is for the Tax
// Services and Business Services pages only. Every other page leads with the
// Neza Financial Group master-brand logo.
const TAX_BRAND_ROUTES = ["/tax-services", "/business-services"];

export function BrandMark({
  priority = false,
  className,
}: {
  priority?: boolean;
  className?: string;
}) {
  const pathname = usePathname() ?? "";
  const useTaxLogo = TAX_BRAND_ROUTES.some((route) => pathname.startsWith(route));
  const sizeClass = cn("h-14 w-auto md:h-[60px]", className);

  if (useTaxLogo) {
    return (
      <Image
        src="/images/Tax-Logo.png"
        alt="Neza Tax Services"
        width={1777}
        height={668}
        priority={priority}
        className={sizeClass}
      />
    );
  }

  return (
    <Image
      src="/images/Neza-Financial-Group-Logo.png"
      alt="Neza Financial Group LLC"
      width={1668}
      height={590}
      priority={priority}
      className={sizeClass}
    />
  );
}
