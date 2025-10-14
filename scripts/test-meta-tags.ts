#!/usr/bin/env tsx
/**
 * Meta Tags Testing Script
 * Tests Open Graph, Twitter Cards, and general meta tags
 * 
 * Usage: npx tsx scripts/test-meta-tags.ts
 */

import { getAllPostsMeta } from '../src/lib/blogs';
import { generateBlogMetadata, generatePageMetadata } from '../src/lib/seo/metadata';
import { siteConfig } from '../src/config/site';

interface MetaTagTest {
  page: string;
  url: string;
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogUrl: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCreator?: string;
  issues: string[];
  warnings: string[];
}

const results: MetaTagTest[] = [];

function testMetaTags(
  page: string,
  url: string,
  metadata: any
): MetaTagTest {
  const issues: string[] = [];
  const warnings: string[] = [];

  // Extract metadata
  const title = metadata.title || '';
  const description = metadata.description || '';
  const canonical = metadata.alternates?.canonical || '';
  const og = metadata.openGraph || {};
  const twitter = metadata.twitter || {};

  // Title validation
  if (!title) {
    issues.push('Missing title');
  } else {
    if (title.length > 60) {
      warnings.push(`Title too long: ${title.length} chars (recommended: under 60)`);
    }
    if (title.length < 30) {
      warnings.push(`Title too short: ${title.length} chars (recommended: 30-60)`);
    }
    if (!title.includes(siteConfig.name) && page !== '/') {
      warnings.push('Title does not include site name');
    }
  }

  // Description validation
  if (!description) {
    issues.push('Missing description');
  } else {
    if (description.length > 160) {
      warnings.push(`Description too long: ${description.length} chars (recommended: 150-160)`);
    }
    if (description.length < 120) {
      warnings.push(`Description too short: ${description.length} chars (recommended: 150-160)`);
    }
  }

  // Canonical URL validation
  if (!canonical) {
    issues.push('Missing canonical URL');
  } else if (!canonical.startsWith('https://')) {
    issues.push('Canonical URL must use HTTPS');
  }

  // Open Graph validation
  if (!og.title) {
    issues.push('Missing og:title');
  }
  if (!og.description) {
    issues.push('Missing og:description');
  }
  if (!og.type) {
    issues.push('Missing og:type');
  }
  if (!og.url) {
    issues.push('Missing og:url');
  }
  if (!og.images || og.images.length === 0) {
    issues.push('Missing og:image');
  } else {
    const image = og.images[0];
    if (!image.url) {
      issues.push('og:image missing URL');
    }
    if (!image.width || !image.height) {
      warnings.push('og:image missing dimensions (recommended: 1200x630)');
    }
    if (image.width !== 1200 || image.height !== 630) {
      warnings.push(`og:image dimensions ${image.width}x${image.height} (recommended: 1200x630)`);
    }
  }

  // Twitter Card validation
  if (!twitter.card) {
    issues.push('Missing twitter:card');
  } else if (twitter.card !== 'summary_large_image') {
    warnings.push(`twitter:card is "${twitter.card}" (recommended: summary_large_image)`);
  }
  if (!twitter.title) {
    issues.push('Missing twitter:title');
  }
  if (!twitter.description) {
    issues.push('Missing twitter:description');
  }
  if (!twitter.images || twitter.images.length === 0) {
    issues.push('Missing twitter:image');
  }

  return {
    page,
    url,
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    canonical,
    ogTitle: og.title || '',
    ogDescription: og.description || '',
    ogType: og.type || '',
    ogUrl: og.url || '',
    ogImage: og.images?.[0]?.url || '',
    twitterCard: twitter.card || '',
    twitterTitle: twitter.title || '',
    twitterDescription: twitter.description || '',
    twitterImage: twitter.images?.[0] || '',
    twitterCreator: twitter.creator,
    issues,
    warnings,
  };
}

function printResult(result: MetaTagTest) {
  const status = result.issues.length === 0 ? '✅' : '❌';
  console.log(`\n${status} ${result.page}`);
  console.log(`   URL: ${result.url}`);
  console.log(`   Title: "${result.title}" (${result.titleLength} chars)`);
  console.log(`   Description: "${result.description}" (${result.descriptionLength} chars)`);
  console.log(`   Canonical: ${result.canonical}`);
  console.log(`   OG Type: ${result.ogType}`);
  console.log(`   OG Image: ${result.ogImage}`);
  console.log(`   Twitter Card: ${result.twitterCard}`);
  
  if (result.issues.length > 0) {
    console.log('   Issues:');
    result.issues.forEach(issue => console.log(`     ❌ ${issue}`));
  }
  
  if (result.warnings.length > 0) {
    console.log('   Warnings:');
    result.warnings.forEach(warning => console.log(`     ⚠️  ${warning}`));
  }
}

async function testBlogPosts() {
  console.log('\n=== Testing Blog Post Meta Tags ===');
  
  const posts = await getAllPostsMeta();
  
  for (const post of posts) {
    const metadata = generateBlogMetadata(post);
    const url = `${siteConfig.url}/blogs/${post.slug}`;
    
    const result = testMetaTags(`/blogs/${post.slug}`, url, metadata);
    results.push(result);
    printResult(result);
  }
}

