/**
 * Structured Data (JSON-LD) Builders
 * Generate Schema.org compliant structured data for rich search results
 */

import { siteConfig } from '@/config/site';
import { PostMeta } from '@/lib/blogs';
import { Event } from '@/types/Event';

/**
 * Article Schema for blog posts
 * Enables rich snippets in search results with author, date, and image
 */
export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'BlogPosting';
  headline: string;
  description: string;
  image: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string[];
}

/**
 * Organization Schema for homepage
 * Establishes brand identity and social media presence
 */
export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  description?: string;
}

/**
 * FAQPage Schema for FAQ pages
 * Enables FAQ rich snippets in search results
 */
export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

/**
 * BreadcrumbList Schema for navigation
 * Shows breadcrumb trail in search results
 */
export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

/**
 * WebSite Schema with SearchAction
 * Enables site search box in Google search results
 */
export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

/**
 * ItemList Schema for blog post carousel
 * Enables carousel/list rich results in search
 */
export interface ItemListSchema {
  '@context': 'https://schema.org';
  '@type': 'ItemList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    url: string;
    name: string;
    image?: string;
  }>;
}

/**
 * SportsEvent Schema for motorsport events
 * Enables event rich snippets with date and location
 */
export interface SportsEventSchema {
  '@context': 'https://schema.org';
  '@type': 'SportsEvent';
  name: string;
  startDate: string;
  endDate?: string;
  location: {
    '@type': 'Place';
    name: string;
    address?: {
      '@type': 'PostalAddress';
      addressLocality?: string;
      addressCountry?: string;
    };
  };
  organizer: {
    '@type': 'Organization';
    name: string;
  };
  sport: string;
  image?: string;
}

/**
 * Build Article schema for blog posts
 */
export function buildArticleSchema(post: PostMeta): ArticleSchema {
  const url = `${siteConfig.url}/blogs/${post.slug}`;
  const authorName = post.author || siteConfig.authors[0].name;
  const authorUrl = siteConfig.authors.find(a => a.name === authorName)?.url;
  
  // Use featured image if available, otherwise use default OG image
  const imageUrl = post.featuredImage 
    ? `${siteConfig.url}${post.featuredImage}`
    : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || '',
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(post.keywords && post.keywords.length > 0 && { keywords: post.keywords }),
  };
}

/**
 * Build Organization schema for homepage
 */
export function buildOrganizationSchema(): OrganizationSchema {
  const socialLinks = [
    siteConfig.links.twitter,
    siteConfig.links.github,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: socialLinks,
    description: siteConfig.description,
  };
}

/**
 * Build FAQPage schema for FAQ pages
 */
export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Build BreadcrumbList schema for navigation
 */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${siteConfig.url}${item.url}` }),
    })),
  };
}

/**
 * Build WebSite schema with SearchAction
 */
export function buildWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/blogs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Build SportsEvent schema for motorsport events
 */
export function buildSportsEventSchema(event: Event): SportsEventSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.strEvent,
    startDate: event.strTimestamp,
    location: {
      '@type': 'Place',
      name: event.strVenue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.strCity,
        addressCountry: event.strCountry,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.strLeague,
    },
    sport: 'Motorsport',
    ...(event.strPoster && { image: event.strPoster }),
  };
}

/**
 * Build ItemList schema for blog posts carousel
 */
export function buildItemListSchema(posts: PostMeta[]): ItemListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteConfig.url}/blogs/${post.slug}`,
      name: post.title,
      image: post.featuredImage 
        ? `${siteConfig.url}${post.featuredImage}`
        : `${siteConfig.url}${siteConfig.ogImage}`,
    })),
  };
}

/**
 * Helper function to sanitize text for JSON-LD
 * Removes HTML tags and escapes special characters
 */
export function sanitizeForSchema(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/"/g, '\\"') // Escape quotes
    .trim();
}

/**
 * Safely stringify data for JSON-LD to prevent XSS
 * Escapes < and > characters to their Unicode equivalents
 */
export function safeJsonLdStringify(data: any): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');
}
