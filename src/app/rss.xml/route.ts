import { NextResponse } from 'next/server';
import { getAllPostsMeta, getPostBySlug } from '@/lib/blogs';
import { siteConfig } from '@/config/site';

/**
 * RSS Feed Generator
 * Generates an RSS 2.0 feed for all blog posts
 */
export async function GET() {
  try {
    const posts = await getAllPostsMeta();
    
    // Build RSS 2.0 XML
    const rssItems = await Promise.all(
      posts.map(async (post) => {
        const fullPost = await getPostBySlug(post.slug);
        const postUrl = `${siteConfig.url}/blogs/${post.slug}`;
        
        // Get full content HTML
        const content = fullPost?.contentHtml || '';
        
        // Build enclosure for featured image if available
        const enclosure = post.featuredImage
          ? `    <enclosure url="${siteConfig.url}${post.featuredImage}" type="image/jpeg" />`
          : '';
        
        // Format publication date to RFC 822 format
        const pubDate = new Date(post.date).toUTCString();
        
        return `  <item>
    <title><![CDATA[${post.title}]]></title>
    <description><![CDATA[${post.description || ''}]]></description>
    <link>${postUrl}</link>
    <guid isPermaLink="true">${postUrl}</guid>
    <pubDate>${pubDate}</pubDate>
${post.author ? `    <author>${post.author}</author>` : ''}
${enclosure}
    <content:encoded><![CDATA[${content}]]></content:encoded>
${post.tags && post.tags.length > 0 ? post.tags.map(tag => `    <category>${tag}</category>`).join('\n') : ''}
  </item>`;
      })
    );

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <description>${siteConfig.description}</description>
    <link>${siteConfig.url}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems.join('\n')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
