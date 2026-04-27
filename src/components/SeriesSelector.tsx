"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { allLeagues } from "@/Data/Leagues";
import { cn } from "@/lib/utils";

export function SeriesSelector() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up, hide when scrolling down
      // Also show if at the top of the page
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

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
    <div 
      className={cn(
        "fixed top-[112px] left-0 right-0 w-full border-b bg-background overflow-x-auto no-scrollbar transition-transform duration-300 z-30",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
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
                  <span>{league.shortName || league.name}</span>
                </Link>
             );
          })}
        </div>
      </div>
    </div>
  );
}
