import { Skeleton } from "@/components/ui/skeleton";

export const EventCardSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-card via-card/90 to-card backdrop-blur-sm border border-border/50"
        >
          <div className="relative z-10 p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Left Section */}
              <div className="lg:col-span-2 space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="h-4 w-40" />
                </div>

                <Skeleton className="h-8 w-64 rounded-lg" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-accent/40 rounded-lg border border-border/30">
                    <Skeleton className="w-5 h-5 rounded" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-accent/40 rounded-lg border border-border/30">
                    <Skeleton className="w-5 h-5 rounded" />
                    <div>
                      <Skeleton className="h-4 w-28 mb-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>

              {/* Right Section (Poster) */}
              <div className="lg:col-span-1">
                <Skeleton className="h-80 w-full rounded-xl border border-border/30" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};