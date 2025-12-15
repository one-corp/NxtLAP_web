import { LatestBlogs } from "@/components/LatestBlogs";
import { generatePageMetadata } from "@/lib/seo/metadata";
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildItemListSchema,
} from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/StructuredData";
import { getAllPostsMeta } from "@/lib/blogs";
import { ThreePanelLayout } from "@/components/ThreePanelLayout";
import { CombinedEventsFeed } from "@/components/CombinedEventsFeed";
import { RightPanel } from "@/components/RightPanel";

export const metadata = generatePageMetadata({
  title: "NxtLAP | Track Upcoming Motorsports Events",
  description: "Discover and track upcoming motorsport events with AI-powered insights. Stay updated with F1, MotoGP, NASCAR, IndyCar, and more racing leagues in one place.",
  keywords: [
    "Motorsport events",
    "Racing calendar",
    "F1 schedule",
    "MotoGP schedule",
    "NASCAR schedule",
    "IndyCar schedule",
    "upcoming races",
    "racing leagues",
    "motorsport tracker",
    "race schedule 2025",
  ],
  path: "/",
});

export default async function Home() {
  // Get latest blog posts for homepage
  const posts = await getAllPostsMeta();
  const latestPosts = posts.slice(0, 3);

  // Generate schemas for rich search results
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();
  const itemListSchema = buildItemListSchema(latestPosts);

  return (
    <>
      <StructuredData
        data={[organizationSchema, webSiteSchema, itemListSchema]}
      />
      <ThreePanelLayout
        rightPanel={<RightPanel />}
      >
        <CombinedEventsFeed />
      </ThreePanelLayout>
      <LatestBlogs posts={posts} limit={3} />
    </>
  );
}
