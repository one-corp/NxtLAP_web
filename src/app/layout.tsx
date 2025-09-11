import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

export const viewport: Viewport = {
  themeColor: "#ff2600",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.motorsportsai.in"),
  title: "Motorsports AI",
  description:
    "Discover and track upcoming motorsport events with AI-powered insights. Stay updated with races, schedules, and leagues in one place.",
  keywords: [
    "Motorsport",
    "Racing",
    "F1 events",
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
  authors: [
    { name: "Mohd Sohail Ansari", url: "https://www.motorsportsai.in" },
    {
      name: "Mohd Sohail Ansari",
      url: "https://sohail-portfolio-ruby.vercel.app",
    },
    { name: "Vaidik Dubey", url: "https://www.vaidik.life" },
  ],
  openGraph: {
    title: "Motorsports AI",
    description: "Track upcoming motorsport events with the power of AI. Stay informed with smart insights on leagues, venues, and schedules.",
    url: "https://www.motorsportsai.in",
    siteName: "Motorsports AI",
    images: [{
      url: "/og-banner.png",
      width: 1200,
      height: 630,
      alt: "Motorsports AI - Preview Image"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motorsports AI",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <MobileNavigation />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
