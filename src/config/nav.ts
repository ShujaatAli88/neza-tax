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
    label: "Tax",
    href: "/tax",
    color: "tax",
    children: [
      {
        label: "Individual",
        href: "/tax/individual",
        description: "W-2 employees, families, retirees and first-time filers.",
      },
      {
        label: "Self-employed",
        href: "/tax/self-employed",
        description: "1099 work, freelancing and gig income.",
      },
      {
        label: "Business",
        href: "/tax/business",
        description: "Schedule C through 1120-S.",
      },
      {
        label: "Amended & prior-year",
        href: "/tax/amended-prior-year",
        description: "Fixed something wrong, or catching up.",
      },
      {
        label: "Planning",
        href: "/tax/planning",
        description: "The work that happens before December.",
      },
      {
        label: "What to bring",
        href: "/tax/what-to-bring",
        description: "An interactive checklist for your appointment.",
      },
    ],
  },
  {
    label: "Business Services",
    href: "/business",
    children: [
      {
        label: "Bookkeeping",
        href: "/business/bookkeeping",
        description: "From set-it-up to fully hands-off.",
      },
      {
        label: "Payroll",
        href: "/business/payroll",
        description: "Hours in, payroll and filings out.",
      },
      {
        label: "Formation",
        href: "/business/formation",
        description: "LLCs and corporations, set up right.",
      },
      {
        label: "S-corp elections",
        href: "/business/s-corp-election",
        description: "Form 2553 and what changes after.",
      },
      {
        label: "Consulting",
        href: "/business/consulting",
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
        label: "Health insurance",
        href: "/insurance/health",
        description: "Individual and Covered California plans.",
      },
      {
        label: "Life insurance",
        href: "/insurance/life",
        description: "Coverage for what your family depends on.",
      },
      {
        label: "Employee benefits",
        href: "/insurance/employee-benefits",
        description: "Group plans for teams of two or two hundred.",
      },
      {
        label: "Retirement",
        href: "/insurance/retirement",
        description: "From solo 401(k)s to group plans.",
      },
    ],
  },
  { label: "Mortgage", href: "/mortgage", color: "mortgage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Reviews", href: "/reviews" },
    { label: "Tax deadlines", href: "/deadlines" },
  ],
  legal: [
    { label: "Privacy policy", href: "/legal/privacy" },
    { label: "Terms of use", href: "/legal/terms" },
    { label: "Disclosures", href: "/legal/disclosures" },
  ],
};
