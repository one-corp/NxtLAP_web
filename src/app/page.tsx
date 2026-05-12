import { generatePageMetadata } from "@/lib/seo/metadata";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingWhyUs } from "@/components/landing/LandingWhyUs";
import { LandingReviews } from "@/components/landing/LandingReviews";
import Link from "next/link";
import { Download } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "NxtLAP | Watch Race Livestreams and 10+ racing series",
  description: "Stream Live Motorsport & Track 10+ Global Series - All in One App. Your motorsport calendar, racing timetables and live streams - all in one app.",
  keywords: [
    "Motorsport events",
    "Racing calendar",
    "F1 schedule",
    "MotoGP schedule",
    "NASCAR schedule",
    "IndyCar schedule",
    "upcoming races",
    "live motorsport",
  ],
  path: "/",
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero />
      <LandingFeatures />
      <LandingWhyUs />
      <LandingReviews />

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        <div className="container relative mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Your motorsport season starts here</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join passionate motorsport fans who never miss a lap.
          </p>
          <div className="flex justify-center">
            <Link
              href="https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-xl"
            >
              <Download size={24} />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium opacity-80">Download on the</span>
                <span className="text-lg">App Store</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
