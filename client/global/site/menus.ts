// Headers, phone menus and footers, exactly as drawn in the client's two Navigation boards.
import type { LinkTo } from "./types";

export type MenuItem = LinkTo & { items?: LinkTo[] };

const H = "/hotels/nathia-gali";
const IG = "https://www.instagram.com/sereneheightshotelsandresorts";
const FB = "https://www.facebook.com/sereneheightshotelsandresorts";
const YT = "https://www.youtube.com/@sereneheightsnathiagali5573";

const link = (label: string, href: string): LinkTo => ({ label, href });

const investMenu: MenuItem[] = [
  { label: "Projects", href: "/projects", items: [link("Nathia Gali", "/nathiagali"), link("Lahore", "/lahore")] },
  {
    label: "Investing",
    href: "/invest",
    items: [
      link("How it works", "/invest/how-it-works"),
      link("Payment plan", "/nathiagali/payment-plan"),
      link("Steps to buy", "/invest/buying-steps"),
      link("Risks and exit", "/invest/risks-and-exit"),
      link("Earnings explained", "/invest/earnings"),
      link("Compare the options", "/invest/compare"),
      link("Book a site visit", "/site-visit"),
    ],
  },
  {
    label: "Overseas buyers",
    href: "/overseas",
    items: [
      link("Steps to buy from abroad", "/overseas/steps"),
      link("Paying from abroad", "/overseas/paying-from-abroad"),
      link("Documents and signing", "/overseas/documents"),
      link("The Gulf", "/overseas/gulf"),
      link("The UK", "/overseas/uk"),
      link("The US and Canada", "/overseas/usa-canada"),
      link("Australia and New Zealand", "/overseas/australia-new-zealand"),
    ],
  },
  { label: "Documents", href: "/documents" },
  {
    label: "About",
    href: "/about",
    items: [
      link("Leadership", "/about/leadership"),
      link("Track record", "/about/track-record"),
      link("Press", "/press"),
      link("Contact", "/contact"),
    ],
  },
  { label: "Insights", href: "/insights" },
];

const hotelMenu: MenuItem[] = [
  { label: "Destinations", href: "/hotels", items: [link("Nathia Gali", H)] },
  {
    label: "Accommodation",
    href: `${H}/accommodation`,
    items: [
      link("One-bedroom apartment", `${H}/accommodation/one-bedroom`),
      link("Two-bedroom apartment", `${H}/accommodation/two-bedroom`),
      link("Three-bedroom apartment", `${H}/accommodation/three-bedroom`),
    ],
  },
  { label: "Dining", href: `${H}/dining` },
  {
    label: "Experiences",
    href: `${H}/experiences`,
    items: [
      link("Things to do in Nathia Gali", `${H}/things-to-do`),
      link("Location and getting here", `${H}/location`),
      link("Gallery", `${H}/gallery`),
    ],
  },
  { label: "Offers", href: `${H}/offers` },
];

export const menus = {
  invest: { items: investMenu, cross: link("Stay at the hotel", H), cta: link("Enquire", "/contact"), home: "/" },
  hotel: { items: hotelMenu, cross: link("Own with us", "/invest"), cta: link("Reservations", `${H}/book`), home: H },
};

export const footers = {
  invest: {
    columns: [
      {
        h: "Projects",
        links: [
          link("Nathia Gali", "/nathiagali"),
          link("Smart Property Unit", "/nathiagali/co-ownership"),
          link("Payment plan", "/nathiagali/payment-plan"),
          link("Construction progress", "/nathiagali/progress"),
          link("Lahore", "/lahore"),
        ],
      },
      {
        h: "Investing",
        links: [
          link("How it works", "/invest/how-it-works"),
          link("Steps to buy", "/invest/buying-steps"),
          link("Overseas buyers", "/overseas"),
          link("Questions", "/faq"),
          link("Book a site visit", "/site-visit"),
        ],
      },
      {
        h: "The hotel",
        links: [
          link("The hotel at Nathia Gali", H),
          link("Accommodation", `${H}/accommodation`),
          link("Location and getting here", `${H}/location`),
          link("Things to do", `${H}/things-to-do`),
          link("Reservations", `${H}/book`),
        ],
      },
      {
        h: "Company",
        links: [
          link("About", "/about"),
          link("Documents and approvals", "/documents"),
          link("Track record", "/about/track-record"),
          link("Press", "/press"),
          link("Partners and brokers", "/partners"),
          link("For owners", "/owners"),
          link("Investor portal", "/serene-investors"),
          link("Insights", "/insights"),
          link("Contact", "/contact"),
          link("Site map", "/sitemap"),
        ],
      },
      // The client lists two Instagram accounts (hotel and group); only the hotel's address is known so far.
      { h: "Follow", links: [link("Facebook", FB), link("Instagram: the hotel", IG), link("YouTube", YT)] },
    ],
    legal: [
      link("Privacy policy", "/privacy-policy"),
      link("Terms of use", "/terms"),
      link("Cookies and consent", "/cookies"),
      link("Investment disclaimer", "/disclaimer"),
    ],
  },
  hotel: {
    columns: [
      {
        h: "Stay",
        links: [
          link("Accommodation", `${H}/accommodation`),
          link("Dining", `${H}/dining`),
          link("Experiences", `${H}/experiences`),
          link("Offers", `${H}/offers`),
          link("Gallery", `${H}/gallery`),
        ],
      },
      {
        h: "Plan",
        links: [
          link("Location and getting here", `${H}/location`),
          link("Things to do in Nathia Gali", `${H}/things-to-do`),
          link("Guest questions", `${H}/faq`),
          link("Policies", `${H}/policies`),
          link("Contact the hotel", `${H}/contact`),
          link("Reservations", `${H}/book`),
        ],
      },
      {
        h: "Serene Heights",
        links: [
          link("The group", "/"),
          link("Own with us", "/invest"),
          link("Documents and approvals", "/documents"),
          link("Insights", "/insights"),
          link("Site map", "/sitemap"),
        ],
      },
      { h: "Follow", links: [link("Instagram", IG), link("Facebook", FB), link("YouTube", YT)] },
    ],
    legal: [
      link("Privacy policy", "/privacy-policy"),
      link("Terms of use", "/terms"),
      link("Cookies and consent", "/cookies"),
      link("Policies", `${H}/policies`),
    ],
  },
};
