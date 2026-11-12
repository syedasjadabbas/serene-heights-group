import type { NextConfig } from "next";

// Serene Booking, Serene Investors, Serene Heights Lahore (Next.js) and Serene Heights Nathia Gali (Vite) are separate apps (own
// repos and Vercel projects) served inside this site under their own paths — Next.js Multi-Zones. Each path
// is rewritten to that app's deployment, which is built with the matching base path, so visitors stay on
// the group domain throughout.
// *_ORIGIN = that deployment's URL, e.g. https://serene-booking-web.vercel.app (no trailing slash).
export const BOOKING_PATH = "/booking";
export const INVESTORS_PATH = "/serene-investors";
export const NATHIAGALI_PATH = "/serene-heights-nathiagali";
export const LAHORE_PATH = "/serene-heights-lahore";
const BOOKING_ORIGIN = (process.env.BOOKING_ORIGIN || "").replace(/\/$/, "");
const INVESTORS_ORIGIN = (process.env.INVESTORS_ORIGIN || "").replace(/\/$/, "");
const NATHIAGALI_ORIGIN = (process.env.NATHIAGALI_ORIGIN || "").replace(/\/$/, "");
const LAHORE_ORIGIN = (process.env.LAHORE_ORIGIN || "").replace(/\/$/, "");

/** Rewrites that serve another app's deployment at `path` (and everything under it). A Vite app's home
 *  page is asked for with the trailing slash (`rootSlash`), which is where its base path starts. */
const zone = (path: string, origin: string, { rootSlash = false } = {}) =>
  origin
    ? [
        { source: path, destination: `${origin}${path}${rootSlash ? "/" : ""}` },
        { source: `${path}/:path*`, destination: `${origin}${path}/:path*` },
      ]
    : [];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Links point at a zone whenever it is wired up. For Booking an explicit NEXT_PUBLIC_BOOKING_URL still
  // wins, and with neither its buttons fall back to WhatsApp; the Investors button only shows when wired;
  // the Nathia Gali and Lahore project cards open those sites' own deployments until they are wired.
  env: {
    NEXT_PUBLIC_BOOKING_URL: process.env.NEXT_PUBLIC_BOOKING_URL || (BOOKING_ORIGIN ? BOOKING_PATH : ""),
    NEXT_PUBLIC_INVESTORS_URL: INVESTORS_ORIGIN ? INVESTORS_PATH : "",
    NEXT_PUBLIC_NATHIAGALI_URL: NATHIAGALI_ORIGIN ? NATHIAGALI_PATH : "",
    NEXT_PUBLIC_LAHORE_URL: LAHORE_ORIGIN ? LAHORE_PATH : "",
  },
  async rewrites() {
    return [
      ...zone(BOOKING_PATH, BOOKING_ORIGIN),
      ...zone(INVESTORS_PATH, INVESTORS_ORIGIN),
      ...zone(NATHIAGALI_PATH, NATHIAGALI_ORIGIN, { rootSlash: true }),
      ...zone(LAHORE_PATH, LAHORE_ORIGIN),
    ];
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
