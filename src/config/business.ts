// SINGLE SOURCE OF TRUTH. Nothing in this file's domain is hardcoded elsewhere.
// Fields marked TODO_CONFIRM use a documented default pending client sign-off — see handoff doc.

export const BUSINESS = {
  legalName: "Neza Financial Group LLC",
  brand: "Neza Financial Group",
  owner: "Jose M. Gonzalez",
  ownerShort: "Jose",

  phone: "(760) 560-3160",
  phoneRaw: "+17605603160", // E.164 — used in schema.org structured data and all tel: links
  phoneTel: "7605603160", // used in sms: links only
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
    facebook: "https://www.facebook.com/nezataxservices",
    linkedin:
      "https://www.linkedin.com/company/neza-financial-&-insurance-services/",
    instagram: null as string | null, // TODO_CONFIRM
  },

  // Confirmed against the live "Neza Tax Services" Google Maps listing
  // (client-supplied screenshot): 5.0 rating, 11 reviews — matches the 11
  // reviews transcribed into src/content/googleReviews.ts exactly.
  googleRating: { rating: 5.0, count: 11 } as { rating: number; count: number } | null,
  c2PrequalUrl: "https://www.c2financialcorp.com/josegonzalez",
  schedulerUrl: "https://nezatax.proclient.com/c/appointments",
  // SecureDock — NOT the Client Portal. No login required; for sending
  // documents securely without an account (prospective/new clients especially).
  // Keep these two entirely separate everywhere they're linked.
  secureDockUrl: "https://www.mysecuredock.com/m/upload?list=6a178015-c8d8-463a-9cbc-44c536195683",

  photos: {
    jose: null as string | null,
    office: null as string | null,
  },
} as const;

