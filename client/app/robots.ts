import type { MetadataRoute } from "next";
import { site } from "@/global/constants/site";

// Same switch as the pages' robots tag: search engines stay out of the client preview
// until NEXT_PUBLIC_ALLOW_INDEXING is "true" on the real domain.
export default function robots(): MetadataRoute.Robots {
  const open = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: open ? { userAgent: "*", allow: "/", disallow: ["/thank-you/"] } : { userAgent: "*", disallow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
