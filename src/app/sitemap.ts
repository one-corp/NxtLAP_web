import { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/blogs";
import fs from "fs/promises";
import path from "path";

const siteUrl = "https://www.nxtlap.com";

/**
 * Get the last modification time for a static page file
 * @param pagePath - Relative path to the page file from src/app
 * @returns Date object of last modification, or current date as fallback
 */
async function getPageModifiedTime(pagePath: string): Promise<Date> {
  try {
    const fullPath = path.join(process.cwd(), "src", "app", pagePath);
    const stats = await fs.stat(fullPath);
    return stats.mtime;
  } catch (error) {
    console.warn(`Could not get file stats for ${pagePath}:`, error);
    return new Date(); // Fallback to current date
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts with their metadata (including lastModified)
  const posts = await getAllPostsMeta();

  // Get modification times for static pages
  const [homeModified, myLeaguesModified, faqsModified, aboutModified, blogsModified] = 
    await Promise.all([
      getPageModifiedTime("page.tsx"),
      getPageModifiedTime("my-leagues/page.tsx"),
      getPageModifiedTime("faqs/page.tsx"),
      getPageModifiedTime("about/page.tsx"),
      getPageModifiedTime("blogs/page.tsx"),
    ]);

  // Create blog post URLs with actual modification times
  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.lastModified || post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: homeModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: blogsModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/faqs`,
      lastModified: faqsModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: aboutModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/my-leagues`,
      lastModified: myLeaguesModified,
      changeFrequency: "never" as const,
      priority: 0.3,
    },
    ...blogUrls,
  ];
}