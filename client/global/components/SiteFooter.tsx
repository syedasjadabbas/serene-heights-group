import Link from "@/global/components/Link";
import { site } from "@/global/constants/site";
import { footers } from "@/global/site/menus";
import { isInternal } from "@/global/lib/links";

/** The client's two footers (group and hotel), plus the phone bar at the foot of every page. */
export function SiteFooter({ hotel }: { hotel: boolean }) {
  const f = hotel ? footers.hotel : footers.invest;
  return (
    <footer className="footer" data-nav="light">
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/media/brand/logo-blue.png" alt="Serene Heights" />
          <p>
            {hotel ? "Serene Heights Hotels and Resorts" : "Serene Heights Group — hotels, resorts and city addresses"} developed and managed by {site.developer}, since {site.founded}.
          </p>
          <a href={site.contact.uanHref}>UAN {site.contact.uan}</a>
          <a href={site.contact.whatsappHref} target="_blank" rel="noopener">
            WhatsApp {site.contact.whatsapp}
          </a>
        </div>
        {f.columns.map((c) => (
          <nav key={c.h} aria-label={c.h}>
            <h4>{c.h}</h4>
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
      <div className="footer__giant" aria-hidden>
        serene heights
      </div>
      <div className="footer__legal">
        {f.legal.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <span>© {site.name} · {site.developer}</span>
      </div>
      <div className="phonebar">
        <Link className="btn btn--ink" href={hotel ? "/hotels/nathia-gali/book" : "/contact"}>
          {hotel ? "Request your dates" : "Enquire"}
        </Link>
        <a className="btn btn--line" href={site.contact.whatsappHref} target="_blank" rel="noopener">
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
