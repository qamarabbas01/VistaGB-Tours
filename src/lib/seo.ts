import type { Metadata } from "next";
import { contact } from "@/config/contact";
import { SITE_URL, site } from "@/config/site";

export { SITE_URL, site };

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteUrl(pathOrUrl = "/"): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = site.defaultOgImage,
  imageAlt = site.defaultOgAlt,
  robots,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  robots?: Metadata["robots"];
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const fullTitle = title.includes(site.name) ? title : `${title} — ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots,
  };
}

export function withJsonLdContext(
  node: Record<string, unknown> | Record<string, unknown>[],
): Record<string, unknown> {
  if (Array.isArray(node)) {
    return {
      "@context": "https://schema.org",
      "@graph": node,
    };
  }

  return {
    "@context": "https://schema.org",
    ...node,
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    image: absoluteUrl(site.defaultOgImage),
    logo: absoluteUrl("/favicon.svg"),
    description: site.description,
    email: contact.email,
    telephone: contact.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yadgar Chowk",
      addressLocality: "Skardu",
      addressRegion: "Gilgit-Baltistan",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Gilgit-Baltistan",
    },
    sameAs: [contact.whatsappUrl],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: site.name,
    url: SITE_URL,
    description: site.description,
    inLanguage: "en",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/destinations?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: readonly FaqItem[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function collectionJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}): Record<string, unknown> {
  return {
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function touristPlaceJsonLd({
  type,
  name,
  description,
  path,
  image,
  geo,
  containedIn,
}: {
  type: "TouristDestination" | "TouristAttraction";
  name: string;
  description: string;
  path: string;
  image: string;
  geo?: { lat: number; lng: number };
  containedIn?: { name: string; path: string };
}): Record<string, unknown> {
  const node: Record<string, unknown> = {
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
  };

  if (geo) {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    };
  }

  if (containedIn) {
    node.containedInPlace = {
      "@type": "TouristDestination",
      name: containedIn.name,
      url: absoluteUrl(containedIn.path),
    };
  }

  return node;
}

export function webPageJsonLd({
  type = "WebPage",
  name,
  description,
  path,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage";
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };
}
