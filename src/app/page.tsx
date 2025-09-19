"use client";

import { useState, useEffect } from "react";
import { allLeagues } from "@/Data/Leagues";
import LeaguesAccordion from "@/components/LeaguesAccordion";
import { baseURL } from "@/utils/constants";
import { Event } from "@/types/Event";

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

          console.log(futureEvents);
          

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
