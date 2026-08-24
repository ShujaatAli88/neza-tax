import Link from "next/link";
import { NAV } from "@/config/nav";

// Flat primary nav — every item is a direct link, no dropdowns/flyouts.
// (Component name kept as MegaMenu to avoid touching Header.tsx's import;
// the mega-menu behavior itself was removed per client request.)
export function MegaMenu() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV.map((item) =>
          item.external ? (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block whitespace-nowrap px-2 py-2 text-[0.85rem] font-medium text-[var(--color-eggshell)] hover:text-[var(--color-chrome-muted)] xl:px-2.5 xl:text-[0.9rem]"
              >
                {item.label}
              </a>
            </li>
          ) : (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block whitespace-nowrap px-2 py-2 text-[0.85rem] font-medium text-[var(--color-eggshell)] hover:text-[var(--color-chrome-muted)] xl:px-2.5 xl:text-[0.9rem]"
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
