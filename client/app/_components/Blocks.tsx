import Link from "@/global/components/Link";
import type { ReactNode } from "react";
import { isInternal } from "@/global/lib/links";
import { articles, sections } from "@/global/site";
import type { Block, Card, LinkTo, Page, Part } from "@/global/site/types";
import { BookingBar } from "./BookingBar";
import { Calculator } from "./Calculator";
import { Finale } from "./Finale";
import { GalleryGrid } from "./GalleryGrid";
import { TerrainMap } from "./TerrainMap";

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function Go({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return isInternal(href) ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} {...(/^https?:/.test(href) && { target: "_blank", rel: "noopener" })}>
      {children}
    </a>
  );
}

function Links({ links, tone = "line" }: { links?: LinkTo[]; tone?: "line" | "ghost" }) {
  if (!links?.length) return null;
  return (
    <div className="links">
      {links.map((l) => (
        <Go key={l.label} href={l.href} className={`btn btn--${tone}`}>
          {l.label} <span className="arr">→</span>
        </Go>
      ))}
    </div>
  );
}

function Cards({ cards }: { cards: Card[] }) {
  return (
    <ul className="cards" data-n={Math.min(cards.length, 4)}>
      {cards.map((c, n) => (
        <li key={c.t} className={`card${c.image ? " card--photo" : ""}`}>
          {c.image && <img src={c.image.src} alt={c.image.alt} loading="lazy" />}
          <div>
            <span className="card__meta">{c.meta ?? String(n + 1).padStart(2, "0")}</span>
            <h3>{c.href ? <Go href={c.href}>{c.t}</Go> : c.t}</h3>
            <p>{c.d}</p>
            {c.href && (
              <span className="card__go" aria-hidden>
                {c.cta ?? "Read more"} →
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export const when = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function Prose({ parts }: { parts: Part[] }) {
  return (
    <div className="prose">
      {parts.map((p, i) => (
        <div key={i}>
          {p.h && <h3 id={slugify(p.h)}>{p.h}</h3>}
          {p.p?.map((t, k) => <p key={k}>{t}</p>)}
          {p.list && (
            <ul>
              {p.list.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function body(b: Block, page: Page): ReactNode {
  switch (b.kind) {
    case "cards":
      return <Cards cards={b.cards} />;
    case "facts":
      return (
        <dl className="facts">
          {b.rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      );
    case "table":
      return (
        <div className="datatable">
          <table>
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, k) => (k === 0 ? <th key={k} scope="row" data-label={b.head[k]}>{c}</th> : <td key={k} data-label={b.head[k]}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "text":
      return (
        <>
          <Prose parts={b.parts} />
          {page.path === "/sitemap" && <SiteMap />}
        </>
      );
    case "faq":
      return b.groups.map((g, i) => (
        <div key={i} className="faq">
          {g.subject && <h3 id={slugify(g.subject)}>{g.subject}</h3>}
          {g.items.map((q) => (
            <details key={q.q}>
              <summary>{q.q}</summary>
              <p>{q.a}</p>
            </details>
          ))}
        </div>
      ));
    case "panels":
      return (
        <div className="panels">
          {b.items.map((i) => (
            <div key={i.t} className="panel">
              <img src={i.image.src} alt={i.image.alt} loading="lazy" />
              <div>
                <h3>{i.t}</h3>
                <p>{i.d}</p>
                {i.href && (
                  <Go href={i.href} className="btn btn--ghost">
                    {i.cta ?? i.t}
                  </Go>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    case "media":
      return (
        <div className="panel">
          <img src={b.image.src} alt={b.image.alt} loading="lazy" />
          <div>
            <h3>{b.t}</h3>
            <p>{b.text}</p>
            <Links links={b.links} tone="ghost" />
          </div>
        </div>
      );
    case "timeline":
      return (
        <ol className="timeline">
          {b.items.map((i) => (
            <li key={i.when + i.t}>
              {i.image && <img src={i.image.src} alt={i.image.alt} loading="lazy" />}
              <div>
                <span>{i.when}</span>
                <h3>{i.t}</h3>
                {i.d && <p>{i.d}</p>}
              </div>
            </li>
          ))}
        </ol>
      );
    case "pictures":
      return (
        <ul className="pictures">
          {b.images.map((i) => (
            <li key={i.src}>
              <img src={i.src} alt={i.alt} />
            </li>
          ))}
        </ul>
      );
    case "gallery":
      return <GalleryGrid images={b.images} />;
    case "map":
      return (
        <div className="panel panel--map">
          {/nathia/.test(page.path) ? <TerrainMap /> : b.image && <img src={b.image.src} alt={b.image.alt} loading="lazy" />}
          <div>
            {b.d && <p>{b.d}</p>}
            <Go href={b.href} className="btn btn--ghost">
              Open directions
            </Go>
          </div>
        </div>
      );
    case "calculator":
      return <Calculator />;
    case "booking":
      return <BookingBar />;
    case "listing": {
      const list = articles
        .filter((a) => a.path !== page.path)
        .filter((a) => !b.category || a.article!.category === b.category)
        .filter((a) => !b.author || a.article!.authorSlug === b.author);
      const shown = page.template === "listing" ? list : list.slice(0, 3);
      if (!shown.length) return <p className="muted">{b.empty ?? "Nothing has been published here yet."}</p>;
      return (
        <Cards
          cards={shown.map((a) => ({ t: a.title, d: a.description, href: a.path, cta: "Read", image: a.image, meta: when(a.article!.date) }))}
        />
      );
    }
    case "form":
      return null; // laid out in BlockView
    case "band":
      return null;
  }
}

function SiteMap() {
  return (
    <div className="sitemap">
      {sections.map((s) => (
        <div key={s.name}>
          <h3>{s.name}</h3>
          <ul>
            {s.pages
              .filter((p) => !/^\/(404|thank-you)/.test(p.path))
              .map((p) => (
                <li key={p.path}>
                  <Link href={p.path}>{p.article ? p.title : p.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function BlockView({ block: b, page }: { block: Block; page: Page }) {
  const id = slugify(b.h || b.id);
  if (b.kind === "band" || b.kind === "booking")
    return (
      <section className="band" aria-labelledby={id}>
        <div className="band__card" data-nav="dark">
        <div>
          <h2 id={id} className="display">{b.h}</h2>
          {b.d && <p>{b.d}</p>}
        </div>
        {b.kind === "booking" ? <BookingBar /> : <Links links={b.links} tone="ghost" />}
        </div>
      </section>
    );
  if (b.kind === "form") return <Finale heading={b.h} text={b.d} kind={b.form} about={b.about} />;
  const dark = b.kind === "panels" || b.kind === "media" || b.kind === "gallery" || b.kind === "map";
  return (
    <section className={`sec sec--${b.kind}${dark ? " dark" : ""}`} data-nav={dark ? "dark" : "light"} aria-labelledby={b.h ? id : undefined}>
      {b.h && <h2 id={id} className="display">{b.h}</h2>}
      {b.d && b.kind !== "map" && <p className="sec__d">{b.d}</p>}
      {body(b, page)}
      {b.kind !== "media" && b.kind !== "map" && <Links links={b.links} tone={dark ? "ghost" : "line"} />}
    </section>
  );
}
