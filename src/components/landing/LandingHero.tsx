"use client";

import { Star } from "lucide-react";

import Link from "next/link";
import { AppleIcon } from "../AppleIcon";

export function LandingHero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20" />

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            The #1 Motorsport App
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up [animation-delay:100ms]">
            Watch Race Livestreams and <br className="hidden md:block" />
            <span className="text-gradient">10+ racing series</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-slide-up [animation-delay:200ms]">
            Your motorsport calendar, racing timetables and live streams - all in one app. Auto-converted session times, personalised alerts, and motorsport streams for every series you follow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up [animation-delay:300ms] w-full sm:w-auto">
            <Link
              href="https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-foreground text-background hover:bg-foreground/90 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 w-full sm:w-auto shadow-xl"
            >
              <AppleIcon size={24} />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium opacity-80">Download on the</span>
                <span className="text-lg">App Store</span>
              </div>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-3 pt-8 animate-slide-up [animation-delay:400ms]">
            <div className="flex gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Trusted by passionate motorsport fans worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
