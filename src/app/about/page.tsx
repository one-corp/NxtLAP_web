import React from "react";
import { Construction } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "About NxtLAP | Your Motorsport Event Companion",
  description: "Learn about NxtLAP, the AI-powered platform for tracking motorsport events. Discover how we help racing fans stay updated with F1, MotoGP, NASCAR, and more.",
  keywords: [
    "About NxtLAP",
    "Motorsport platform",
    "Racing event tracker",
    "AI motorsport insights",
    "Racing fan community",
  ],
  path: "/about",
});

function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-6">
      {/* Icon */}
      <div className="p-6 rounded-full bg-primary/10 mb-6 animate-pulse">
        <Construction className="w-12 h-12 text-primary" />
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
        <span>
          Page Under Construction
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground text-sm sm:text-lg max-w-xl mb-8">
        We’re working hard to bring you something awesome.  
        Please check back soon for updates!
      </p>

      {/* Decorative */}
      <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
    </div>
  );
}

export default Page;