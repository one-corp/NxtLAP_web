import LeaguesAccordion from "@/components/LeaguesAccordion";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/StructuredData";

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

export default function Home() {
  // Generate Organization and WebSite schemas for rich search results
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();

  return (
    <>
      <StructuredData data={[organizationSchema, webSiteSchema]} />
      <LeaguesAccordion /> 
    </>
  );
}
