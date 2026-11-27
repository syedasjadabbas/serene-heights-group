import type { MetadataRoute } from "next";
import { site } from "@/global/constants/site";
import { pages } from "@/global/site";

// Every page in the client's plan, plus the booking and investor sites served on this domain.
// Thank-you and 404 pages are left out: nobody should land on them from a search.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  return [
    ...pages
      .filter((p) => !/^\/(404|thank-you)/.test(p.path))
      .map((p) => ({
        url: url(p.path),
        ...(p.article && { lastModified: p.article.date }),
        priority: p.path === "/" ? 1 : p.path.split("/").length === 2 ? 0.8 : 0.6,
      })),
    { url: url("/booking"), priority: 0.8 },
    { url: url("/serene-investors"), priority: 0.8 },
  ];
}
