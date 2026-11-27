import Link from "@/global/components/Link";
import { SiteFooter } from "@/global/components/SiteFooter";
import { SiteHeader } from "@/global/components/SiteHeader";
import { site } from "@/global/constants/site";
import { getPage, isHotel, trail } from "@/global/site";
import type { Page } from "@/global/site/types";
import { related } from "@/global/site/clusters";
import { TEMPLATE_PARTS, type Block } from "@/global/site/types";
import { BlockView, Go, slugify, when } from "./Blocks";
import { SmoothScroll } from "@/global/components/SmoothScroll";
import { Appear } from "./Appear";

// Every opening is the framed card; pages without their own picture use their section's.
const PICTURES: [prefix: string, src: string][] = [
  ["/hotels", "/media/ng/snow-aerial-sunset.webp"],
  ["/nathiagali", "/media/ng/aerial-clouds.webp"],
  ["/lahore", "/media/lhr/dusk.jpg"],
  ["/invest", "/media/ng/tower-sky.webp"],
  ["/overseas", "/media/farms/mist-valley.webp"],
  ["/insights", "/media/ng/rooftop-view.webp"],
  ["/about", "/media/stay/tower-snow-night.jpg"],
];
const TALL = new Set(["project", "hotel-home", "accommodation", "hotel-content"]);

function structuredData(page: Page) {
  const crumbs = [...trail(page), page];
  const faq = page.blocks.flatMap((b) => (b.kind === "faq" ? b.groups.flatMap((g) => g.items) : []));
  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: new URL(c.path, site.url).toString() })),
    },
  ];
  if (faq.length)
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  if (page.article)
    graph.push({
      "@type": "Article",
      headline: page.title,
      datePublished: page.article.date,
      author: { "@type": "Organization", name: page.article.author },
      description: page.description,
    });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

export function PageView({ page }: { page: Page }) {
  const hotel = isHotel(page);
  const crumbs = trail(page);
  const picture = page.image?.src ?? PICTURES.find(([p]) => page.path.startsWith(p))?.[1] ?? "/media/ng/snow-valley.webp";
  const label = hotel ? "Serene Heights Hotels and Resorts" : "Serene Heights Group";

  // "On this page": sub-headings for explainers and articles, subjects for long question pages.
  const toc = page.blocks.flatMap((b) =>
    (page.template === "explainer" || page.template === "article") && b.kind === "text" ? b.parts.flatMap((p) => (p.h ? [p.h] : [])) : [],
  );

  const opening = (
    <div className="phero__text">
      {crumbs.length === 0 && <span className="eyebrow">{label}</span>}
      {crumbs.length > 0 && (
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c) => (
            <Link key={c.path} href={c.path}>
              {c.name}
            </Link>
          ))}
        </nav>
      )}
      <h1 className="display">{page.title}</h1>
      <p>{page.intro}</p>
      {page.article && (
        <p className="byline">
          <Link href={`/insights/authors/${page.article.authorSlug}`}>{page.article.author}</Link> · {when(page.article.date)}
        </p>
      )}
      {page.actions && (
        <div className="links">
          {page.actions.map((a, i) => (
            <Go key={a.label} href={a.href} className={`btn ${i === 0 ? "btn--white" : "btn--ghost"}`}>
              {a.label}
            </Go>
          ))}
        </div>
      )}
    </div>
  );

  // Room pages open with their pictures, then the name; every other page opens with its heading.
  const [first, ...rest] = page.blocks;
  const picturesFirst = page.template === "room" && first?.kind === "pictures";
  const blocks = picturesFirst ? rest : page.blocks;

  // Only the client's drawn parts are sections. Anything else sits inside the part before it
  // (or the next one, when that is a form or a band).
  const drawn = TEMPLATE_PARTS[page.template];
  const groups: { block: Block; before: Block[]; after: Block[] }[] = [];
  let waiting: Block[] = [];
  for (const block of blocks) {
    const last = groups.at(-1);
    if (drawn.includes(block.id)) {
      groups.push({ block, before: waiting, after: [] });
      waiting = [];
    } else if (last && !["form", "band", "booking"].includes(last.block.kind)) last.after.push(block);
    else waiting.push(block);
  }

  // Links the plan draws between topics that this page does not already carry.
  const linked = JSON.stringify([page.blocks, page.actions]) + crumbs.map((c) => `"${c.path}"`).join();
  const also = related(page.path).filter((p) => !linked.includes(`"${p}"`)).map((p) => getPage(p)!);
  const plain = (k: string) => !["form", "band", "booking"].includes(k);
  const numbers = groups.map((g, i) => (plain(g.block.kind) && g.block.h ? groups.slice(0, i + 1).filter((x) => plain(x.block.kind) && x.block.h).length : undefined));
  const alsoAt = groups.findLastIndex((g) => !["form", "band", "booking"].includes(g.block.kind));

  return (
    <div className="site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData(page) }} />
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <Appear />
      <SiteHeader hotel={hotel} />
      <main id="main" data-template={page.template} data-nav="light">
        {picturesFirst && <BlockView block={{ ...first, h: "" }} page={page} />}
        <header className={`phero${TALL.has(page.template) ? " phero--tall" : ""}`}>
          <div className="phero__card" data-nav="dark">
            <img className="phero__img" src={picture} alt={page.image?.alt ?? ""} fetchPriority="high" />
            {opening}
          </div>
        </header>
        {toc.length > 1 && (
          <nav className="toc" aria-label="On this page">
            {toc.map((t) => (
              <a key={t} href={`#${slugify(t)}`}>
                {t}
              </a>
            ))}
          </nav>
        )}
        {page.template === "listing" && page.path.startsWith("/insights") && (
          <nav className="toc" aria-label="Filter">
            {[
              ["All", "/insights"],
              ["Investing guides", "/insights/investing"],
              ["Nathia Gali travel guides", "/insights/nathia-gali"],
              ["Project updates", "/insights/updates"],
            ].map(([label, href]) => (
              <Link key={href} href={href} aria-current={page.path === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>
        )}
        {groups.map((g, i) => (
          <BlockView key={i} block={g.block} page={page} before={g.before} after={g.after} also={i === alsoAt ? also : []} n={numbers[i]} />
        ))}
      </main>
      <SiteFooter hotel={hotel} />
    </div>
  );
}
