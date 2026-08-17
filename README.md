# Neza Financial Group — Website

Next.js 16 (App Router) + TypeScript + Tailwind v4. Built for the **nezafinancial.com** domain.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build locally
```

## Where things live

Almost every piece of editable text and business fact is centralized so a
non-developer can find it without hunting through page code:

| What | File |
|---|---|
| Phone, email, address, hours, license numbers, service-area copy | `src/config/business.ts` |
| Site navigation (header + footer links) | `src/config/nav.ts` |
| Tax deadline dates (shown in the Season Bar and homepage) | `src/config/deadlines.ts` |
| Client testimonials | `src/content/testimonials.ts` |
| About page copy | `src/content/about.ts` |
| Contact page intro copy | `src/content/contact.ts` |

Individual page layout/design still lives in each `src/app/<route>/page.tsx`,
but none of them hardcode a phone number, license number, or address — they
all pull from `config/business.ts`. Change a number once there and it updates
everywhere (homepage, footer, about, contact, mortgage disclosures).

**No CMS/admin dashboard is wired up.** That was an open question the client
never confirmed a decision on — see the audit report's "Blocked" section. The
config/content file structure above is deliberately set up so a lightweight
CMS (or just a non-developer editing these files directly) can be dropped in
later without restructuring anything.

## Contact form email delivery — FormSubmit

The contact form (`/contact`) posts to `src/app/api/contact/route.ts`, which
does our own validation, honeypot check, and rate limiting, then forwards the
submission to [FormSubmit](https://formsubmit.co) — a free, no-signup email
relay. It delivers to whatever address `BUSINESS.email` in `business.ts`
resolves to (currently `info@nezafinancial.com`), or a `CONTACT_TO_EMAIL`
env var if you want to override that without touching code.

**One-time activation required:** the first submission FormSubmit ever
receives for a given inbox triggers an "Activate Form" confirmation email to
that inbox — someone needs to open it and click the link once. After that,
every submission is delivered automatically, indefinitely, for free, with no
further action and no account to maintain. I already sent one test submission
to kick this off — check `info@nezafinancial.com` for that activation email
if it hasn't been clicked yet.

## Logo behavior

The header/footer logo (`src/components/ui/BrandMark.tsx`) switches per
route, per Jose's instruction: the Neza Tax Services logo
(`public/images/Tax-Logo.png`) shows on `/tax-services` and
`/business-services`; the Neza Financial Group LLC master-brand logo
(`public/images/Neza-Financial-Group-Logo.png`) shows everywhere else. Both
files are real supplied assets — if either is ever replaced, keep the
filenames or update the two `src` references in `BrandMark.tsx`.

## Ownership / transfer

- No proprietary accounts or keys of ours are referenced anywhere in the code.
- FormSubmit requires no account, no API key, and no login — it's tied only
  to the destination email address, which is the client's own inbox.
- To transfer: push this repo to the client's own GitHub account, then
  reconnect the Vercel project to that repo (or create a fresh Vercel project
  from it).
- `nezafinancial.com` is not yet connected in this project — no DNS-affecting
  config is committed. Point the domain at the Vercel project when ready to
  go live, and see the audit report for the `nezatax.com` → `/tax-services`
  redirect that should be set up at that time (not yet implemented — it
  requires access to nezatax.com's DNS/host, which isn't part of this repo).

## Testing checklist before go-live

- [ ] Real office address, phone, and email confirmed and set in `business.ts`
- [ ] C2 Financial pre-qualification URL confirmed and set (`c2PrequalUrl`)
- [ ] C2 Financial has signed off on the mortgage disclosures wording
- [ ] FormSubmit activation email clicked for the destination inbox
- [ ] San Diego County vs. all-of-California coverage language resolved (see audit report)
- [ ] Full Lighthouse / Core Web Vitals pass once real content/photos are in
