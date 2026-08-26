export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Flat nav, no dropdowns — every item links directly to its own page.
// (Previously had per-service flyout submenus; removed per client request:
// "menu items should link to their page, not sure if i need a drop down menu.")
export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Tax Services", href: "/tax-services" },
  { label: "Business Services", href: "/business-services" },
  { label: "Insurance", href: "/insurance" },
  { label: "Mortgage Loans", href: "/mortgage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Client Portal", href: "https://nezatax.proclient.com", external: true },
];

export const FOOTER_LINKS: { company: NavItem[]; legal: NavItem[] } = {
  company: [
    { label: "Tax Services", href: "/tax-services" },
    { label: "Business Services", href: "/business-services" },
    { label: "Insurance", href: "/insurance" },
    { label: "Mortgage Loans", href: "/mortgage" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Client Portal", href: "https://nezatax.proclient.com", external: true },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Use", href: "/legal/terms" },
  ],
};
