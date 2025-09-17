"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Trophy,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Rss,
  ExternalLink,
} from "lucide-react";
import { League } from "@/types/League";
import SocialMediaBtn from "./SocialMediaBtn";

interface HeroProps {
  selectedleague: League;
}

function Hero({ selectedleague }: HeroProps) {
  return (
    <div className="relative">
      {/* Main Hero Section */}
      <div className="relative h-80 sm:h-96 md:h-[28rem] overflow-hidden">
        <Image
          src={selectedleague.banner}
          alt={`${selectedleague.name} banner`}
          fill
          className="w-full h-full object-cover"
          priority
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-background/40 to-transparent" />

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col justify-between md:items-end p-6 sm:p-8 md:p-10">
          <div className="w-full max-w-4xl flex flex-col h-full justify-between">

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge
                variant="outline"
                className="px-3 py-2 text-xsm md:text-sm font-semibold bg-secondary/20 border backdrop-blur-sm"
              >
                {selectedleague.shortName}
              </Badge>

              <div className="flex items-center gap-2 text-purple-400 px-4 py-2 bg-chart-1/20 rounded-full backdrop-blur-sm border border-chart-1/30">
                <Calendar className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">
                  Founded {selectedleague.formedYear}
                </span>
              </div>

              <div className="flex items-center text-green-400 gap-2 px-4 py-2 bg-chart-2/20 rounded-full backdrop-blur-sm border border-chart-2/30">
                <Trophy className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">
                  {selectedleague.sport}
                </span>
              </div>
            </div>

            {/* Bottom Section (buttons + socials) */}
            <div>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="sm"
                    className="racing-glow transition-all duration-300 transform hover:scale-105"
                  >
                    <a
                      href={`https://${selectedleague.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Globe className="w-5 h-5" />
                      Official Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>

                  {selectedleague.rss && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-chart-3/20 border-chart-3/30 text-chart-3 hover:bg-chart-3/30 hover:text-foreground backdrop-blur-sm transition-all duration-300"
                    >
                      <a
                        href={selectedleague.rss}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Rss className="w-5 h-5" />
                        RSS Feed
                      </a>
                    </Button>
                  )}
                </div>

                {/* Social Media Links */}
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm font-medium mr-2">
                    Follow:
                  </span>
                  <div className="flex gap-2">
                    {selectedleague.facebook && (
                      <SocialMediaBtn
                        url={selectedleague.facebook}
                        icon={<Facebook className="w-5 h-5" />}
                        className="bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300"
                      />
                    )}
                    {selectedleague.x && (
                      <SocialMediaBtn
                        url={selectedleague.x}
                        icon={<Twitter className="w-5 h-5" />}
                        className="bg-slate-600/20 border-slate-500/30 text-slate-400 hover:bg-slate-600/30 hover:text-slate-300"
                      />
                    )}
                    {selectedleague.youtube && (
                      <SocialMediaBtn
                        url={selectedleague.youtube}
                        icon={<Youtube className="w-5 h-5" />}
                        className="bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600/30 hover:text-red-300"
                      />
                    )}
                    {selectedleague.instagram && (
                      <SocialMediaBtn
                        url={selectedleague.instagram}
                        icon={<Instagram className="w-5 h-5" />}
                        className="bg-pink-600/20 border-pink-500/30 text-pink-400 hover:bg-pink-600/30 hover:text-pink-300"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
