import { Event } from "@/types/Event";
import { allLeagues } from "@/Data/Leagues";
import { Calendar, MapPin, Clock, Flag } from "lucide-react";
import Image from "next/image";

// --- Helper Functions ---

// Group events by Month Year
function groupEventsByMonth(events: Event[]) {
  const groups: Record<string, Event[]> = {};

  // Sort events by date first to be safe
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.strTimestamp).getTime() - new Date(b.strTimestamp).getTime()
  );

  sortedEvents.forEach(event => {
    const date = new Date(event.strTimestamp);
    // Format: "November 2024"
    const key = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(event);
  });

  return groups;
}

// --- Components ---

interface EventItemProps {
  event: Event;
}

function EventItem({ event }: EventItemProps) {
  const {
    strEvent,
    intRound,
    strVenue,
    strCity,
    strCountry,
    strLeague,
    strSeason,
    strTimeLocal,
    strTimestamp,
    strPostponed,
    idLeague
  } = event;

  const eventDate = new Date(strTimestamp);

  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  // Find League Logo
  const leagueInfo = allLeagues.find(l => l.id === idLeague || l.name === strLeague || l.shortName === strLeague);
  const leagueLogo = leagueInfo?.logo;

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm transition-all hover:border-primary/50 hover:shadow-md group">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 p-5 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-9 space-y-4">
                <div className="flex items-center gap-3">
                   {/* League Badge (Small) */}
                    {leagueLogo ? (
                        <div className="relative w-8 h-8 rounded bg-white/5 p-1 flex items-center justify-center border border-border/30">
                            <Image
                                src={leagueLogo}
                                alt={strLeague}
                                width={24}
                                height={24}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    ) : (
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                            <Flag className="text-primary w-5 h-5" />
                        </div>
                    )}

                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <span className="text-foreground font-semibold">{strLeague}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{strSeason}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>Round {intRound}</span>
                  </div>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {strEvent}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="text-primary w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">{strVenue}</div>
                      <div>{strCity}, {strCountry}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Clock className="text-primary w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        {formattedTime}
                      </div>
                      <div className="text-xs">
                        Local: {strTimeLocal}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               {/* Right Column: Date & Status */}
              <div className="lg:col-span-3 flex flex-col items-end justify-center gap-3 border-l border-border/30 pl-6 lg:pl-0 lg:border-l-0">
                 <div className="text-center w-full bg-secondary/50 rounded-lg p-3 border border-border/50">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        {eventDate.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                        {eventDate.getDate()}
                    </div>
                    <div className="text-xs font-medium text-muted-foreground uppercase">
                        {eventDate.toLocaleDateString("en-US", { month: "short" })}
                    </div>
                 </div>

                {strPostponed !== "no" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20">
                    Postponed
                    </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
            {/* Header / Banner area could be added here if we had event specific images,
                for now we keep it clean. */}

          <div className="p-4 space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                        {leagueLogo ? (
                             <Image
                             src={leagueLogo}
                             alt={strLeague}
                             width={16}
                             height={16}
                             className="object-contain"
                            />
                        ) : (
                            <Flag className="w-3 h-3 text-primary" />
                        )}
                        <span>{strLeague}</span>
                        <span>•</span>
                        <span>Rd {intRound}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-tight">{strEvent}</h3>
                </div>
                 {/* Date Box Mobile */}
                 <div className="flex-shrink-0 text-center bg-secondary/50 rounded p-2 border border-border/50 min-w-[3.5rem]">
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">
                        {eventDate.toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div className="text-lg font-bold text-primary leading-none">
                        {eventDate.getDate()}
                    </div>
                 </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/30">
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <Clock className="w-4 h-4 text-primary" />
                   <span>{formattedTime}</span>
               </div>
               <div className="flex items-start gap-2 text-sm text-muted-foreground">
                   <MapPin className="w-4 h-4 text-primary mt-0.5" />
                   <span className="line-clamp-1">{strVenue}, {strCity}</span>
               </div>
            </div>

            {strPostponed !== "no" && (
              <div className="bg-destructive/10 border border-destructive/30 rounded px-2 py-1 text-center">
                <span className="text-xs font-medium text-destructive">
                  Event Postponed
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-xl bg-card/50">
        <p className="text-muted-foreground">No upcoming events found.</p>
      </div>
    );
  }

  const groupedEvents = groupEventsByMonth(events);
  const sortedKeys = Object.keys(groupedEvents); // already sorted by insertion because of the sort inside helper?
  // No, Object.keys order is not guaranteed to be insertion order for strings strictly, though usually is.
  // But wait, the helper iterates sorted events. So we insert "November 2024", then "December 2024".
  // JS preserves insertion order for string keys.
  // But let's trust the array order or re-sort logic if we want to be 100% robust.
  // Given we sorted events first, the keys will be created in chronological order.

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {sortedKeys.map((monthKey) => (
        <div key={monthKey} className="space-y-4">
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 backdrop-blur-md bg-background/80 py-3 border-b border-border/50 -mx-4 px-4 md:mx-0 md:px-0 md:rounded-lg">
             <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {monthKey}
             </h3>
          </div>

          <div className="space-y-4">
            {groupedEvents[monthKey].map((event) => (
              <EventItem key={`${event.idEvent}-${event.idLeague}`} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
