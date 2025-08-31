"use client";

import { allLeagues } from "@/Data/Leagues";
import { Button } from "./ui/button";

interface RacingNavProps {
  activeLeague: string;
  onLeagueChange: (leagueId: string) => void;
}

export function RacingNav({ activeLeague, onLeagueChange }: RacingNavProps) {
  return (
    <nav className="glass-effect rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gradient">
            Motosports AI
          </h1>
        </div>
      </div>
      
      <div className="relative overflow-hidden rounded-xl bg-secondary/50 p-1">
        <div className="absolute inset-0 speed-lines opacity-20 animate-speed-dash" />
        <div className="relative flex flex-wrap justify-center gap-2">
          {allLeagues.map((league) => (
            <Button
              key={league.id}
              variant={activeLeague === league.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onLeagueChange(league.id)}
              className={`
                relative overflow-hidden transition-all duration-300 font-semibold
                ${activeLeague === league.id 
                  ? "racing-glow animate-glow" 
                  : "hover:bg-accent/50"
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