import { Event } from "@/types/Event";
import { Calendar, MapPin, Clock, Flag } from "lucide-react";

interface EventCardProps {
  events: Event[];
}

const EventCard = ({ events }: EventCardProps) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No events available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {events.map((eventData, index) => {
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
        } = eventData;
        

        const eventDate = new Date(strTimestamp);
        const formattedDate = eventDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const formattedTime = eventDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        });

        const localTime = strTimeLocal;
        
        return (
          <div key={index} className="w-full">
            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-card via-card/90 to-card backdrop-blur-sm border border-border/50">
                <div className="absolute inset-0 bg-card/70 backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10 p-4 lg:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    <div className="lg:col-span-2 space-y-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 bg-primary/15 rounded-lg">
                          <Flag className="text-primary w-4 h-4" />
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          {strLeague} • {strSeason} • Laps {intRound}
                        </div>
                      </div>

                      <h3 className="text-xl lg:text-2xl font-bold text-gradient mb-2">
                        {strEvent}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-2 bg-accent/40 rounded-lg border border-border/30">
                          <MapPin className="text-primary w-4 h-4 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-xs">{strVenue}</div>
                            <div className="text-[10px] text-muted-foreground">
                              {strCity}, {strCountry}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-2 bg-accent/40 rounded-lg border border-border/30">
                          <Clock className="text-primary w-4 h-4 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-xs">
                              {formattedTime}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              Local: {localTime}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <Calendar className="text-primary w-4 h-4" />
                        <span className="font-semibold text-sm text-primary">
                          {formattedDate}
                        </span>
                        {strPostponed !== "no" && (
                          <span className="ml-auto px-2 py-1 bg-destructive/20 text-destructive text-xs rounded-full border border-destructive/30">
                            Postponed
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="relative group">
                        <div className="h-48 w-full bg-gradient-to-br from-red-600/20 via-slate-800/40 to-red-800/20 rounded-xl shadow-lg border border-border/30 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <Flag className="w-8 h-8 text-red-500 mx-auto animate-pulse" />
                            <div className="text-base font-bold text-gradient">
                              {strLeague}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Round {intRound}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="block md:hidden">
              <div className="bg-card backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-lg">
                <div className="relative h-48 bg-gradient-to-br from-red-600/20 via-slate-800/40 to-red-800/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Flag className="w-10 h-10 text-red-500 mx-auto animate-pulse" />
                    <div className="text-sm font-bold text-gradient">
                      {strLeague}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <h3 className="text-xl font-bold text-gradient">{strEvent}</h3>

                  <div className="text-sm text-muted-foreground">
                    Laps {intRound} • {strSeason}
                  </div>

                  <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="text-primary w-4 h-4" />
                      <span className="text-sm font-semibold text-primary">
                        {formattedDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-primary w-4 h-4" />
                      <span className="text-sm">{formattedTime}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        Local: {localTime}
                      </span>
                    </div>
                  </div>

                  <div className="bg-accent/40 rounded-lg p-3 border border-border/30">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-primary w-4 h-4" />
                      <div>
                        <div className="font-semibold text-sm">{strVenue}</div>
                        <div className="text-xs text-muted-foreground">
                          {strCity}, {strCountry}
                        </div>
                      </div>
                    </div>
                  </div>

                  {strPostponed !== "no" && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                      <span className="text-sm font-medium text-destructive">
                        Event Postponed
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventCard;