"use client";

import { allLeagues } from "@/Data/Leagues";
import { Button } from "./ui/button";
import Image from "next/image";

interface RacingNavProps {
  activeLeague: string;
  onLeagueChange: (leagueId: string) => void;
}

export function RacingNav({ activeLeague, onLeagueChange }: RacingNavProps) {
  return (
    <nav className="glass-effect p-4 shadow-lg">
      <div className="relative flex flex-wrap justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="Motorsports AI Logo"
            className="rounded-lg border"
          />
          <h1 className="text-3xl font-bold text-gradient">Motorsports AI</h1>
        </div>
        <div className="flex items-center gap-2">
          {allLeagues.map((league) => (
            <Button
              key={league.id}
              variant={activeLeague === league.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onLeagueChange(league.id)}
              className={`
                relative overflow-hidden font-semibold
                ${
                  activeLeague === league.id
                    ? "racing-glow"
                    : "hover:bg-primary/40"
                }
              `}
            >
              <span className="relative z-10">{league.shortName}</span>
              {activeLeague === league.id && (
                <div className="absolute inset-0 speed-gradient opacity-90" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
