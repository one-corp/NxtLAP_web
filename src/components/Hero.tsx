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

interface HeroProps {
  selectedleague: League;
}

function Hero({ selectedleague }: HeroProps) {
  
  return (
    <div className="relative h-64 sm:h-80 md:h-96">
      <Image
        src={selectedleague.banner}
        alt={selectedleague.name}
        fill
        className="w-full h-full object-cover"
      />

      {/* overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/50 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-lg sm:max-w-2xl space-y-4 sm:space-y-6">
            {/* Logo + Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Image
                src={selectedleague.logo}
                alt={`${selectedleague.name} logo`}
                width={16}
                height={16}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain bg-card/80 border rounded-xl p-2 sm:p-3 backdrop-blur-xl"
              />
              <div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gradient">
                  {selectedleague.name}
                </h1>
                <Badge variant="outline" className="mt-1 sm:mt-2">
                  {selectedleague.shortName}
                </Badge>
              </div>
            </div>

            {/* Founded + Sport */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-foreground">
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
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="bg-accent/30 hover:text-primary"
                  >
                    <a
                      href={`https://${selectedleague.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {selectedleague.x && (
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="bg-accent/30 hover:text-primary"
                  >
                    <a
                      href={`https://${selectedleague.x}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {selectedleague.youtube && (
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="bg-accent/30 hover:text-primary"
                  >
                    <a
                      href={`https://${selectedleague.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {selectedleague.instagram && (
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="bg-accent/30 hover:text-primary"
                  >
                    <a
                      href={`https://${selectedleague.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
