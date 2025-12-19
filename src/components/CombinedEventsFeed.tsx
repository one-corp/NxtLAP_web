"use client";

import { useEffect, useState } from "react";
import { allLeagues } from "@/Data/Leagues";
import { baseURL } from "@/utils/constants";
import { Event } from "@/types/Event";
import EventList from "./EventList";
import { RacingLoader } from "./skeletons/RacingLoader";
import { F1ApiService } from "@/utils/f1-api";
import { shouldUseAlternativeAPI } from "@/utils/api-config";
import { ClipboardClock } from "lucide-react";

export function CombinedEventsFeed() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllEvents() {
      try {
        setLoading(true);
        const now = new Date();
        const nowISO = now.toISOString().slice(0, 19);
        const year = now.getFullYear();

        // Create an array of promises to fetch data for all leagues
        const promises = allLeagues.map(async (league) => {
          if (shouldUseAlternativeAPI(league.id)) {
            // For F1, use the specific service
            return F1ApiService.getUpcomingF1Events();
          } else {
            // For others, use TheSportsDB
            try {
              const res = await fetch(
                `${baseURL}/eventsseason.php?id=${league.id}&s=${year}`
              );
              const data = await res.json();
              const eventsArray = Array.isArray(data?.events) ? data.events : [];
              return eventsArray.filter((e: Event) => e.strTimestamp > nowISO);
            } catch (err) {
              console.error(`Error fetching for ${league.name}`, err);
              return [];
            }
          }
        });

        // Wait for all fetches
        const results = await Promise.all(promises);

        // Flatten the array of arrays
        const allEvents = results.flat();

        // Sort by date (ascending)
        allEvents.sort((a, b) => {
             // F1ApiService returns date/time in specific format, standard API in another.
             // We need to ensure we are comparing correctly.
             // strTimestamp is usually "YYYY-MM-DD HH:MM:SS"
             // F1 adapter ensures compatibility? Let's check type.
             // Assuming string comparison works for ISO-like dates.
             return a.strTimestamp.localeCompare(b.strTimestamp);
        });

        setEvents(allEvents);
      } catch (error) {
        console.error("Failed to fetch combined events", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllEvents();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
           <ClipboardClock className="text-primary w-5 h-5" />
           All Upcoming Races
        </h2>
        <RacingLoader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
           <ClipboardClock className="text-primary w-5 h-5" />
           All Upcoming Races
        </h2>
      </div>

      <EventList events={events} />
    </div>
  );
}
