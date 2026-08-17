// SINGLE SOURCE OF TRUTH. Nothing in this file's domain is hardcoded elsewhere.
// Fields marked TODO_CONFIRM use a documented default pending client sign-off — see handoff doc.

export const BUSINESS = {
  legalName: "Neza Financial Group LLC",
  brand: "Neza Financial Group",
  owner: "Jose M. Gonzalez",
  ownerShort: "Jose",

  phone: "(760) 560-3160",
  phoneRaw: "+17605603160", // E.164 — used in schema.org structured data
  phoneTel: "7605603160", // used in tel: links, per client spec
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
    display: "By Appointment",
    note: "Appointments generally available Monday–Friday, 12 PM–5 PM. Other times may be available by appointment.",
  },

  licenses: {
    caInsurance: "0L93924",
    mloNmls: "2253898",
    joseDreCa: "02142909", // Jose's own CA DRE — distinct from C2's DRE below, do not conflate
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
  c2PrequalUrl: "https://www.c2financialcorp.com/josegonzalez",

  photos: {
    jose: null as string | null,
    office: null as string | null,
  },
} as const;

