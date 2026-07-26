/**
 * SEO Metadata Generator
 * Centralized metadata generation for consistent SEO across all pages
 */

import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { PostMeta } from '@/lib/blogs';

/**
 * Configuration for page metadata generation
 */
export interface PageConfig {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/**
 * Generate complete metadata for blog posts
 * Includes Open Graph, Twitter Cards, and article-specific tags
 */
export function generateBlogMetadata(post: PostMeta): Metadata {
  const url = `${siteConfig.url}/blogs/${post.slug}`;
  const title = `${post.title} | ${siteConfig.name}`;
  const description = post.description || siteConfig.description;
  
  // Use featured image if available, otherwise use default OG image
  const imageUrl = post.featuredImage 
    ? `${siteConfig.url}${post.featuredImage}`
    : `${siteConfig.url}${siteConfig.ogImage}`;

  // Extract author name or use default
  const authorName = post.author || siteConfig.authors[0].name;

  return {
    title,
    description,
    keywords: post.keywords || [...siteConfig.keywords],
    
    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Open Graph
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url,
      siteName: siteConfig.name,
      locale: siteConfig.defaultMetadata.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      // Article-specific tags
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [authorName],
    } as Record<string, unknown>, // Type assertion needed for article-specific Open Graph properties

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
      creator: siteConfig.creator,
    },

    // Additional metadata
    authors: [
      {
        name: authorName,
        url: siteConfig.authors.find(a => a.name === authorName)?.url,
      },
    ],
  };
}

/**
 * Generate metadata for static pages
 * Provides consistent metadata structure with fallbacks
 */
export function generatePageMetadata(config: PageConfig): Metadata {
  const {
    title,
    description,
    keywords = siteConfig.keywords,
    path = '',
    image = siteConfig.ogImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
  } = config;

  const url = `${siteConfig.url}${path}`;
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [...keywords] as string[],
    
    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Open Graph
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.defaultMetadata.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.creator,
    },
  };

  // Add article-specific metadata if type is article
  if (type === 'article' && metadata.openGraph) {
    const og = metadata.openGraph as Record<string, unknown>;
    og.publishedTime = publishedTime;
    og.modifiedTime = modifiedTime;
    og.authors = authors;
  }

  // Add authors if provided
  if (authors && authors.length > 0) {
    metadata.authors = authors.map(name => ({
      name,
      url: siteConfig.authors.find(a => a.name === name)?.url,
    }));
  }

  return metadata;
}

/**
 * Helper function to truncate text to a specific length
 * Useful for ensuring meta descriptions stay within limits
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Helper function to ensure description is within SEO best practices (150-160 chars)
 */
export function optimizeDescription(description: string, minLength: number = 150, maxLength: number = 160): string {
  if (description.length < minLength) {
    console.warn(`Description is shorter than recommended ${minLength} characters: "${description}"`);
  }
  return truncateText(description, maxLength);
}
