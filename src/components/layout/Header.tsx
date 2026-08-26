import Link from "next/link";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-chrome)]">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <BrandMark priority />
        </Link>

        <MegaMenu />

        <div className="hidden items-center lg:flex">
          <a
            href={telHref()}
            className="font-mono-figure inline-flex items-center gap-2 whitespace-nowrap pl-3 text-[0.9rem] font-medium text-[var(--color-eggshell)] transition-colors hover:text-[var(--color-tax)]"
          >
            <Phone size={16} strokeWidth={2.25} className="text-[var(--color-tax)]" aria-hidden="true" />
            {BUSINESS.phone}
          </a>
        </div>

        <MobileDrawer />
      </Container>
    </header>
  );
}
