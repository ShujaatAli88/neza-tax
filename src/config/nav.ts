export interface NavChild {
  label: string;
  href: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  color?: "tax" | "insure" | "mortgage";
  children?: NavChild[];
}

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Tax Services",
    href: "/tax-services",
    color: "tax",
    children: [
      {
        label: "Individual Tax Preparation",
        href: "/tax-services",
        description: "W-2 employees, families, retirees and first-time filers.",
      },
      {
        label: "Business Tax Returns",
        href: "/tax-services",
        description: "Schedule C through 1120-S.",
      },
      {
        label: "Self-Employed",
        href: "/tax-services",
        description: "1099 work, freelancing and gig income.",
      },
      {
        label: "Amended Returns",
        href: "/tax-services",
        description: "Fixed something wrong on a filed return.",
      },
      {
        label: "Prior-Year Returns",
        href: "/tax-services",
        description: "Behind by a year, or by several.",
      },
    ],
  },
  {
    label: "Business Services",
    href: "/business-services",
    children: [
      {
        label: "Bookkeeping & Accounting",
        href: "/business-services",
        description: "From set-it-up to fully hands-off.",
      },
      {
        label: "Payroll Services",
        href: "/business-services",
        description: "Hours in, payroll and filings out.",
      },
      {
        label: "Business Tax Preparation",
        href: "/business-services",
        description: "The tax side of running a business.",
      },
      {
        label: "LLC & Corporation Formation",
        href: "/business-services",
        description: "Entities set up right from the start.",
      },
      {
        label: "S-Corporation Elections",
        href: "/business-services",
        description: "Form 2553 and what changes after.",
      },
      {
        label: "Business Consulting",
        href: "/business-services",
        description: "A second set of eyes on the business.",
      },
    ],
  },
  {
    label: "Insurance",
    href: "/insurance",
    color: "insure",
    children: [
      {
        label: "Life Insurance",
        href: "/insurance",
        description: "Coverage for what your family depends on.",
      },
      {
        label: "Health Insurance",
        href: "/insurance",
        description: "Individual and Covered California plans.",
      },
      {
        label: "Employee Benefits",
        href: "/insurance",
        description: "Group plans for teams of two or two hundred.",
      },
      {
        label: "Group Health",
        href: "/insurance",
        description: "Group health, dental and vision plans.",
      },
      {
        label: "Retirement Solutions",
        href: "/insurance",
        description: "From solo 401(k)s to larger group plans.",
      },
    ],
  },
  { label: "Mortgage Loans", href: "/mortgage", color: "mortgage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "Tax Services", href: "/tax-services" },
    { label: "Business Services", href: "/business-services" },
    { label: "Insurance", href: "/insurance" },
    { label: "Mortgage Loans", href: "/mortgage" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Use", href: "/legal/terms" },
  ],
};
