import type { NextConfig } from "next";

// Serene Booking and Serene Investors are separate Next.js apps served on this domain (Multi-Zones):
// - Serene Booking is the plan's hotel home: it serves /hotels/nathia-gali and its own pages under it
//   (rooms, checkout, find a booking, account), while the plan's hotel pages under it stay in this site.
// - Serene Investors is the plan's Investing page: it serves /invest and its own pages under it, while the
//   plan's five guides under /invest stay in this site.
// *_ORIGIN = that deployment's URL, e.g. https://serene-booking-web.vercel.app (no trailing slash).
export const BOOKING_PATH = "/hotels/nathia-gali";
export const INVESTORS_PATH = "/invest";
/** Pages under /hotels/nathia-gali that belong to this site, not to Serene Booking. */
export const HOTEL_PAGES = ["accommodation", "dining", "experiences", "events", "offers", "gallery", "location", "faq", "book", "policies", "contact", "things-to-do"];
/** Pages under /invest that belong to this site, not to Serene Investors. */
export const INVEST_GUIDES = ["how-it-works", "earnings", "buying-steps", "risks-and-exit", "compare"];
const BOOKING_ORIGIN = (process.env.BOOKING_ORIGIN || "").replace(/\/$/, "");
const INVESTORS_ORIGIN = (process.env.INVESTORS_ORIGIN || "").replace(/\/$/, "");

// "Three sites become one": addresses of the earlier sites go, page for page, to their place in this one.
const NG = "/serene-heights-nathiagali";
const LHR = "/serene-heights-lahore";
const MOVED: [from: string, to: string][] = [
  [NG, "/nathiagali"],
  [`${NG}/about`, "/about"],
  [`${NG}/amenities`, "/nathiagali/amenities"],
  [`${NG}/floor-plans`, "/nathiagali/floor-plans"],
  [`${NG}/payment-plan`, "/nathiagali/payment-plan"],
  [`${NG}/smart-property-unit`, "/nathiagali/co-ownership"],
  [`${NG}/progress`, "/nathiagali/progress"],
  [`${NG}/gallery`, "/nathiagali/gallery"],
  [`${NG}/contact`, "/contact"],
  [LHR, "/lahore"],
  [`${LHR}/project`, "/lahore/the-project"],
  [`${LHR}/invest`, "/lahore/invest"],
  [`${LHR}/amenities`, "/lahore/amenities"],
  [`${LHR}/about`, "/about"],
  [`${LHR}/contact`, "/lahore/contact"],
  ["/nathia-gali", "/nathiagali"],
  ["/hotels/nathiagali", "/hotels/nathia-gali"],
];

/** `path` and everything under it, except the pages this site keeps there, come from another app's deployment. */
const app = (path: string, origin: string, keep: string[]) =>
  origin
    ? [
        { source: path, destination: `${origin}${path}` },
        {
          source: `${path}/:path((?!(?:${keep.join("|")})(?:/|$)).*)`,
          destination: `${origin}${path}/:path`,
        },
      ]
    : [];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      ...MOVED.map(([source, destination]) => ({ source, destination, permanent: false })),
      // Serene Investors used to live at /serene-investors.
      { source: "/serene-investors", destination: INVESTORS_PATH, permanent: false },
      { source: "/serene-investors/:path*", destination: `${INVESTORS_PATH}/:path*`, permanent: false },
      // Serene Booking used to live at /booking; its checkout was /booking/book.
      { source: "/booking", destination: BOOKING_PATH, permanent: false },
      { source: "/booking/book", destination: `${BOOKING_PATH}/checkout`, permanent: false },
      { source: "/booking/:path*", destination: `${BOOKING_PATH}/:path*`, permanent: false },
    ];
  },
  async rewrites() {
    // Before this site's own pages: /invest and /hotels/nathia-gali are also pages here (kept for the plan's
    // structure and checks), but the other apps serve them.
    return {
      beforeFiles: [...app(INVESTORS_PATH, INVESTORS_ORIGIN, INVEST_GUIDES), ...app(BOOKING_PATH, BOOKING_ORIGIN, HOTEL_PAGES)],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Media and elevation data rarely change: cache for a day, refresh quietly after.
        source: "/:dir(media|data)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
