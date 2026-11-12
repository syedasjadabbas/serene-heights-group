// schema.org JSON-LD for search engines: the organisation, the website and both projects.
import { projects, site } from "@/global/constants/site";

const GEO: Record<string, { lat: number; lon: number; locality: string; region: string }> = {
  "nathia-gali": { lat: 34.0745, lon: 73.379, locality: "Nathia Gali", region: "Khyber Pakhtunkhwa" },
  lahore: { lat: 31.5154, lon: 74.3487, locality: "Lahore", region: "Punjab" },
};

export function structuredData() {
  const org = `${site.url}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: site.name,
        alternateName: site.developer,
        url: site.url,
        logo: `${site.url}/apple-icon`,
        foundingDate: String(site.founded),
        telephone: site.contact.uan,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.contact.office,
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        sameAs: site.social.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": org },
        inLanguage: "en-PK",
      },
      ...projects.map((p) => ({
        "@type": "Place",
        "@id": `${site.url}/#${p.slug}`,
        name: `Serene Heights ${p.name}`,
        description: p.summary,
        url: p.url,
        address: {
          "@type": "PostalAddress",
          streetAddress: p.place,
          addressLocality: GEO[p.slug]?.locality,
          addressRegion: GEO[p.slug]?.region,
          addressCountry: "PK",
        },
        ...(GEO[p.slug] && {
          geo: { "@type": "GeoCoordinates", latitude: GEO[p.slug].lat, longitude: GEO[p.slug].lon },
        }),
      })),
    ],
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so it can't close the tag. */
export const structuredDataJson = () => JSON.stringify(structuredData()).replace(/</g, "\\u003c");
