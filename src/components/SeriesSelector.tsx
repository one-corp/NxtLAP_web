"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { allLeagues } from "@/Data/Leagues";
import { cn } from "@/lib/utils";

export function SeriesSelector() {
  const pathname = usePathname();

  // Helper to determine if a link is active
  // Special case for "All" which is just "/"
  const isAllActive = pathname === "/";

  // For series, we check if pathname starts with /series/{slug}
  const isSeriesActive = (slug: string) => {
      // Assuming route structure /series/[slug]
      // We need to map league.shortName or id to the slug used in URL
      // Let's use shortName as slug for friendly URLs, lowercase
      const seriesSlug = slug.toLowerCase();
      return pathname.startsWith(`/series/${seriesSlug}`);
  };

  return (
    <div className="w-full border-b bg-background overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 py-3">
          {/* 'All' Category */}
          <Link
            href="/"
            className={cn(
              "flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              isAllActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>All</span>
          </Link>

          {/* Separator */}
          <div className="h-6 w-px bg-border/50 mx-1 flex-shrink-0" />

          {/* Individual Leagues */}
          {allLeagues.map((league) => {
             // Generate a URL-friendly slug (kebab-case)
             // e.g. "V8 Supercars" -> "v8-supercars"
             const rawSlug = league.shortName || league.id;
             const slug = rawSlug.toLowerCase().replace(/\s+/g, '-');
             const active = isSeriesActive(slug);

             return (
                <Link
                  key={league.id}
                  href={`/series/${slug}`}
                  className={cn(
                    "flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all group",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {league.logo && (
                    <div className="relative w-4 h-4 overflow-hidden">
                        <Image
                            src={league.logo}
                            alt={league.shortName || league.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                  )}
                  <span>{league.shortName || league.name}</span>
                </Link>
             );
          })}
        </div>
      </div>
    </div>
  );
}
