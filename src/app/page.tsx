import LeaguesAccordion from "@/components/LeaguesAccordion";
import { LatestBlogs } from "@/components/LatestBlogs";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/StructuredData";
import { getAllPostsMeta } from "@/lib/blogs";

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
  // Generate Organization and WebSite schemas for rich search results
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();
  
  // Get latest blog posts for homepage
  const posts = await getAllPostsMeta();

  return (
    <>
      <StructuredData data={[organizationSchema, webSiteSchema]} />
      <LeaguesAccordion />
      <LatestBlogs posts={posts} limit={3} />
    </>
  );
}
