// Same-site paths (/booking/…, /serene-heights-nathiagali…) open in this tab; WhatsApp and other sites
// open in a new one.
export const isInternal = (url: string) => url.startsWith("/") && !url.startsWith("//");
export const linkTarget = (url: string) => (isInternal(url) ? {} : { target: "_blank", rel: "noopener" });
/** Arrow for a link: → stays on this site, ↗ leaves it. */
export const linkArrow = (url: string) => (isInternal(url) ? "→" : "↗");
