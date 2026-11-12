// Single source of truth for group-level facts.
// Every figure here is taken from the sibling Serene project sites; items marked
// "CONFIRM" still need sign-off from the client before launch.

export const BOOKING_URL = (process.env.NEXT_PUBLIC_BOOKING_URL || "http://localhost:3000").replace(/\/$/, "");

export const site = {
  name: "Serene Heights Group",
  short: "Serene Heights",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sereneheightsgroup.com",
  developer: "DM Consortium",
  founded: 2017,
  ceo: "Fahad Masud Lone",
  description:
    "Serene Heights Group brings together DM Consortium's developments — Serene Heights Nathia Gali, Serene Heights Lahore and Serene Booking — with ways to stay, own and invest.",
  contact: {
    uan: "042-111-111-744",
    uanHref: "tel:+9242111111744",
    // Confirmed by the client (2026-11-12) as the group WhatsApp line.
    whatsapp: "+92 300 8497999",
    whatsappHref: "https://wa.me/923008497999",
    office: "H. No. 71 C3, Gulberg III, Park View Lane, Lahore",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/sereneheightshotelsandresorts" },
    { label: "Facebook", href: "https://www.facebook.com/sereneheightshotelsandresorts" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/serene-heights-hotel-resort" },
    { label: "YouTube", href: "https://www.youtube.com/@sereneheightsnathiagali5573" },
  ],
};

export const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Stays", href: "#stays" },
  { label: "Upcoming", href: "#upcoming" },
  { label: "Investors", href: "#investors" },
  { label: "About", href: "#about" },
];

export type Project = {
  slug: string;
  name: string;
  place: string;
  status: string;
  since: string;
  kind: string;
  image: string;
  url: string;
  email: string;
  phone: string;
  summary: string;
  facts: string[];
};

export const projects: Project[] = [
  {
    slug: "nathia-gali",
    name: "Nathia Gali",
    place: "Kala Bagh Air Base Road, Nathia Gali, KPK",
    status: "Under construction",
    since: "Since 2021",
    kind: "Hotel & Resort",
    image: "/media/ng/tower-forest-mist.webp",
    url: "https://www.sereneheightsnathiagali.com",
    email: "info@sereneheightsnathiagali.com",
    phone: "042-111-111-744",
    summary:
      "Pakistan's first and largest winter resort — fully furnished hotel apartments in the pines at 7,906 ft, two hours from Islamabad.",
    facts: ["7,906 ft", "30+ kanals", "3 towers", "150+ apartments", "50+ amenities"],
  },
  {
    slug: "lahore",
    name: "Lahore",
    place: "Gulberg Main Boulevard, Lahore",
    status: "Now selling · 2-year delivery",
    since: "LDA approved",
    kind: "Mixed-use tower",
    image: "/media/lhr/tower.jpg",
    url: "https://www.sereneheightslahore.com",
    email: "info@sereneheightslahore.com",
    phone: "0304-1111106",
    summary:
      "A 21-storey address beside the CBD — retail, offices, co-working, parking and serviced hotel apartments under one in-house management.",
    facts: ["21 storeys", "7 office floors", "2 co-working floors", "Hotel apartments", "Helipad"],
  },
];

export const completed = [
  { name: "Serene Farms", place: "Barki Road, Lahore", note: "Completed horizontal development" },
];

export const rooms = [
  { slug: "classic-one-bedroom", name: "Classic One-Bedroom", note: "Valley-facing, fully furnished" },
  { slug: "premier-one-bedroom", name: "Premier One-Bedroom", note: "More room, wider views" },
  { slug: "grand-one-bedroom", name: "Grand One-Bedroom", note: "Our largest standard plan" },
  { slug: "signature-corner-suite", name: "Signature Corner Suite", note: "800+ sq ft, two aspects" },
  { slug: "terrace-apartment", name: "Terrace Apartment", note: "Eighth floor, private terrace" },
];

export const stayImages = [
  { src: "/media/stay/glass-roof-pool.jpg", alt: "Heated glass-roof pool" },
  { src: "/media/stay/ski-slope.jpg", alt: "Ski slope beside the resort" },
  { src: "/media/stay/sky-lounge.jpg", alt: "Rooftop sky lounge" },
  { src: "/media/stay/winter-trails.jpg", alt: "Winter trails through the pines" },
  { src: "/media/stay/rooftop-sunset.jpg", alt: "Rooftop at sunset" },
  { src: "/media/stay/archery.jpg", alt: "Archery range" },
  { src: "/media/stay/sunset-terrace.jpg", alt: "Sunset terrace dining" },
  { src: "/media/stay/aerial-pool-portrait.jpg", alt: "Aerial view of the pool deck" },
  { src: "/media/ng/rooftop-view.webp", alt: "View from the rooftop" },
  { src: "/media/stay/aerial-rooftop-pool.jpg", alt: "Rooftop infinity pool from above" },
  { src: "/media/stay/aerial-snow-resort.jpg", alt: "The resort under snow" },
  { src: "/media/stay/tower-sunset-forest.jpg", alt: "Tower at sunset above the pines" },
  { src: "/media/stay/adventure-park.jpg", alt: "Adventure park" },
  { src: "/media/stay/rooftop-crown.jpg", alt: "Rooftop crown of the tower" },
  { src: "/media/stay/mini-golf.jpg", alt: "Mini golf course" },
  { src: "/media/stay/rooftop-restaurant.jpg", alt: "Rooftop restaurant" },
  { src: "/media/stay/hero-tower-mist.jpg", alt: "Tower rising out of the mist" },
];

// Published payment plans — figures exactly as issued on the Nathia Gali site.
export const plans = [
  { id: "spu", area: 50, kind: "Smart Property Unit", project: "Nathia Gali", total: 2250000, down: 675000, monthly: 43750 },
  { id: "1bhk-667", area: 667, kind: "1 BHK apartment", project: "Nathia Gali", total: 26680000, down: 8004000, monthly: 518778 },
  { id: "1bhk-673", area: 673, kind: "1 BHK apartment", project: "Nathia Gali", total: 26920000, down: 8076000, monthly: 523444 },
  { id: "1bhk-734", area: 734, kind: "1 BHK apartment", project: "Nathia Gali", total: 29360000, down: 8808000, monthly: 570889 },
];

export const investorReasons = [
  { t: "Managed as one hotel", d: "DM Consortium runs rentals, upkeep and returns in-house — no unions, no third-party operators." },
  { t: "Quarterly profit share", d: "Smart Property owners in Nathia Gali share in hotel revenue every quarter." },
  { t: "Low entry", d: "Own a share of a hotel from PKR 2 million, with 30% down and 36 monthly instalments." },
  { t: "Owner stays", d: "Nathia Gali owners get 28 free nights a year and zero maintenance fees." },
  { t: "Assured delivery", d: "Serene Heights Lahore carries a 2-year delivery commitment and LDA approval." },
  { t: "Shariah-compliant", d: "Every transaction is structured to be Shariah-compliant and legally secure." },
];
