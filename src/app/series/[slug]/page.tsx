import { allLeagues } from "@/Data/Leagues";
import { ThreePanelLayout } from "@/components/ThreePanelLayout";
import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "@/components/RightPanel";
import { SeriesEventsFeed } from "@/components/SeriesEventsFeed";
import Hero from "@/components/Hero";
import { notFound } from "next/navigation";

// Generate static params for all leagues to help with build/caching if needed,
// though this is a dynamic route.
export function generateStaticParams() {
  return allLeagues.map((league) => ({
    slug: league.shortName ? league.shortName.toLowerCase() : league.id,
  }));
}

export default async function SeriesPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug;
  // Find the league by slug (shortName) or ID
  const league = allLeagues.find(
    (l) => (l.shortName && l.shortName.toLowerCase() === slug.toLowerCase()) || l.id === slug
  );

  if (!league) {
    notFound();
  }

  return (
    <ThreePanelLayout
      leftPanel={<LeftPanel />}
      rightPanel={<RightPanel />}
    >
        <div className="space-y-6">
            <Hero selectedleague={league} />
            <SeriesEventsFeed leagueId={league.id} />
        </div>
    </ThreePanelLayout>
  );
}
