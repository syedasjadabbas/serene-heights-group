import type { NextConfig } from "next";

// Serene Booking is a separate Next.js app (its own repo and Vercel project) served inside this site
// at /booking — Next.js Multi-Zones. Every /booking request is rewritten to the Booking deployment,
// which is built with basePath "/booking", so visitors stay on the group domain throughout.
// BOOKING_ORIGIN = that deployment's URL, e.g. https://serene-booking.vercel.app (no trailing slash).
export const BOOKING_PATH = "/booking";
const BOOKING_ORIGIN = (process.env.BOOKING_ORIGIN || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Booking links point at /booking whenever the zone is wired up; an explicit
  // NEXT_PUBLIC_BOOKING_URL still wins, and with neither they fall back to WhatsApp.
  env: {
    NEXT_PUBLIC_BOOKING_URL: process.env.NEXT_PUBLIC_BOOKING_URL || (BOOKING_ORIGIN ? BOOKING_PATH : ""),
  },
  async rewrites() {
    if (!BOOKING_ORIGIN) return [];
    return [
      { source: BOOKING_PATH, destination: `${BOOKING_ORIGIN}${BOOKING_PATH}` },
      { source: `${BOOKING_PATH}/:path*`, destination: `${BOOKING_ORIGIN}${BOOKING_PATH}/:path*` },
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
