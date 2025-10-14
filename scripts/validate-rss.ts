#!/usr/bin/env tsx
/**
 * RSS Feed Validation Script
 * Validates RSS feed structure and content
 * 
 * Usage: npx tsx scripts/validate-rss.ts
 */

import { GET } from '../src/app/rss.xml/route';

interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
}

const issues: ValidationIssue[] = [];

async function validateRSS() {
  console.log('🔍 Validating RSS Feed...\n');
  
  try {
    const response = await GET();
    const rssContent = await response.text();
    
    console.log(`RSS Feed Size: ${(rssContent.length / 1024).toFixed(2)} KB\n`);
    
    // Basic XML validation
    if (!rssContent.startsWith('<?xml version="1.0"')) {
      issues.push({
        type: 'error',
        message: 'RSS feed must start with XML declaration',
      });
    }
    
    // Check RSS version
    if (!rssContent.includes('<rss version="2.0"')) {
      issues.push({
        type: 'error',
        message: 'RSS feed must be version 2.0',
      });
    }
    
    // Check required channel elements
    const requiredChannelElements = [
      '<title>',
      '<description>',
      '<link>',
      '<language>',
    ];
    
    requiredChannelElements.forEach(element => {
      if (!rssContent.includes(element)) {
        issues.push({
          type: 'error',
          message: `Missing required channel element: ${element}`,
        });
      }
    });
    
    // Check for items
    const itemMatches = rssContent.match(/<item>/g);
    const itemCount = itemMatches ? itemMatches.length : 0;
    
    console.log(`Total Items: ${itemCount}\n`);
    
    if (itemCount === 0) {
      issues.push({
        type: 'error',
        message: 'RSS feed has no items',
      });
    }
    
    // Check item elements
    const requiredItemElements = [
      '<title>',
      '<description>',
      '<link>',
      '<guid',
      '<pubDate>',
    ];
    
    // Extract items
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items = [...rssContent.matchAll(itemRegex)];
    
    items.forEach((match, index) => {
      const itemContent = match[1];
      
      requiredItemElements.forEach(element => {
        if (!itemContent.includes(element)) {
          issues.push({
            type: 'error',
            message: `Item ${index + 1}: Missing required element: ${element}`,
          });
        }
      });
      
      // Check for CDATA sections
      if (!itemContent.includes('<![CDATA[')) {
        issues.push({
          type: 'warning',
          message: `Item ${index + 1}: Consider using CDATA sections for title and description`,
        });
      }
      
      // Check for content:encoded
      if (!itemContent.includes('<content:encoded>')) {
        issues.push({
          type: 'warning',
          message: `Item ${index + 1}: Missing content:encoded (full content)`,
        });
      }
    });
    
    // Check namespaces
    if (!rssContent.includes('xmlns:content=')) {
      issues.push({
        type: 'warning',
        message: 'Missing content namespace (xmlns:content)',
      });
    }
    
    if (!rssContent.includes('xmlns:atom=')) {
      issues.push({
        type: 'warning',
        message: 'Missing atom namespace (xmlns:atom)',
      });
    }
    
    // Check for atom:link self-reference
    if (!rssContent.includes('<atom:link') || !rssContent.includes('rel="self"')) {
      issues.push({
        type: 'warning',
        message: 'Missing atom:link self-reference',
      });
    }
    
    // Check URLs
    const urlRegex = /<link>(https?:\/\/[^<]+)<\/link>/g;
    const urls = [...rssContent.matchAll(urlRegex)];
    
    urls.forEach(match => {
      const url = match[1];
      if (!url.startsWith('https://')) {
        issues.push({
          type: 'error',
          message: `URL must use HTTPS: ${url}`,
        });
      }
      if (!url.includes('nxtlap.com')) {
        issues.push({
          type: 'error',
          message: `URL must be on nxtlap.com domain: ${url}`,
        });
      }
    });
    
    // Check dates
    const dateRegex = /<pubDate>([^<]+)<\/pubDate>/g;
    const dates = [...rssContent.matchAll(dateRegex)];
    
    dates.forEach((match, index) => {
      const dateStr = match[1];
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        issues.push({
          type: 'error',
          message: `Invalid date format in item ${index + 1}: ${dateStr}`,
        });
      }
    });
    
    // Display sample
    console.log('=== RSS Feed Sample ===\n');
    const lines = rssContent.split('\n');
    console.log(lines.slice(0, 20).join('\n'));
    console.log('\n... (truncated)\n');
    
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
    console.log(`Total Items: ${itemCount}`);
    console.log(`Feed Size: ${(rssContent.length / 1024).toFixed(2)} KB`);
    console.log(`Errors: ${errors.length}`);
    console.log(`Warnings: ${warnings.length}`);
    
    console.log('\n=== RSS Feed Best Practices ===');
    console.log('✅ Use RSS 2.0 format');
    console.log('✅ Include all required channel elements');
    console.log('✅ Include all required item elements');
    console.log('✅ Use CDATA sections for content');
    console.log('✅ Include full content in content:encoded');
    console.log('✅ Use proper date format (RFC 822)');
    console.log('✅ Include atom:link self-reference');
    console.log('✅ Use HTTPS for all URLs');
    
    console.log('\n=== Test RSS Feed ===');
    console.log('\n1. W3C Feed Validator:');
    console.log('   - Go to: https://validator.w3.org/feed/');
    console.log('   - Enter: https://www.nxtlap.com/rss.xml');
    console.log('   - Click: Check');
    
    console.log('\n2. RSS Feed Readers:');
    console.log('   - Feedly: https://feedly.com/');
    console.log('   - Inoreader: https://www.inoreader.com/');
    console.log('   - NewsBlur: https://newsblur.com/');
    
    console.log('\n3. Browser Test:');
    console.log('   - Open: https://www.nxtlap.com/rss.xml');
    console.log('   - Should display formatted RSS feed');
    
    console.log('\n4. Add RSS Link to Site:');
    console.log('   - Check <head> for:');
    console.log('   - <link rel="alternate" type="application/rss+xml" href="/rss.xml" />');
    
    if (errors.length > 0) {
      console.log('\n❌ RSS feed validation failed. Please fix the errors above.');
      process.exit(1);
    } else {
      console.log('\n✅ RSS feed validation passed!');
      if (warnings.length > 0) {
        console.log(`⚠️  ${warnings.length} warnings found. Consider addressing them.`);
      }
    }
  } catch (error) {
    console.error('\n❌ RSS feed validation failed:', error);
    process.exit(1);
  }
}

validateRSS();
