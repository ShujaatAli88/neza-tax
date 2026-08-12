import { Phone, MessageSquare, CalendarCheck } from "lucide-react";
import { BUSINESS } from "@/config/business";
import { telHref, smsHref } from "@/lib/contact";

export function MobileActionBar() {
  const items = [
    { href: telHref(), Icon: Phone, label: "Call" },
    { href: smsHref(), Icon: MessageSquare, label: "Text" },
    { href: "/contact", Icon: CalendarCheck, label: "Book" },
  ];

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid h-[var(--mobile-bar-h)] grid-cols-3 border-t border-[var(--color-rule)] bg-[var(--color-paper)] lg:hidden"
    >
      {items.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          className="flex flex-col items-center justify-center gap-0.5 text-[var(--color-ink)] active:bg-[var(--color-ledger)]"
        >
          <Icon size={20} aria-hidden="true" />
          <span className="text-[0.75rem] font-medium">{label}</span>
        </a>
      ))}
    </nav>
  );
}
