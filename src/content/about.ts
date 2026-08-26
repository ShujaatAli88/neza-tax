// Verbatim client copy. Do not paraphrase. The "San Diego County" geographic
// restriction was removed from the intro per client correction — the homepage
// ("Who We Are" section, src/app/page.tsx) still has the same phrase and is
// flagged separately for the client to confirm/remove.

export const ABOUT_CONTENT = {
  eyebrow: "About Neza Financial Group",
  title: "Professional Guidance. Personal Service.",

  intro: [
    "Neza Financial Group provides Tax Services, Business Services, Life & Health Insurance, and Mortgage Loans to individuals, families, and business owners.",
    "What began with a focus on tax preparation has grown into a broader range of services designed to help our clients with their personal, business, and financial needs.",
    "Through Neza Tax Services, we provide individual and business tax preparation along with year-round tax support. Our Business Services help business owners with bookkeeping, payroll, business formation, tax compliance, and other ongoing needs.",
    "We also help individuals, families, and businesses explore life and health insurance options. For clients purchasing, refinancing, or investing in real estate, Jose Gonzalez provides mortgage loan origination services through C2 Financial Corporation.",
  ],

  approach: {
    title: "Our Approach",
    paragraphs: [
      "We believe professional financial services should still feel personal.",
      "Our goal is to understand each client's situation, explain their options clearly, and provide responsive service throughout the year—not just during tax season.",
      "Whether you need help with your taxes, are running a business, exploring life or health insurance, or financing real estate, we want Neza Financial Group to be a trusted resource as your needs evolve.",
    ],
  },

  founder: {
    title: "Meet the Founder",
    name: "Jose Gonzalez",
    role: "Founder, Neza Financial Group LLC",
    paragraphs: [
      "Jose Gonzalez works with individuals, families, and business owners across tax services, business services, life and health insurance, and mortgage lending.",
      "As a tax professional, licensed California Life & Health Insurance Agent, and Mortgage Loan Originator, Jose brings experience across multiple areas that often intersect in his clients' personal and business financial lives.",
      "His approach is centered on personal service, clear communication, and long-term client relationships. By taking the time to understand each client's situation, Jose helps clients understand their options and make informed decisions.",
      "As a Mortgage Loan Originator with C2 Financial Corporation, Jose works directly with borrowers seeking financing for home purchases, refinancing, and investment properties.",
      "As Neza Financial Group continues to grow, the company remains committed to providing the personal, responsive service that has been at the heart of the business from the beginning.",
    ],
  },

  helpItems: [
    {
      title: "Tax Services",
      body: "Individual and business tax preparation, amended and prior-year returns, tax planning, and year-round tax support.",
      cta: "Explore Tax Services",
      href: "/tax-services",
      color: "var(--color-tax)",
    },
    {
      title: "Business Services",
      body: "Bookkeeping, payroll, business formation, S-Corporation elections, business compliance, and ongoing support for business owners.",
      cta: "Explore Business Services",
      href: "/business-services",
      color: "var(--color-business)",
    },
    {
      title: "Life & Health Insurance",
      body: "Life Insurance, Health Insurance, Dental & Vision, Employee Benefits, and IRAs & Retirement Solutions for individuals, families, and businesses.",
      cta: "Explore Insurance",
      href: "/insurance",
      color: "var(--color-insure)",
    },
    {
      title: "Mortgage Loans",
      body: "Mortgage loan origination for home purchases, refinancing, and investment properties through C2 Financial Corporation.",
      cta: "Explore Mortgage Loans",
      href: "/mortgage",
      color: "var(--color-mortgage)",
    },
  ],
} as const;
