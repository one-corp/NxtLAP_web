#!/usr/bin/env tsx
/**
 * Sitemap Validation Script
 * Validates sitemap.xml structure and content
 * 
 * Usage: npx tsx scripts/validate-sitemap.ts
 */

import sitemap from '../src/app/sitemap';

interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
}

const issues: ValidationIssue[] = [];

async function validateSitemap() {
  console.log('🔍 Validating Sitemap...\n');
  
  try {
    const entries = await sitemap();
    
    console.log(`Total URLs: ${entries.length}\n`);
    
    // Check for required fields
    entries.forEach((entry, index) => {
      if (!entry.url) {
        issues.push({
          type: 'error',
          message: `Entry ${index}: Missing URL`,
        });
      } else {
        // Validate URL format
        try {
          const url = new URL(entry.url);
          if (url.protocol !== 'https:') {
            issues.push({
              type: 'error',
              message: `Entry ${index}: URL must use HTTPS: ${entry.url}`,
            });
          }
          if (!url.hostname.includes('nxtlap.com')) {
            issues.push({
              type: 'error',
              message: `Entry ${index}: URL must be on nxtlap.com domain: ${entry.url}`,
            });
          }
        } catch (e) {
          issues.push({
            type: 'error',
            message: `Entry ${index}: Invalid URL format: ${entry.url}`,
          });
        }
      }
      
      if (!entry.lastModified) {
        issues.push({
          type: 'warning',
          message: `Entry ${index} (${entry.url}): Missing lastModified`,
        });
      } else {
        // Validate date
        const date = new Date(entry.lastModified);
        if (isNaN(date.getTime())) {
          issues.push({
            type: 'error',
            message: `Entry ${index} (${entry.url}): Invalid lastModified date`,
          });
        }
        // Check if date is in the future
        if (date > new Date()) {
          issues.push({
            type: 'warning',
            message: `Entry ${index} (${entry.url}): lastModified is in the future`,
          });
        }
      }
      
      if (!entry.changeFrequency) {
        issues.push({
          type: 'warning',
          message: `Entry ${index} (${entry.url}): Missing changeFrequency`,
        });
      } else {
        const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
        if (!validFrequencies.includes(entry.changeFrequency)) {
          issues.push({
            type: 'error',
            message: `Entry ${index} (${entry.url}): Invalid changeFrequency: ${entry.changeFrequency}`,
          });
        }
      }
      
      if (entry.priority === undefined) {
        issues.push({
          type: 'warning',
          message: `Entry ${index} (${entry.url}): Missing priority`,
        });
      } else {
        if (entry.priority < 0 || entry.priority > 1) {
          issues.push({
            type: 'error',
            message: `Entry ${index} (${entry.url}): Priority must be between 0 and 1: ${entry.priority}`,
          });
        }
      }
    });
    
    // Check for duplicate URLs
    const urls = entries.map(e => e.url);
    const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);
    if (duplicates.length > 0) {
      duplicates.forEach(url => {
        issues.push({
          type: 'error',
          message: `Duplicate URL found: ${url}`,
        });
      });
    }
    
    // Check priority distribution
    const homepage = entries.find(e => e.url.endsWith('nxtlap.com/'));
    if (homepage && homepage.priority !== 1.0) {
      issues.push({
        type: 'warning',
        message: `Homepage priority should be 1.0, found: ${homepage.priority}`,
      });
    }
    
    // Display entries
    console.log('=== Sitemap Entries ===\n');
    entries.forEach(entry => {
      console.log(`URL: ${entry.url}`);
      console.log(`  Last Modified: ${entry.lastModified}`);
      console.log(`  Change Frequency: ${entry.changeFrequency}`);
      console.log(`  Priority: ${entry.priority}`);
      console.log('');
    });
    
    // Display issues
    const errors = issues.filter(i => i.type === 'error');
    const warnings = issues.filter(i => i.type === 'warning');
    
    if (errors.length > 0) {
      console.log('\n❌ Errors:\n');
      errors.forEach(issue => console.log(`  - ${issue.message}`));
    }
    
    if (warnings.length > 0) {
      console.log('\n⚠️  Warnings:\n');
      warnings.forEach(issue => console.log(`  - ${issue.message}`));
    }
    
    // Summary
    console.log('\n=== Validation Summary ===');
    console.log(`Total URLs: ${entries.length}`);
    console.log(`Errors: ${errors.length}`);
    console.log(`Warnings: ${warnings.length}`);
    
    // Priority distribution
    const priorityDistribution = entries.reduce((acc, entry) => {
      const priority = entry.priority || 0;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    console.log('\nPriority Distribution:');
    Object.entries(priorityDistribution)
      .sort(([a], [b]) => Number(b) - Number(a))
      .forEach(([priority, count]) => {
        console.log(`  ${priority}: ${count} URLs`);
      });
    
    // Change frequency distribution
    const frequencyDistribution = entries.reduce((acc, entry) => {
      const freq = entry.changeFrequency || 'unknown';
      acc[freq] = (acc[freq] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\nChange Frequency Distribution:');
    Object.entries(frequencyDistribution)
      .sort(([, a], [, b]) => b - a)
      .forEach(([freq, count]) => {
        console.log(`  ${freq}: ${count} URLs`);
      });
    
    console.log('\n=== Sitemap Best Practices ===');
    console.log('✅ Use HTTPS for all URLs');
    console.log('✅ Include lastModified dates');
    console.log('✅ Set appropriate priorities (homepage: 1.0, important pages: 0.8-0.9)');
    console.log('✅ Set realistic changeFrequency values');
    console.log('✅ Keep sitemap under 50,000 URLs');
    console.log('✅ Keep sitemap file size under 50MB');
    
    console.log('\n=== Submit Sitemap to Search Engines ===');
    console.log('\n1. Google Search Console:');
    console.log('   - Go to: https://search.google.com/search-console');
    console.log('   - Navigate to: Sitemaps');
    console.log('   - Submit: https://www.nxtlap.com/sitemap.xml');
    
    console.log('\n2. Bing Webmaster Tools:');
    console.log('   - Go to: https://www.bing.com/webmasters');
    console.log('   - Navigate to: Sitemaps');
    console.log('   - Submit: https://www.nxtlap.com/sitemap.xml');
    
    console.log('\n3. Verify robots.txt:');
    console.log('   - Check: https://www.nxtlap.com/robots.txt');
    console.log('   - Should contain: Sitemap: https://www.nxtlap.com/sitemap.xml');
    
    if (errors.length > 0) {
      console.log('\n❌ Sitemap validation failed. Please fix the errors above.');
      process.exit(1);
    } else {
      console.log('\n✅ Sitemap validation passed!');
      if (warnings.length > 0) {
        console.log(`⚠️  ${warnings.length} warnings found. Consider addressing them.`);
      }
    }
  } catch (error) {
    console.error('\n❌ Sitemap validation failed:', error);
    process.exit(1);
  }
}

validateSitemap();
