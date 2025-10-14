#!/usr/bin/env tsx
/**
 * SEO Validation Script
 * Validates structured data and metadata across all pages
 * 
 * Usage: npx tsx scripts/validate-seo.ts
 */

import { getAllPostsMeta } from '../src/lib/blogs';
import { buildArticleSchema, buildOrganizationSchema, buildFAQSchema, buildWebSiteSchema } from '../src/lib/seo/structured-data';
import { generateBlogMetadata, generatePageMetadata } from '../src/lib/seo/metadata';
import { 
  validateArticleSchema, 
  validateOrganizationSchema, 
  validateFAQSchema, 
  validateWebSiteSchema,
  validateMetadata,
  ValidationResult 
} from '../src/lib/seo/validation';
import FAQs from '../src/Data/FAQs';

interface TestResult {
  page: string;
  type: string;
  passed: boolean;
  errors: string[];
  warnings: string[];
}

const results: TestResult[] = [];

function logResult(result: TestResult) {
  results.push(result);
  
  const status = result.passed ? '✅' : '❌';
  console.log(`\n${status} ${result.page} (${result.type})`);
  
  if (result.errors.length > 0) {
    console.log('  Errors:');
    result.errors.forEach(error => console.log(`    - ${error}`));
  }
  
  if (result.warnings.length > 0) {
    console.log('  Warnings:');
    result.warnings.forEach(warning => console.log(`    - ${warning}`));
  }
}

function combineValidationResults(...results: ValidationResult[]): ValidationResult {
  return {
    valid: results.every(r => r.valid),
    errors: results.flatMap(r => r.errors),
    warnings: results.flatMap(r => r.warnings),
  };
}

async function validateBlogPosts() {
  console.log('\n=== Validating Blog Posts ===');
  
  const posts = await getAllPostsMeta();
  
  for (const post of posts) {
    // Validate Article Schema
    const articleSchema = buildArticleSchema(post);
    const schemaValidation = validateArticleSchema(articleSchema);
    
    // Validate Metadata
    const metadata = generateBlogMetadata(post);
    const metadataValidation = validateMetadata(metadata);
    
    const combined = combineValidationResults(
      schemaValidation,
      metadataValidation.title,
      metadataValidation.description,
      metadataValidation.openGraph,
      metadataValidation.twitter
    );
    
    logResult({
      page: `/blogs/${post.slug}`,
      type: 'Blog Post',
      passed: combined.valid,
      errors: combined.errors,
      warnings: combined.warnings,
    });
  }
}

async function validateHomepage() {
  console.log('\n=== Validating Homepage ===');
  
  // Validate Organization Schema
  const orgSchema = buildOrganizationSchema();
  const orgValidation = validateOrganizationSchema(orgSchema);
  
  // Validate WebSite Schema
  const websiteSchema = buildWebSiteSchema();
  const websiteValidation = validateWebSiteSchema(websiteSchema);
  
  // Validate Metadata
  const metadata = generatePageMetadata({
    title: 'NxtLAP | Track Upcoming Motorsports Events',
    description: 'Discover and track upcoming motorsport events with AI-powered insights.',
    path: '/',
  });
  const metadataValidation = validateMetadata(metadata);
  
  const combined = combineValidationResults(
    orgValidation,
    websiteValidation,
    metadataValidation.title,
    metadataValidation.description,
    metadataValidation.openGraph,
    metadataValidation.twitter
  );
  
  logResult({
    page: '/',
    type: 'Homepage',
    passed: combined.valid,
    errors: combined.errors,
    warnings: combined.warnings,
  });
}

async function validateFAQsPage() {
  console.log('\n=== Validating FAQs Page ===');
  
  // Validate FAQ Schema
  const faqSchema = buildFAQSchema(FAQs);
  const schemaValidation = validateFAQSchema(faqSchema);
  
  // Validate Metadata
  const metadata = generatePageMetadata({
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about NxtLAP and motorsport events.',
    path: '/faqs',
  });
  const metadataValidation = validateMetadata(metadata);
  
  const combined = combineValidationResults(
    schemaValidation,
    metadataValidation.title,
    metadataValidation.description,
    metadataValidation.openGraph,
    metadataValidation.twitter
  );
  
  logResult({
    page: '/faqs',
    type: 'FAQs Page',
    passed: combined.valid,
    errors: combined.errors,
    warnings: combined.warnings,
  });
}

async function validateStaticPages() {
  console.log('\n=== Validating Static Pages ===');
  
  const pages = [
    {
      path: '/blogs',
      title: 'Motorsport Blog',
      description: 'Latest motorsport news, race recaps, and analysis.',
    },
    {
      path: '/about',
      title: 'About NxtLAP',
      description: 'Learn more about NxtLAP and our mission to track motorsport events.',
    },
    {
      path: '/my-leagues',
      title: 'My Leagues',
      description: 'Track your favorite motorsport leagues and upcoming events.',
    },
  ];
  
  for (const page of pages) {
    const metadata = generatePageMetadata(page);
    const metadataValidation = validateMetadata(metadata);
    
    const combined = combineValidationResults(
      metadataValidation.title,
      metadataValidation.description,
      metadataValidation.openGraph,
      metadataValidation.twitter
    );
    
    logResult({
      page: page.path,
      type: 'Static Page',
      passed: combined.valid,
      errors: combined.errors,
      warnings: combined.warnings,
    });
  }
}

async function main() {
  console.log('🔍 Starting SEO Validation...\n');
  
  try {
    await validateHomepage();
    await validateBlogPosts();
    await validateFAQsPage();
    await validateStaticPages();
    
    // Summary
    console.log('\n\n=== Validation Summary ===');
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
    
    console.log(`Total Pages: ${results.length}`);
    console.log(`Passed: ${passed} ✅`);
    console.log(`Failed: ${failed} ❌`);
    console.log(`Total Errors: ${totalErrors}`);
    console.log(`Total Warnings: ${totalWarnings}`);
    
    if (failed > 0) {
      console.log('\n❌ Validation failed. Please fix the errors above.');
      process.exit(1);
    } else {
      console.log('\n✅ All validations passed!');
      
      if (totalWarnings > 0) {
        console.log(`⚠️  ${totalWarnings} warnings found. Consider addressing them for optimal SEO.`);
      }
    }
  } catch (error) {
    console.error('\n❌ Validation script failed:', error);
    process.exit(1);
  }
}

main();
