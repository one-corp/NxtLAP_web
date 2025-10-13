import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blogs";

const siteUrl = "https://www.nxtlap.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const blogUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteUrl}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/my-leagues`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.1
    },
    {
      url: `${siteUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.5
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    ...blogUrls
  ]
  
}