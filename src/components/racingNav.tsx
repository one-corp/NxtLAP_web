"use client";

import { useEffect, useState } from "react";
import { allLeagues } from "@/Data/Leagues";
import { Button } from "./ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LeaguesMenu from "./LeaguesMenu";
import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";

interface RacingNavProps {
  activeLeague: string;
  onLeagueChange: (leagueId: string) => void;
}

export function RacingNav({ activeLeague, onLeagueChange }: RacingNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isMobile = useIsMobile(640);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <nav className="glass-effect p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <Link href="/">
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
        </Link>

        <div className="hidden md:flex items-center gap-2">
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
        <div id="leaguesMenu" className="md:hidden">
          <Button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <LeaguesMenu
          activeLeague={activeLeague}
          onLeagueChange={onLeagueChange}
          toggleMenu={setIsMobileMenuOpen}
        />
      )}
    </nav>
  );
}
