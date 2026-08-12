import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { BUSINESS } from "@/config/business";
import { telHref } from "@/lib/contact";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-chrome)]">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/Tax-Logo.png"
            alt={BUSINESS.brand}
            width={1777}
            height={668}
            priority
            className="h-9 w-auto md:h-10"
          />
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
