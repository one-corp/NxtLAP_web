"use client";

import { useState, useEffect } from "react";
import { allLeagues } from "@/Data/Leagues";
import { League } from "@/types/League";
import { RacingNav } from "@/components/racingNav";
import { LeagueCard } from "@/components/leagueCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  LineSquiggle,
  ClipboardClock,
  Trophy,
  Globe,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { baseURL } from "@/utils/constants";
import { Event } from "@/types/Event";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const [activeLeague, setActiveLeague] = useState<string>(allLeagues[0].id);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  const selectedLeague =
    allLeagues.find((league) => league.id === activeLeague) || allLeagues[0];

  useEffect(() => {
    const fetchLeageEvents = async () => {
      const response = await fetch(
        `${baseURL}/eventsseason.php?id=${activeLeague}&s=${new Date().getFullYear()}`
      );
      const data = await response.json();
      const now = new Date().toISOString().slice(0, 19);
      const futureEvents: Event[] = data?.events.filter(
        (event: Event) => event.strTimestamp > now
      );
      setUpcomingEvents(futureEvents);
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
              <div className="relative h-80 md:h-96">
                <Image
                  src={selectedLeague.banner}
                  alt={selectedLeague.name}
                  fill
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/50 to-transparent" />

                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-8">
                    <div className="max-w-2xl space-y-6">
                      <div className="flex items-center gap-4">
                        <Image
                          src={selectedLeague.logo}
                          alt={`${selectedLeague.name} logo`}
                          width={16}
                          height={16}
                          className="w-16 h-16 object-contain bg-card/80 border rounded-xl p-3 backdrop-blur-xl"
                        />
                        <div>
                          <h1 className="text-4xl md:text-5xl font-bold text-gradient ">
                            {selectedLeague.name}
                          </h1>
                          <Badge variant="outline" className="mt-2">
                            {selectedLeague.shortName}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="font-semibold">
                            Founded {selectedLeague.formedYear}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-primary" />
                          <span className="font-semibold">
                            {selectedLeague.sport}
                          </span>
                        </div>
                      </div>

                      <p className="text-lg text-foreground/80 leading-relaxed max-w-xl">
                        {selectedLeague.description.slice(0, 200)}...
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <Button asChild className="racing-glow">
                          <a
                            href={`https://${selectedLeague.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="w-4 h-4 mr-1" />
                            Official Website
                          </a>
                        </Button>

                        <div className="flex items-center gap-2">
                          {selectedLeague.facebook && (
                            <Button
                              variant="outline"
                              size="icon"
                              asChild
                              className="bg-accent/30 hover:text-primary"
                            >
                              <a
                                href={`https://${selectedLeague.facebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Facebook className="w-4 h-4" />
                              </a>
                            </Button>
                          )}

                          {selectedLeague.x && (
                            <Button
                              variant="outline"
                              size="icon"
                              asChild
                              className="bg-accent/30 hover:text-primary"
                            >
                              <a
                                href={`https://${selectedLeague.x}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Twitter className="w-4 h-4" />
                              </a>
                            </Button>
                          )}

                          {selectedLeague.youtube && (
                            <Button
                              variant="outline"
                              size="icon"
                              asChild
                              className="bg-accent/30 hover:text-primary"
                            >
                              <a
                                href={`https://${selectedLeague.youtube}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Youtube className="w-4 h-4" />
                              </a>
                            </Button>
                          )}

                          {selectedLeague.instagram && (
                            <Button
                              variant="outline"
                              size="icon"
                              asChild
                              className="bg-accent/30 hover:text-primary"
                            >
                              <a
                                href={`https://${selectedLeague.instagram}`}
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
              <Card className="bg-accent rounded-none border-0">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-2">
                    <ClipboardClock className="text-primary" />
                    <h2 className="text-2xl font-bold text-gradient">
                      Upcoming Events
                    </h2>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue="item-0"
                    >
                      {upcomingEvents.map((event, index) => (
                        <AccordionItem
                          value={`item-${index}`}
                          key={event.idEvent}
                        >
                          <AccordionTrigger className="text-lg font-semibold text-gradient">
                            {event.strEvent}
                          </AccordionTrigger>

                          <AccordionContent>
                            <div className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-primary/10 p-4 m-4 racing-glow border border-primary/20">
                              <div className="sm:w-1/3">
                                <Image
                                  src={
                                    event.strThumb ||
                                    event.strPoster ||
                                    "/fallback.jpg"
                                  }
                                  width={500}
                                  height={500}
                                  alt={event.strEvent}
                                  className="w-full h-40 sm:h-full object-cover rounded-xl"
                                />
                              </div>

                              {/* Right: Info */}
                              <div className="flex flex-col justify-between sm:w-2/3 gap-3">
                                <div>
                                  <h3 className="text-xl font-bold text-gradient">
                                    {event.strLeague}
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    Round {event.intRound} • Season{" "}
                                    {event.strSeason}
                                  </p>
                                  <p className="mt-2 text-base text-white flex items-center gap-1">
                                    <LineSquiggle className="w-5 text-primary" /> {event.strVenue},{" "}
                                    {event.strCountry}
                                  </p>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2">
                                  <p className="text-sm text-gray-300">
                                    {new Date(
                                      event.strTimestamp
                                    ).toLocaleDateString("en-GB", {
                                      weekday: "long",
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                    {" • "}
                                    {event.strTimeLocal}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </div>

          {/* League Details */}
          {/* <div className="grid grid-cols-1 gap-y-8 mb-12">
            {/* Main Content 
            <Card className="bg-accent">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-2">
                  <ClipboardClock className="text-primary" />
                  <h2 className="text-2xl font-bold text-gradient">
                    Upcoming Events
                  </h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  here I will display all events data
                </div>
              </CardContent>
            </Card>
            {/* Fan Art Gallery 
            <Card className="bg-accent/80 racing-glow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gradient mb-4">Gallery</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedLeague.fanArt.slice(0, 4).map((art, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <Image
                        src={art}
                        alt={`${selectedLeague.name} fan art ${index + 1}`}
                        width={500}
                        height={500}
                        className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div> */}

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
