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
} from "lucide-react";
import { League } from "@/types/League";
import SocialMediaBtn from "./SocialMediaBtn";

interface HeroProps {
  selectedleague: League;
}

function Hero({ selectedleague }: HeroProps) {
  return (
    <div className="relative h-64 md:h-[500px]">
      <Image
        src={selectedleague.banner}
        alt={selectedleague.name}
        fill
        className="w-full h-full object-cover"
      />

      {/* overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/50 to-transparent" />

      <div className="absolute inset-0 m-4">
          <div className="max-w-lg sm:max-w-2xl space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-foreground">
              <Badge variant="outline">
                {selectedleague.shortName}
              </Badge>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="font-semibold">
                  Founded {selectedleague.formedYear}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="font-semibold">{selectedleague.sport}</span>
              </div>
              
            </div>

            {/* Description */}
            <p className="text-sm sm:text-lg text-foreground/80 leading-relaxed max-w-md sm:max-w-xl">
              {selectedleague.description.slice(0, 200)}...
            </p>

            {/* Website + Socials */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Button asChild className="racing-glow w-full sm:w-auto">
                <a
                  href={`https://${selectedleague.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  Official Website
                </a>
              </Button>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {selectedleague.facebook && (
                  <SocialMediaBtn
                    url={selectedleague.facebook}
                    icon={<Facebook className="w-4 h-4" />}
                  />
                )}
                {selectedleague.x && (
                  <SocialMediaBtn
                    url={selectedleague.x}
                    icon={<Twitter className="w-4 h-4" />}
                  />
                )}
                {selectedleague.youtube && (
                  <SocialMediaBtn
                    url={selectedleague.youtube}
                    icon={<Youtube className="w-4 h-4" />}
                  />
                )}
                {selectedleague.instagram && (
                  <SocialMediaBtn
                    url={selectedleague.instagram}
                    icon={<Instagram className="w-4 h-4" />}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Hero;
