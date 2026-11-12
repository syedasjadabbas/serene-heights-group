// Single source of truth for group-level facts.
// Every figure here is taken from the sibling Serene project sites; items marked
// "CONFIRM" still need sign-off from the client before launch.

// Where the Serene Booking guest app is deployed. Empty until it goes live — booking links then
// fall back to a pre-filled WhatsApp enquiry (see global/lib/booking.ts).
export const BOOKING_URL = (process.env.NEXT_PUBLIC_BOOKING_URL || "").replace(/\/$/, "");
export const HAS_BOOKING = BOOKING_URL !== "";

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

// Room types and counts as defined in the Serene Booking inventory (official floor plans).
export const rooms = [
  {
    slug: "classic-one-bedroom",
    name: "Classic One-Bedroom",
    tagline: "A cosy mountain base with its own balcony",
    size: "Under 600 sq ft",
    guests: "Up to 3 guests",
    units: 37,
    image: "/media/ng/tower-closeup.webp",
  },
  {
    slug: "premier-one-bedroom",
    name: "Premier One-Bedroom",
    tagline: "More room, with a sofa bed for the family",
    size: "600–699 sq ft",
    guests: "Up to 4 guests",
    units: 44,
    image: "/media/stay/tower-sunset-forest.jpg",
  },
  {
    slug: "grand-one-bedroom",
    name: "Grand One-Bedroom",
    tagline: "A wide balcony facing the Galiyat",
    size: "700–799 sq ft",
    guests: "Up to 4 guests",
    units: 25,
    image: "/media/ng/snow-tower.webp",
  },
  {
    slug: "signature-corner-suite",
    name: "Signature Corner Suite",
    tagline: "Corner living with views on two sides",
    size: "800+ sq ft",
    guests: "Up to 4 guests",
    units: 4,
    image: "/media/stay/rooftop-crown.jpg",
  },
  {
    slug: "terrace-apartment",
    name: "Terrace Apartment",
    tagline: "Eighth floor, with a private terrace",
    size: "500–980 sq ft",
    guests: "Up to 4 guests",
    units: 20,
    image: "/media/stay/sunset-terrace.jpg",
  },
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
