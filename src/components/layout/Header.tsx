import Link from "next/link";
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

        <div className="hidden items-center gap-5 lg:flex">
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Client Portal — coming soon"
            className="cursor-not-allowed rounded-[var(--radius-pill)] border border-white/20 px-4 py-2 text-[0.85rem] font-semibold text-[var(--color-chrome-muted)] opacity-60"
          >
            Client Portal
          </button>
          <a
            href={telHref()}
            className="font-mono-figure text-[0.9rem] font-medium text-[var(--color-eggshell)] hover:text-[var(--color-chrome-muted)]"
          >
            {BUSINESS.phone}
          </a>
        </div>

        <MobileDrawer />
      </Container>
    </header>
  );
}
