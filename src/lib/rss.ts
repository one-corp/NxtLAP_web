import Parser from "rss-parser";
import { allLeagues } from "@/Data/Leagues";

const parser = new Parser({
    timeout: 5000, // 5 seconds timeout per feed
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
});

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source: string; // League name
  sourceLogo?: string;
  isoDate: string;
}

export async function getLatestNews(): Promise<NewsItem[]> {
  const newsItems: NewsItem[] = [];

  // Filter leagues with RSS feeds
  // Note: Some RSS URLs might be invalid or web pages (like BBC F1).
  // We will try to parse them, if it fails, we catch the error.
  const leaguesWithRss = allLeagues.filter(l => l.rss && l.rss.length > 0 && l.rss.startsWith("http"));

  const promises = leaguesWithRss.map(async (league) => {
    try {
      const feed = await parser.parseURL(league.rss);

      // Limit to 5 items per league to avoid overwhelming
      const items = feed.items.slice(0, 5);

      items.forEach(item => {
        if (item.title && item.link && item.pubDate) {
           newsItems.push({
             title: item.title,
             link: item.link,
             pubDate: item.pubDate,
             contentSnippet: item.contentSnippet,
             source: league.shortName || league.name,
             sourceLogo: league.logo,
             isoDate: item.isoDate || new Date(item.pubDate).toISOString()
           });
        }
      });
    } catch {
      // console.error(`Failed to fetch RSS for ${league.name} (${league.rss})`);
      // Silent failure is better for the UI, just don't show news for that league
    }
  });

  await Promise.all(promises);

  // Sort by date descending
  return newsItems.sort((a, b) => {
    const dateA = new Date(a.isoDate).getTime();
    const dateB = new Date(b.isoDate).getTime();
    return dateB - dateA;
  });
}
