import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { MortgageDisclosure } from "@/components/compliance/MortgageDisclosure";
import { FacebookIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { FOOTER_LINKS } from "@/config/nav";
import { BUSINESS } from "@/config/business";
import { telHref, mailtoHref } from "@/lib/contact";

export function Footer() {
  const socials = [
    { href: BUSINESS.social.facebook, Icon: FacebookIcon, label: "Facebook" },
    { href: BUSINESS.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
    { href: BUSINESS.social.instagram, Icon: InstagramIcon, label: "Instagram" },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <footer className="mt-auto bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
      <Container className="section grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-5">
            <BrandMark className="h-16 w-auto md:h-20" />
          </div>
          <p className="prose-measure text-[var(--color-chrome-muted)]">
            Tax Services · Business Services · Life &amp; Health Insurance · Mortgage Loans
          </p>
          <address className="mt-4 not-italic text-[0.95rem] text-[var(--color-chrome-muted)]">
            {BUSINESS.address.street}
            <br />
            {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
            <br />
            <a href={telHref()} className="text-[var(--color-eggshell)] underline underline-offset-4">
              {BUSINESS.phone}
            </a>{" "}
            ·{" "}
            <a href={mailtoHref()} className="text-[var(--color-eggshell)] underline underline-offset-4">
              {BUSINESS.email}
            </a>
            <br />
            Office Visits By Appointment · Se Habla Español
          </address>

          {socials.length > 0 && (
            <div className="mt-5 flex gap-4">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-chrome-2)] text-[var(--color-eggshell)] hover:bg-[var(--color-eggshell)] hover:text-[var(--color-chrome)]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-3 !text-[var(--color-chrome-muted)]">Explore</p>
          <ul className="space-y-2">
            {FOOTER_LINKS.company.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[var(--color-chrome-muted)] hover:text-[var(--color-eggshell)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-[var(--color-chrome-2)]">
        <Container className="py-8">
          <p className="eyebrow mb-4 !text-[var(--color-chrome-muted)]">Licensing</p>
          <p className="text-[0.85rem] text-[var(--color-eggshell)]">
            CA Insurance Lic. #{BUSINESS.licenses.caInsurance}
          </p>
          <MortgageDisclosure variant="compact" onDark className="mt-2" />
        </Container>
      </div>

      <div className="border-t border-[var(--color-chrome-2)]">
        <Container className="flex flex-col-reverse gap-3 py-6 text-[0.8rem] text-[var(--color-chrome-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-4">
            {FOOTER_LINKS.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[var(--color-eggshell)]">
                {l.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
