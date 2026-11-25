import type { NextConfig } from "next";

// Serene Booking and Serene Investors are separate Next.js apps served under their own paths (Multi-Zones).
// The client's site plan does not link to either; they stay reachable for existing guests and account holders.
// *_ORIGIN = that deployment's URL, e.g. https://serene-booking-web.vercel.app (no trailing slash).
export const BOOKING_PATH = "/booking";
export const INVESTORS_PATH = "/serene-investors";
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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return MOVED.map(([source, destination]) => ({ source, destination, permanent: false }));
  },
  async rewrites() {
    return [...zone(BOOKING_PATH, BOOKING_ORIGIN), ...zone(INVESTORS_PATH, INVESTORS_ORIGIN)];
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
