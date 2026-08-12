import { BUSINESS } from "@/config/business";

const SITE_URL = "https://nezafinancial.com";

export function organizationSchema() {
  const sameAs = [
    BUSINESS.social.google,
    BUSINESS.social.facebook,
    BUSINESS.social.linkedin,
    BUSINESS.social.instagram,
  ].filter((v): v is string => Boolean(v));

  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.brand,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.phoneRaw,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.address.lat,
      longitude: BUSINESS.address.lng,
    },
    openingHours: ["Mo-Fr 09:00-17:00"],
    areaServed: BUSINESS.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
    })),
    sameAs,
    ...(BUSINESS.googleRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: BUSINESS.googleRating.rating,
            reviewCount: BUSINESS.googleRating.count,
          },
        }
      : {}),
  };
}

export function personSchema() {
  const credentials = [
    { name: "California Insurance License", value: BUSINESS.licenses.caInsurance },
    { name: "NMLS Mortgage Loan Originator", value: BUSINESS.licenses.mloNmls },
  ].filter((c) => Boolean(c.value));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BUSINESS.owner,
    jobTitle: "Owner",
    worksFor: { "@type": "Organization", name: BUSINESS.brand },
    hasCredential: credentials.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      identifier: c.value,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.url}`,
    provider: {
      "@type": "AccountingService",
      name: BUSINESS.brand,
      telephone: BUSINESS.phoneRaw,
    },
    areaServed: (opts.areaServed ?? BUSINESS.serviceArea).map((city) => ({
      "@type": "City",
      name: city,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function reviewSchema(
  reviews: { author: string; body: string; location?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: BUSINESS.brand,
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.body,
      ...(BUSINESS.googleRating
        ? {
            reviewRating: {
              "@type": "Rating",
              ratingValue: BUSINESS.googleRating.rating,
              bestRating: 5,
            },
          }
        : {}),
    })),
    ...(BUSINESS.googleRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: BUSINESS.googleRating.rating,
            reviewCount: BUSINESS.googleRating.count,
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
