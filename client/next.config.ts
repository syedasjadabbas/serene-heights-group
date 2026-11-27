import type { NextConfig } from "next";

// Serene Booking and Serene Investors are separate Next.js apps served under their own paths (Multi-Zones).
// Serene Investors is the plan's Investing page: it serves /invest itself and its own pages under /invest,
// while the plan's five guides under /invest stay in this site.
// *_ORIGIN = that deployment's URL, e.g. https://serene-booking-web.vercel.app (no trailing slash).
export const BOOKING_PATH = "/booking";
export const INVESTORS_PATH = "/invest";
/** Pages under /invest that belong to this site, not to Serene Investors. */
export const INVEST_GUIDES = ["how-it-works", "earnings", "buying-steps", "risks-and-exit", "compare"];
const BOOKING_ORIGIN = (process.env.BOOKING_ORIGIN || "").replace(/\/$/, "");
const INVESTORS_ORIGIN = (process.env.INVESTORS_ORIGIN || "").replace(/\/$/, "");

/** Rewrites that serve another app's deployment at `path` (and everything under it). */
const zone = (path: string, origin: string) =>
  origin
    ? [
        { source: path, destination: `${origin}${path}` },
        { source: `${path}/:path*`, destination: `${origin}${path}/:path*` },
      ]
    : [];

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

/** /invest and everything under it except this site's guides go to Serene Investors. */
const investors = (origin: string) =>
  origin
    ? [
        { source: INVESTORS_PATH, destination: `${origin}${INVESTORS_PATH}` },
        {
          source: `${INVESTORS_PATH}/:path((?!(?:${INVEST_GUIDES.join("|")})(?:/|$)).*)`,
          destination: `${origin}${INVESTORS_PATH}/:path`,
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
    ];
  },
  async rewrites() {
    // Before this site's own pages: /invest is also a page here (kept for the plan's structure and checks).
    return { beforeFiles: investors(INVESTORS_ORIGIN), afterFiles: zone(BOOKING_PATH, BOOKING_ORIGIN), fallback: [] };
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
