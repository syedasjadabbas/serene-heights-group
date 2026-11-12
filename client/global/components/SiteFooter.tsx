import { HAS_BOOKING, projects, site } from "@/global/constants/site";
import { bookingHomeUrl, linkTarget, manageUrl } from "@/global/lib/booking";

export function SiteFooter() {
  return (
    <footer className="footer" data-nav="light">
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/media/brand/logo-blue.png" alt="Serene Heights" />
          <p>
            Serene Heights Group — hotels, resorts and city addresses developed and managed by {site.developer}, since{" "}
            {site.founded}.
          </p>
        </div>
        <div>
          <h4>Projects</h4>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <a href={p.url} target="_blank" rel="noopener">
                  Serene Heights {p.name} ↗
                </a>
              </li>
            ))}
            <li>
              <a href="#upcoming">Upcoming projects</a>
            </li>
            <li>
              <a href="#investors">Serene Investors</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Stay</h4>
          <ul>
            <li>
              <a href={bookingHomeUrl()} {...linkTarget(bookingHomeUrl())}>
                {HAS_BOOKING ? "Serene Booking" : "Book a stay ↗"}
              </a>
            </li>
            {manageUrl && (
              <li>
                <a href={manageUrl} {...linkTarget(manageUrl)}>
                  Manage a booking
                </a>
              </li>
            )}
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={site.contact.uanHref}>UAN {site.contact.uan}</a>
            </li>
            <li>
              <a href={site.contact.whatsappHref} target="_blank" rel="noopener">
                WhatsApp {site.contact.whatsapp}
              </a>
            </li>
            {projects.map((p) => (
              <li key={p.email}>
                <a href={`mailto:${p.email}`}>{p.email}</a>
              </li>
            ))}
            <li style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>Head office: {site.contact.office}</li>
          </ul>
        </div>
      </div>
      <div className="footer__giant" aria-hidden>
        serene heights
      </div>
      <div className="footer__bottom">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.developer}
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
