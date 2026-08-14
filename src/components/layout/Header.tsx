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
