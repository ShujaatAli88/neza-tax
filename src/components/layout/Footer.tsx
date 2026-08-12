import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CredentialBadges } from "@/components/content/CredentialBadges";
import { ServiceAreaList } from "@/components/content/ServiceAreaList";
import { FacebookIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { FOOTER_LINKS } from "@/config/nav";
import { BUSINESS, currentHours } from "@/config/business";
import { telHref, mailtoHref } from "@/lib/contact";

export function Footer() {
  const socials = [
    { href: BUSINESS.social.facebook, Icon: FacebookIcon, label: "Facebook" },
    { href: BUSINESS.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
    { href: BUSINESS.social.instagram, Icon: InstagramIcon, label: "Instagram" },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <footer className="mt-auto bg-[var(--color-chrome)] text-[var(--color-eggshell)]">
      <Container className="section grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/images/Tax-Logo.png"
            alt={BUSINESS.brand}
            width={1777}
            height={668}
            className="mb-4 h-9 w-auto"
          />
          <p className="prose-measure text-[var(--color-chrome-muted)]">
            Tax, business, insurance and mortgage services from one office in Vista, CA.
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
            {currentHours()}
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
          <p className="eyebrow mb-3 !text-[var(--color-chrome-muted)]">Company</p>
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

        <nav aria-label="Legal">
          <p className="eyebrow mb-3 !text-[var(--color-chrome-muted)]">Legal</p>
          <ul className="space-y-2">
            {FOOTER_LINKS.legal.map((l) => (
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
        <Container className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <ServiceAreaList onDark />
          <CredentialBadges
            onDark
            badges={[
              { label: "CA Ins. Lic.", value: BUSINESS.licenses.caInsurance },
              { label: "NMLS", value: BUSINESS.licenses.mloNmls },
            ]}
          />
        </Container>
        <Container className="pb-6">
          <p className="text-[0.8rem] text-[var(--color-chrome-muted)]">
            Mortgage services offered through C2 Financial Corporation. NMLS #{BUSINESS.licenses.c2Nmls} ·
            CA DRE #{BUSINESS.licenses.c2DreCa}.
          </p>
          <p className="mt-2 text-[0.8rem] text-[var(--color-chrome-muted)]">
            © {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
