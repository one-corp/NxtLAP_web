"use client";

import { Star, Gamepad2 } from "lucide-react";

import Link from "next/link";
import { AppleIcon } from "../AppleIcon";

export function LandingHero() {
  return (
    <section className="relative pt-16 md:pt-16 min-h-[90vh] flex flex-col md:flex-row overflow-hidden">

      {/* LEFT: WarBase Game Micro-Page */}
      <div className="relative flex-1 bg-zinc-950 text-white flex items-center justify-center p-8 md:p-12 lg:p-24 overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-zinc-950 to-zinc-950" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-bold uppercase tracking-widest animate-pulse">
            <Gamepad2 size={16} />
            New Multiplayer FPS
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-orange-600 uppercase">
            WarBase
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl font-medium">
            Dominate the battlefield in our fast-paced, action-packed multiplayer shooter. Ready your weapons!
          </p>

          <Link
            href="https://war.nxtlap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl uppercase tracking-wider transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Play Now
          </Link>
        </div>
      </div>

      {/* RIGHT: NxtLAP App */}
      <div className="relative flex-1 bg-background flex items-center justify-center p-8 md:p-12 lg:p-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            The #1 Motorsport App
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up [animation-delay:100ms]">
            Watch Race Livestreams and <br className="hidden md:block" />
            <span className="text-gradient">10+ racing series</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground animate-slide-up [animation-delay:200ms]">
            Your motorsport calendar, racing timetables and live streams - all in one app. Auto-converted session times, personalised alerts, and motorsport streams for every series you follow.
          </p>

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

          <div className="flex flex-col items-center gap-3 pt-4 animate-slide-up [animation-delay:400ms]">
            <div className="flex gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Trusted by passionate motorsport fans
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
