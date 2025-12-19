"use client";

import { useEffect, useState } from "react";
import { baseURL } from "@/utils/constants";
import { Event } from "@/types/Event";
import EventList from "./EventList";
import { RacingLoader } from "./skeletons/RacingLoader";
import { F1ApiService } from "@/utils/f1-api";
import { shouldUseAlternativeAPI } from "@/utils/api-config";
import { ClipboardClock } from "lucide-react";

interface SeriesEventsFeedProps {
  leagueId: string;
}

export function SeriesEventsFeed({ leagueId }: SeriesEventsFeedProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const now = new Date();
        const nowISO = now.toISOString().slice(0, 19);
        const year = now.getFullYear();

        let fetchedEvents: Event[] = [];

        if (shouldUseAlternativeAPI(leagueId)) {
          // For F1, use the specific service
          fetchedEvents = await F1ApiService.getUpcomingF1Events();
        } else {
          // For others, use TheSportsDB
          try {
            const res = await fetch(
              `${baseURL}/eventsseason.php?id=${leagueId}&s=${year}`
            );
            const data = await res.json();
            const eventsArray = Array.isArray(data?.events) ? data.events : [];
            fetchedEvents = eventsArray.filter((e: Event) => e.strTimestamp > nowISO);
          } catch (err) {
            console.error(`Error fetching for league ${leagueId}`, err);
          }
        }

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch series events", error);
      } finally {
        setLoading(false);
      }
    }

    if (leagueId) {
        fetchEvents();
    }
  }, [leagueId]);

  if (loading) {
    return <RacingLoader />;
  }

  if (events.length === 0) {
      return (
        <div className="p-8 text-center border rounded-xl bg-card mt-6">
          <p className="text-muted-foreground">No upcoming events found for this series.</p>
        </div>
      );
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
         <h2 className="text-xl font-bold flex items-center gap-2">
           <ClipboardClock className="text-primary w-5 h-5" />
           Upcoming Events
        </h2>
      </div>
      <EventList events={events} />
    </div>
  );
}
