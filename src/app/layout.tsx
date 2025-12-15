import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation_v2 from "@/components/Navigation_v2";
import { SeriesSelector } from "@/components/SeriesSelector";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#ff2600",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Lora is similar to Medium's Charter font
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nxtlap.com"),
  alternates:{
    canonical: "/",
  },
  title: "NxtLAP | Track Upcoming Motorsports Events",
  description:
    "Discover and track upcoming motorsport events with AI-powered insights. Stay updated with races, schedules, and leagues.",
  keywords: [
    "upcoming f1 races",
    "motorsport",
    "racing",
    "f1 events",
    "MotoGP schedule",
    "racing leagues",
    "upcoming races",
    "NASCAR",
    "BTCC",
    "V8 Supercars",
    "WRC",
    "SGT",
    "IMSA",
    "IndyCar",
    "British GT",
  ],
  openGraph: {
    title: "NxtLAP",
    description:
      "Track upcoming motorsport events with the power of AI. Stay informed with smart insights on leagues, venues, and schedules.",
    url: "https://nxtlap.com",
    siteName: "NxtLAP",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "NxtLAP - Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NxtLAP",
    description:
      "Discover and track upcoming motorsport events with AI-powered insights. Stay updated with races, schedules, and leagues in one place.",
    images: ["/og-banner.png"],
    creator: "@codephilic_guy",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="NxtLAP RSS Feed"
          href="/rss.xml"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased bg-background text-foreground`}
      >
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <div className="flex flex-col min-h-screen">
          <Navigation_v2 />
          <SeriesSelector />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
