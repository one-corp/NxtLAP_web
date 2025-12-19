import Parser from 'rss-parser';

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source?: string;
}

export async function fetchMotorsportNews(): Promise<NewsItem[]> {
  const parser = new Parser();
  try {
    const feed = await parser.parseURL('https://www.motorsport.com/rss/all/news/');

    // Map to a simpler structure and limit to top 5-10
    return feed.items.slice(0, 5).map(item => ({
      title: item.title || 'No Title',
      link: item.link || '#',
      pubDate: item.pubDate || new Date().toISOString(),
      contentSnippet: item.contentSnippet,
      source: 'Motorsport.com'
    }));
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}
