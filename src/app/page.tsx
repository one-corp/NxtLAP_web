"use client";

import { useState, useEffect } from "react";
import { allLeagues } from "@/Data/Leagues";
import LeaguesAccordion from "@/components/LeaguesAccordion";
import { League } from "@/types/League";
import { LeagueCard } from "@/components/leagueCard";
import { Card, CardContent } from "@/components/ui/card";
import { LineSquiggle, ClipboardClock } from "lucide-react";
import { baseURL } from "@/utils/constants";
import { Event } from "@/types/Event";
import Hero from "@/components/Hero";
import { SkeletonAccordian } from "@/components/SkeletonAccordian";
import { SkeletonImage } from "@/components/SkeletonImage";

export default function Home() {
  const [activeLeague, setActiveLeague] = useState<string>(allLeagues[0].id);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const selectedLeague =
    allLeagues.find((league) => league.id === activeLeague) || allLeagues[0];

  useEffect(() => {
    const fetchLeageEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseURL}/eventsseason.php?id=${activeLeague}&s=${new Date().getFullYear()}`
        );
        const data = await response.json();

        const now = new Date().toISOString().slice(0, 19);
        const futureEvents: Event[] =
          data?.events.filter((event: Event) => event.strTimestamp > now) || [];

        setUpcomingEvents(futureEvents);
      } catch (e) {
        console.error(e instanceof Error ? e.message : e);
      } finally {
        setLoading(false);
      }
    };
    fetchLeageEvents();
  }, [activeLeague]);

  return (
    <>
      <LeaguesAccordion /> 
    </>
  );
}
