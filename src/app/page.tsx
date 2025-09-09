"use client";

import { useState, useEffect } from "react";
import { allLeagues } from "@/Data/Leagues";
import { League } from "@/types/League";
import { RacingNav } from "@/components/racingNav";
import { LeagueCard } from "@/components/leagueCard";
import { Card, CardContent } from "@/components/ui/card";
import { LineSquiggle, ClipboardClock } from "lucide-react";
import { baseURL } from "@/utils/constants";
import { Event } from "@/types/Event";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <div className="fixed top-0 left-0 right-0 z-50">
        <RacingNav
          activeLeague={activeLeague}
          onLeagueChange={setActiveLeague}
        />
      </div>
      <div className="min-h-screen racing-gradient">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0 speed-lines" />
        </div>

        <div className="relative container mx-auto px-4 py-24">
          {/* Hero Section */}
          <div className="mb-10">
            <Card className="overflow-hidden p-0 gap-0">
              {/* Banner */}
              <Hero selectedleague={selectedLeague} />

              {/* Upcoming Events */}
              <Card className="bg-accent pt-24 md:pt-0 rounded-none border-0">
                <CardContent className="p-4 sm:p-8 space-y-6">
                  <div className="flex items-center gap-2">
                    <ClipboardClock className="text-primary" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gradient">
                      Upcoming Events
                    </h2>
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-0"
                  >
                    {loading
                      ? Array.from({ length: 6 }).map((_, idx) => (
                          <SkeletonAccordian key={idx} />
                        ))
                      : upcomingEvents.map((event, index) => (
                          <AccordionItem
                            value={`item-${index}`}
                            key={event.idEvent}
                          >
                            <AccordionTrigger className="text-sx sm:text-lg font-semibold cursor-pointer ">
                              <div className="flex w-full justify-between items-center gap-12">
                                <span className="text-gradient">
                                  {event.strEvent}
                                </span>
                                <span className="text-muted-foreground">
                                  {new Date(
                                    event.strTimestamp
                                  ).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </span>
                              </div>
                            </AccordionTrigger>

                            <AccordionContent>
                              <div className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-primary/10 p-3 sm:p-4 m-2 sm:m-4 racing-glow border border-primary/20">
                                <div className="w-full sm:w-1/3">
                                  <SkeletonImage
                                    src={
                                      event.strThumb ||
                                      event.strPoster ||
                                      "/fallback.jpg"
                                    }
                                    alt={event.strEvent}
                                    className="w-full h-40 sm:h-full object-cover rounded-xl"
                                  />
                                </div>

                                {/* Right: Info */}
                                <div className="flex flex-col justify-between w-full sm:w-2/3 gap-2 sm:gap-3">
                                  <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gradient">
                                      {event.strLeague}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-400">
                                      Round {event.intRound} • Season{" "}
                                      {event.strSeason}
                                    </p>
                                    <p className="mt-2 text-sm sm:text-base text-white flex items-center gap-1">
                                      <LineSquiggle className="w-4 sm:w-5 text-primary" />
                                      {event.strVenue}, {event.strCountry}
                                    </p>
                                  </div>

                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-4 gap-1 sm:gap-2">
                                    <p className="text-xs sm:text-sm text-gray-300">
                                      {new Date(
                                        event.strTimestamp
                                      ).toLocaleDateString("en-GB", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}{" "}
                                      • {event.strTimeLocal}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                  </Accordion>
                </CardContent>
              </Card>
            </Card>
          </div>

          {/* All Leagues Grid */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                All Motorsport Leagues
              </h2>
              <p className="text-muted-foreground text-lg">
                {`Explore the world's premier racing championships`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allLeagues.map((league: League, index) => (
                <button
                  key={league.id}
                  className="animate-fade-in-up text-left w-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveLeague(league.id)}
                >
                  <div className="cursor-pointer">
                    <LeagueCard league={league} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
