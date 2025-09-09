import { MetadataRoute } from "next";

const siteUrl = "https://www.motorsportsai.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    }
  ];

  return [...staticRoutes];
}