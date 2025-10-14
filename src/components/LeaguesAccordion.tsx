"use client";

import { allLeagues } from "@/Data/Leagues";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Hero from "./Hero";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardClock } from "lucide-react";
import EventCard from "./EventCard";
import { useState, useEffect } from "react";
import { League } from "@/types/League";
import { baseURL } from "@/utils/constants";
import { Event } from "@/types/Event";
import { EventCardSkeleton } from "./skeletons/EventCard";

function LeaguesAccordion() {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchLeageEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await fetch(
          `${baseURL}/eventsseason.php?id=${
            selectedLeague?.id
          }&s=${new Date().getFullYear()}`
        );
        const data = await response.json();

        // Ensure events is an array before filtering
        const eventsArray = Array.isArray(data?.events) ? data.events : [];

        //getting current time
        const now = new Date();

        //Calculating end of current week
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));

        //Converting to ISO:
        const nowISO = now.toISOString().slice(0, 19);

        const futureEvents: Event[] =
          eventsArray.filter((event: Event) => event.strTimestamp > nowISO) ||
          [];

        setUpcomingEvents(futureEvents);
      } catch (e) {
        console.error(e instanceof Error ? e.message : e);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchLeageEvents();
  }, [selectedLeague]);

  return (
    <section
      id="all-leagues"
      className="relative min-h-screen bg-gradient-to-br from-background via-slate-accent/70 to-background flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-20"
      aria-labelledby="leagues-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.1),transparent_50%)] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl w-full text-center mb-12 sm:mb-16">
        <h2 id="leagues-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Explore Racing Leagues
        </h2>
        <p className="text-accent-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          Discover details, upcoming races, and follow your favorite motorsport
          leagues worldwide.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="relative z-10 w-full max-w-5xl space-y-3"
      >
        {allLeagues.map((league, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={league.id}
            className="group rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-600/60 hover:bg-slate-800/60"
          >
            <AccordionTrigger
              onClick={() => setSelectedLeague(league)}
              aria-label={`View details for ${league.name}`}
              className="rounded-b-none px-6 sm:px-8 py-6 font-semibold text-xl sm:text-2xl cursor-pointer flex items-center justify-between gap-6 hover:bg-slate-700/30 transition-all duration-300 data-[state=open]:bg-slate-700/40 data-[state=open]:border-b data-[state=open]:border-slate-600/50 data-[state=open]:text-primary [&>svg]:hidden focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <div className="flex items-center gap-6 text-left flex-1">
                <div className="relative flex-shrink-0">
                  <Image
                    src={league.logo}
                    alt={`${league.name} logo`}
                    width={80}
                    height={80}
                    className="w-16 sm:w-20 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-bold text-left leading-tight">
                  {league.name}
                </h3>
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-background backdrop-blur-sm p-0">
              <Card className="overflow-hidden border-0 shadow-none bg-transparent p-0 gap-0 rounded-none">
                <div className="relative">
                  <Hero selectedleague={league} />
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                </div>

                {/* Upcoming This Week */}
                <Card className="bg-card backdrop-blur-sm rounded-none border-0 p-0 shadow-lg">
                  <CardContent className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/15 rounded-lg">
                        <ClipboardClock className="text-primary w-6 h-6" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gradient">
                        Upcoming events
                      </h2>
                    </div>
                    {loadingEvents ? <EventCardSkeleton /> : <EventCard events={upcomingEvents} />}
                  </CardContent>
                </Card>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}

export default LeaguesAccordion;
