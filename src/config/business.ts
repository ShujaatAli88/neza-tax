// SINGLE SOURCE OF TRUTH. Nothing in this file's domain is hardcoded elsewhere.
// Fields marked TODO_CONFIRM use a documented default pending client sign-off — see handoff doc.

export const BUSINESS = {
  legalName: "Neza Financial Group, LLC",
  brand: "Neza Financial Group",
  owner: "Jose M. Gonzalez",
  ownerShort: "Jose",

  phone: "(760) 560-3160",
  phoneRaw: "+17605603160",
  email: "info@nezafinancial.com",

  // TODO_CONFIRM — two addresses exist across owned domains. Using the Google Business Profile /
  // storefront-signage address (1929 W Vista Way) over the dormant nezafinancial.com address.
  address: {
    street: "1929 W Vista Way, Suite G",
    city: "Vista",
    state: "CA",
    zip: "92083",
    country: "US",
    lat: 33.2, // TODO_CONFIRM — geocode from confirmed address
    lng: -117.265,
  },

  hours: {
    standard: "Mon–Fri 9:00 AM – 5:00 PM · Sat by appointment",
    taxSeason: "Mon–Sat 9:00 AM – 7:00 PM",
    taxSeasonStart: "01-15",
    taxSeasonEnd: "04-15",
  },

  licenses: {
    caInsurance: "0L93924",
    mloNmls: "2253898",
    c2Nmls: "135622",
    c2DreCa: "01821025",
    ctec: null as string | null, // TODO_CONFIRM
    ptin: null as string | null, // TODO_CONFIRM
    ea: null as string | null, // TODO_CONFIRM
  },

  social: {
    google: "https://g.page/neza-tax-services",
    facebook: "https://www.facebook.com/nezafinancialandinsurance/", // TODO: rename page to "Neza Financial Group"
    linkedin:
      "https://www.linkedin.com/company/neza-financial-&-insurance-services/",
    instagram: null as string | null, // TODO_CONFIRM
  },

  googleRating: null as { rating: number; count: number } | null, // TODO_CONFIRM
  mortgageContactOverride: null as { phone: string; email: string } | null,
  c2PrequalUrl: "https://www.c2financialcorp.com/", // TODO_CONFIRM_URL — placeholder, not a personalized link

  serviceArea: [
    "Vista",
    "Oceanside",
    "Carlsbad",
    "San Marcos",
    "Escondido",
    "Fallbrook",
    "Encinitas",
    "Valley Center",
    "Bonsall",
    "Cardiff by the Sea",
  ],

  photos: {
    jose: null as string | null,
    office: null as string | null,
  },
} as const;

export function mortgageContact() {
  return {
    phone: BUSINESS.mortgageContactOverride?.phone ?? BUSINESS.phone,
    email: BUSINESS.mortgageContactOverride?.email ?? BUSINESS.email,
  };
}

export function isTaxSeason(date: Date): boolean {
  const md = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return md >= BUSINESS.hours.taxSeasonStart && md <= BUSINESS.hours.taxSeasonEnd;
}

export function currentHours(date: Date = new Date()): string {
  return isTaxSeason(date) ? BUSINESS.hours.taxSeason : BUSINESS.hours.standard;
}
