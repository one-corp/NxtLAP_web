import React from "react";
import { allLeagues } from "@/Data/Leagues";
import { Button } from "./ui/button";
import { League } from "@/types/League";

interface MobileMenuProps {
  activeLeague: string;
  onLeagueChange: (leagueId: string) => void;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function LeaguesMenu({ activeLeague, onLeagueChange, toggleMenu }: MobileMenuProps) {
  return (
    <nav className="grid grid-cols-1 gap-4 pt-8" aria-label="Leagues menu">
      {allLeagues.map((league: League) => (
        <Button
          key={league.id}
          variant={activeLeague === league.id ? "default" : "link"}
          size="sm"
          onClick={() => {
            onLeagueChange(league.id)
            toggleMenu(prev => !prev);
          }}
          aria-pressed={activeLeague === league.id}
          aria-label={`Select ${league.name} league`}
          className={`flex justify-end w-full text-right font-bold text-lg transition ${
            activeLeague === league.id ? "racing-glow" : "hover:bg-primary/40"
          }`}
        >
          {league.name}
        </Button>
      ))}
    </nav>
  );
}

export default LeaguesMenu;
