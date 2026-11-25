// Single source of truth for group-level facts.
// Every figure here is taken from the sibling Serene project sites; items marked
// "CONFIRM" still need sign-off from the client before launch.

export const site = {
  name: "Serene Heights Group",
  short: "Serene Heights",
  // Public URL: explicit env, else the Vercel production URL, else the intended group domain.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "https://www.sereneheightsgroup.com",
  developer: "DM Consortium",
  founded: 2017,
  ceo: "Fahad Masud Lone",
  title: "Serene Heights Group — Hotels, Resorts & City Addresses",
  // ~155 characters: fits Google's snippet and WhatsApp/LinkedIn previews without truncation.
  description:
    "Serene Heights Nathia Gali, Pakistan's first winter resort at 7,906 ft, and Serene Heights Lahore on Gulberg Main Boulevard. Explore, book a stay or invest.",
  keywords: [
    "Serene Heights",
    "Serene Heights Group",
    "Serene Heights Nathia Gali",
    "Serene Heights Lahore",
    "DM Consortium",
    "Nathia Gali hotel apartments",
    "Nathia Gali resort",
    "winter resort Pakistan",
    "Gulberg Main Boulevard",
    "smart property units",
    "hotel apartment investment Pakistan",
  ],
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
    url: "/nathiagali",
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
    url: "/lahore",
    email: "info@sereneheightslahore.com",
    phone: "0304-1111106",
    summary:
      "A 21-storey address beside the CBD — retail, offices, co-working, parking and serviced hotel apartments under one in-house management.",
    facts: ["21 storeys", "7 office floors", "2 co-working floors", "Hotel apartments", "Helipad"],
  },
];

// To show a photo on a completed-project card, put the file in public/media/ and set `image`
// (e.g. image: "/media/farms/serene-farms.jpg"). Without one the card stays text-only.
export const completed: { name: string; place: string; note: string; image?: string }[] = [
  {
    name: "Serene Farms",
    place: "Barki Road, Lahore",
    note: "Completed horizontal development",
    // Mood image of the Galiyat (no Serene Farms photo exists yet) — swap for a real photo when available.
    image: "/media/farms/mist-valley.webp",
  },
];

// Published payment plans — figures exactly as issued on the Nathia Gali site.
export const plans = [
  { id: "spu", area: 50, kind: "Smart Property Unit", project: "Nathia Gali", total: 2250000, down: 675000, monthly: 43750 },
  { id: "1bhk-667", area: 667, kind: "1 BHK apartment", project: "Nathia Gali", total: 26680000, down: 8004000, monthly: 518778 },
  { id: "1bhk-673", area: 673, kind: "1 BHK apartment", project: "Nathia Gali", total: 26920000, down: 8076000, monthly: 523444 },
  { id: "1bhk-734", area: 734, kind: "1 BHK apartment", project: "Nathia Gali", total: 29360000, down: 8808000, monthly: 570889 },
];