async function testStaticPages() {
  console.log('\n=== Testing Static Page Meta Tags ===');
  
  const pages = [
    {
      path: '/',
      title: 'NxtLAP | Track Upcoming Motorsports Events',
      description: 'Discover and track upcoming motorsport events with AI-powered insights. Get race schedules, results, and analysis for Formula 1, MotoGP, and more.',
    },
    {
      path: '/blogs',
      title: 'Motorsport Blog | Race Recaps & Analysis',
      description: 'Latest motorsport news, race recaps, and in-depth analysis. Stay updated with Formula 1, MotoGP, and other racing series coverage.',
    },
    {
      path: '/faqs',
      title: 'Frequently Asked Questions | NxtLAP',
      description: 'Find answers to common questions about NxtLAP, motorsport events, AI-powered insights, and how to track your favorite racing leagues.',
    },
    {
      path: '/about',
      title: 'About NxtLAP | Motorsport Event Tracking',
      description: 'Learn more about NxtLAP and our mission to provide the best motorsport event tracking experience with AI-powered insights and comprehensive coverage.',
    },
    {
      path: '/my-leagues',
      title: 'My Leagues | Track Your Favorite Racing Series',
      description: 'Track your favorite motorsport leagues and upcoming events. Customize your experience with personalized race schedules and notifications.',
    },
  ];
  
  for (const page of pages) {
    const metadata = generatePageMetadata(page);
    const url = `${siteConfig.url}${page.path}`;
    
    const result = testMetaTags(page.path, url, metadata);
    results.push(result);
    printResult(result);
  }
}

function checkUniqueness() {
  console.log('\n=== Checking Title and Description Uniqueness ===');
  
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();
  
  results.forEach(result => {
    // Check titles
    if (!titles.has(result.title)) {
      titles.set(result.title, []);
    }
    titles.get(result.title)!.push(result.page);
    
    // Check descriptions
    if (!descriptions.has(result.description)) {
      descriptions.set(result.description, []);
    }
    descriptions.get(result.description)!.push(result.page);
  });
  
  let duplicatesFound = false;
  
  // Check for duplicate titles
  titles.forEach((pages, title) => {
    if (pages.length > 1) {
      console.log(`\n❌ Duplicate title found: "${title}"`);
      console.log(`   Pages: ${pages.join(', ')}`);
      duplicatesFound = true;
    }
  });
  
  // Check for duplicate descriptions
  descriptions.forEach((pages, description) => {
    if (pages.length > 1) {
      console.log(`\n❌ Duplicate description found: "${description}"`);
      console.log(`   Pages: ${pages.join(', ')}`);
      duplicatesFound = true;
    }
  });
  
  if (!duplicatesFound) {
    console.log('\n✅ All titles and descriptions are unique');
  }
  
  return !duplicatesFound;
}

function generateSummary() {
  console.log('\n\n=== Meta Tags Testing Summary ===');
  
  const totalPages = results.length;
  const pagesWithIssues = results.filter(r => r.issues.length > 0).length;
  const pagesWithWarnings = results.filter(r => r.warnings.length > 0).length;
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
  
  console.log(`Total Pages: ${totalPages}`);
  console.log(`Pages with Issues: ${pagesWithIssues} ❌`);
  console.log(`Pages with Warnings: ${pagesWithWarnings} ⚠️`);
  console.log(`Total Issues: ${totalIssues}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  
  // Title length statistics
  const avgTitleLength = results.reduce((sum, r) => sum + r.titleLength, 0) / totalPages;
  const maxTitleLength = Math.max(...results.map(r => r.titleLength));
  const minTitleLength = Math.min(...results.map(r => r.titleLength));
  
  console.log(`\nTitle Length Statistics:`);
  console.log(`  Average: ${avgTitleLength.toFixed(1)} chars`);
  console.log(`  Min: ${minTitleLength} chars`);
  console.log(`  Max: ${maxTitleLength} chars`);
  console.log(`  Recommended: 30-60 chars`);
  
  // Description length statistics
  const avgDescLength = results.reduce((sum, r) => sum + r.descriptionLength, 0) / totalPages;
  const maxDescLength = Math.max(...results.map(r => r.descriptionLength));
  const minDescLength = Math.min(...results.map(r => r.descriptionLength));
  
  console.log(`\nDescription Length Statistics:`);
  console.log(`  Average: ${avgDescLength.toFixed(1)} chars`);
  console.log(`  Min: ${minDescLength} chars`);
  console.log(`  Max: ${maxDescLength} chars`);
  console.log(`  Recommended: 150-160 chars`);
  
  return pagesWithIssues === 0;
}

async function main() {
  console.log('🔍 Starting Meta Tags Testing...\n');
  
  try {
    await testStaticPages();
    await testBlogPosts();
    
    const uniquenessPass = checkUniqueness();
    const summaryPass = generateSummary();
    
    console.log('\n=== Manual Testing Recommendations ===');
    console.log('\n1. Facebook Sharing Debugger:');
    console.log('   https://developers.facebook.com/tools/debug/');
    console.log('   Test URLs:');
    results.slice(0, 3).forEach(r => console.log(`   - ${r.url}`));
    
    console.log('\n2. Twitter Card Validator:');
    console.log('   https://cards-dev.twitter.com/validator');
    console.log('   Test URLs:');
    results.slice(0, 3).forEach(r => console.log(`   - ${r.url}`));
    
    console.log('\n3. LinkedIn Post Inspector:');
    console.log('   https://www.linkedin.com/post-inspector/');
    console.log('   Test URLs:');
    results.slice(0, 3).forEach(r => console.log(`   - ${r.url}`));
    
    if (!summaryPass || !uniquenessPass) {
      console.log('\n❌ Meta tags testing failed. Please fix the issues above.');
      process.exit(1);
    } else {
      console.log('\n✅ All meta tags tests passed!');
      
      const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
      if (totalWarnings > 0) {
        console.log(`⚠️  ${totalWarnings} warnings found. Consider addressing them for optimal SEO.`);
      }
    }
  } catch (error) {
    console.error('\n❌ Meta tags testing failed:', error);
    process.exit(1);
  }
}

main();
