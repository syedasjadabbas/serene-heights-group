// The page registry: every address on the site, from the client's page list.
import type { Page } from "./types";
import { groupPages } from "./pages/group";
import { investingPages } from "./pages/investing";
import { overseasPages } from "./pages/overseas";
import { nathiagaliPages } from "./pages/nathiagali";
import { hotelPages } from "./pages/hotels";
import { lahorePages } from "./pages/lahore";
import { insightPages } from "./pages/insights";
import { utilityPages } from "./pages/utility";

export const sections: { name: string; pages: Page[] }[] = [
  { name: "Group", pages: groupPages },
  { name: "Investing", pages: investingPages },
  { name: "Overseas buyers", pages: overseasPages },
  { name: "Nathia Gali", pages: nathiagaliPages },
  { name: "Hotels and resorts", pages: hotelPages },
  { name: "Lahore", pages: lahorePages },
  { name: "Insights", pages: insightPages },
  { name: "Utility", pages: utilityPages },
];

export const pages: Page[] = sections.flatMap((s) => s.pages);

const byPath = new Map(pages.map((p) => [p.path, p]));
export const getPage = (path: string) => byPath.get(path);

export const articles = pages
  .filter((p) => p.article)
  .sort((a, b) => b.article!.date.localeCompare(a.article!.date));

/** Every page under /hotels uses the hotel's own header and footer. */
export const isHotel = (page: Page) => page.path === "/hotels" || page.path.startsWith("/hotels/") || page.path === "/thank-you/stay";

/** Parent pages for the breadcrumb trail, nearest last. Only addresses that exist are linked. */
export function trail(page: Page): Page[] {
  const parts = page.path.split("/").filter(Boolean);
  const out: Page[] = [];
  for (let i = 1; i < parts.length; i++) {
    const p = byPath.get("/" + parts.slice(0, i).join("/"));
    if (p) out.push(p);
  }
  // Projects sit under /projects in the client's sitemap although their addresses are top level.
  if (/^\/(nathiagali|lahore)(\/|$)/.test(page.path)) out.unshift(byPath.get("/projects")!);
  return out.filter(Boolean);
}
