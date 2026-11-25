import Link from "next/link";
import { site } from "@/global/constants/site";
import { footers } from "@/global/site/menus";
import { Emblem } from "./Emblem";
import { isInternal } from "@/global/lib/links";

/** The client's two footers (group and hotel), plus the phone bar at the foot of every page. */
export function SiteFooter({ hotel }: { hotel: boolean }) {
  const f = hotel ? footers.hotel : footers.invest;
  return (
    <footer className="foot">
      <div className="foot__top">
        <div className="foot__brand">
          <span className="head__logo">
            <Emblem className="w-[20px]" />
            <span>
              Serene Heights
              <small>{hotel ? "Hotels and Resorts" : "Group"}</small>
            </span>
          </span>
          <a href={site.contact.uanHref}>UAN {site.contact.uan}</a>
          <a href={site.contact.whatsappHref} target="_blank" rel="noopener">
            WhatsApp {site.contact.whatsapp}
          </a>
        </div>
        {f.columns.map((c) => (
          <nav key={c.h} aria-label={c.h}>
            <h2>{c.h}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  {isInternal(l.href) ? (
                    <Link href={l.href}>{l.label}</Link>
                  ) : (
                    <a href={l.href} target="_blank" rel="noopener">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="foot__legal">
        {f.legal.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <span>© {site.name} · {site.developer}</span>
      </div>
      <div className="phonebar">
        <Link className="btn btn--main" href={hotel ? "/hotels/nathia-gali/book" : "/contact"}>
          {hotel ? "Request your dates" : "Enquire"}
        </Link>
        <a className="btn btn--line" href={site.contact.whatsappHref} target="_blank" rel="noopener">
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
