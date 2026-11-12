import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { site } from "@/global/constants/site";

const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });

// Share images come from app/opengraph-image.tsx and app/twitter-image.tsx; icons from
// app/icon.svg and app/apple-icon.tsx (Next.js file conventions add the tags automatically).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.developer }],
  creator: site.developer,
  publisher: site.developer,
  category: "Real estate",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  appleWebApp: { title: site.short, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false, address: false, email: false },
  // Client preview: keep search engines out until the facts are signed off and the real domain is live.
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#18332a", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
