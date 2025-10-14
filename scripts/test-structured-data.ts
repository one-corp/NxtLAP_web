/**
 * Test Structured Data Generation
 * Verifies that structured data is being generated correctly
 */

import { buildArticleSchema, buildOrganizationSchema, buildWebSiteSchema } from '../src/lib/seo/structured-data';
import { PostMeta } from '../src/lib/blogs';

// Test Article Schema
const testPost: PostMeta = {
  title: 'Test Article',
  slug: 'test-article',
  date: '2025-10-15',
  description: 'This is a test article description',
  author: 'Vaidik Dubey',
  tags: ['F1', 'Racing'],
  keywords: ['formula 1', 'racing'],
  readingTime: '5 min read',
};

console.log('=== Testing Structured Data Generation ===\n');

console.log('1. Article Schema:');
const articleSchema = buildArticleSchema(testPost);
console.log(JSON.stringify(articleSchema, null, 2));
console.log('\n');

console.log('2. Organization Schema:');
const orgSchema = buildOrganizationSchema();
console.log(JSON.stringify(orgSchema, null, 2));
console.log('\n');

console.log('3. WebSite Schema:');
const websiteSchema = buildWebSiteSchema();
console.log(JSON.stringify(websiteSchema, null, 2));
console.log('\n');

console.log('✅ All schemas generated successfully!');
console.log('\nTo test in Google Rich Results Test:');
console.log('1. Build your site: npm run build');
console.log('2. Deploy to production');
console.log('3. Visit: https://search.google.com/test/rich-results');
console.log('4. Enter your page URL');
