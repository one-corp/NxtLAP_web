import { allLeagues } from "@/Data/Leagues";
import { ThreePanelLayout } from "@/components/ThreePanelLayout";
import { RightPanel } from "@/components/RightPanel";
import { SeriesEventsFeed } from "@/components/SeriesEventsFeed";
import Hero from "@/components/Hero";
import { notFound } from "next/navigation";

// Generate static params for all leagues to help with build/caching if needed,
// though this is a dynamic route.
export function generateStaticParams() {
  return allLeagues.map((league) => {
    const rawSlug = league.shortName || league.id;
    return {
      slug: rawSlug.toLowerCase().replace(/\s+/g, '-'),
    };
  });
}

export default async function SeriesPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug;

  // Find the league by matching the URL-friendly slug
  const league = allLeagues.find((l) => {
    const rawSlug = l.shortName || l.id;
    const generatedSlug = rawSlug.toLowerCase().replace(/\s+/g, '-');
    return generatedSlug === slug.toLowerCase();
  });

  if (!league) {
    notFound();
  }

  return (
    <ThreePanelLayout
      rightPanel={<RightPanel />}
    >
        <div className="space-y-6">
            <Hero selectedleague={league} />
            <SeriesEventsFeed leagueId={league.id} />
        </div>
    </ThreePanelLayout>
  );
}
