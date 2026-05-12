import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation_v2 from "@/components/Navigation_v2";
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
  title: "NxtLAP | Watch Race Livestreams and 10+ racing series",
  description:
    "Stream Live Motorsport & Track 10+ Global Series - All in One App. Your motorsport calendar, racing timetables and live streams - all in one app.",
  keywords: [
    "motorsport",
    "racing",
    "f1 events",
    "MotoGP schedule",
    "racing leagues",
    "live motorsport",
    "NASCAR",
    "motorsport streams",
  ],
  openGraph: {
    title: "NxtLAP | Watch Race Livestreams",
    description:
      "Stream Live Motorsport & Track 10+ Global Series - All in One App.",
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
    title: "NxtLAP | Watch Race Livestreams",
    description:
      "Stream Live Motorsport & Track 10+ Global Series - All in One App.",
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
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
