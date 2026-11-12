import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { site } from "@/global/constants/site";

const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Hotels, resorts & city addresses`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Serene Heights Nathia Gali in the pines" }],
    locale: "en_PK",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/og.jpg"] },
  icons: { icon: "/icon.svg" },
  // Client preview: keep search engines out until the facts are signed off and the real domain is live.
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#18332a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
