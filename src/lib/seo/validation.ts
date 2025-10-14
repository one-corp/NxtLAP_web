/**
 * SEO Validation Utilities
 * Validate structured data, metadata, and other SEO elements
 */

import { ArticleSchema, OrganizationSchema, FAQSchema, BreadcrumbSchema, WebSiteSchema, SportsEventSchema } from './structured-data';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate Article Schema
 */
export function validateArticleSchema(schema: ArticleSchema): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }
  if (!schema['@type'] || !['Article', 'BlogPosting'].includes(schema['@type'])) {
    errors.push('Missing or invalid @type (must be Article or BlogPosting)');
  }
  if (!schema.headline || schema.headline.trim() === '') {
    errors.push('Missing headline');
  }
  if (!schema.datePublished) {
    errors.push('Missing datePublished');
  }
  if (!schema.author || !schema.author.name) {
    errors.push('Missing author or author.name');
  }
  if (!schema.publisher || !schema.publisher.name) {
    errors.push('Missing publisher or publisher.name');
  }
  if (!schema.publisher?.logo?.url) {
    errors.push('Missing publisher logo URL');
  }
  if (!schema.image) {
    errors.push('Missing image');
  }

  // Warnings for optional but recommended fields
  if (!schema.description) {
    warnings.push('Missing description (recommended)');
  }
  if (!schema.dateModified) {
    warnings.push('Missing dateModified (recommended)');
  }
  if (!schema.keywords || schema.keywords.length === 0) {
    warnings.push('Missing keywords (recommended)');
  }

  // Validate date formats
  if (schema.datePublished && isNaN(Date.parse(schema.datePublished))) {
    errors.push('Invalid datePublished format');
  }
  if (schema.dateModified && isNaN(Date.parse(schema.dateModified))) {
    errors.push('Invalid dateModified format');
  }

  // Validate URLs
  if (schema.image && typeof schema.image === 'string' && !isValidUrl(schema.image)) {
    errors.push('Invalid image URL');
  }
  if (schema.mainEntityOfPage?.['@id'] && !isValidUrl(schema.mainEntityOfPage['@id'])) {
    errors.push('Invalid mainEntityOfPage @id URL');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate Organization Schema
 */
export function validateOrganizationSchema(schema: OrganizationSchema): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }
  if (!schema['@type'] || schema['@type'] !== 'Organization') {
    errors.push('Missing or invalid @type (must be Organization)');
  }
  if (!schema.name || schema.name.trim() === '') {
    errors.push('Missing name');
  }
  if (!schema.url || !isValidUrl(schema.url)) {
    errors.push('Missing or invalid URL');
  }

  // Warnings
  if (!schema.logo || !isValidUrl(schema.logo)) {
    warnings.push('Missing or invalid logo URL (recommended)');
  }
  if (!schema.sameAs || schema.sameAs.length === 0) {
    warnings.push('Missing sameAs social media links (recommended)');
  }
  if (!schema.description) {
    warnings.push('Missing description (recommended)');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate FAQ Schema
 */
export function validateFAQSchema(schema: FAQSchema): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }
  if (!schema['@type'] || schema['@type'] !== 'FAQPage') {
    errors.push('Missing or invalid @type (must be FAQPage)');
  }
  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    errors.push('Missing or invalid mainEntity (must be array)');
  } else {
    if (schema.mainEntity.length === 0) {
      errors.push('mainEntity array is empty');
    }
    
    schema.mainEntity.forEach((item, index) => {
      if (!item['@type'] || item['@type'] !== 'Question') {
        errors.push(`Item ${index}: Missing or invalid @type (must be Question)`);
      }
      if (!item.name || item.name.trim() === '') {
        errors.push(`Item ${index}: Missing question name`);
      }
      if (!item.acceptedAnswer || !item.acceptedAnswer.text) {
        errors.push(`Item ${index}: Missing acceptedAnswer or answer text`);
      }
      if (item.acceptedAnswer?.['@type'] !== 'Answer') {
        errors.push(`Item ${index}: Invalid acceptedAnswer @type (must be Answer)`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate WebSite Schema
 */
export function validateWebSiteSchema(schema: WebSiteSchema): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }
  if (!schema['@type'] || schema['@type'] !== 'WebSite') {
    errors.push('Missing or invalid @type (must be WebSite)');
  }
  if (!schema.name || schema.name.trim() === '') {
    errors.push('Missing name');
  }
  if (!schema.url || !isValidUrl(schema.url)) {
    errors.push('Missing or invalid URL');
  }

  // Validate SearchAction if present
  if (schema.potentialAction) {
    if (schema.potentialAction['@type'] !== 'SearchAction') {
      errors.push('Invalid potentialAction @type (must be SearchAction)');
    }
    if (!schema.potentialAction.target?.urlTemplate) {
      errors.push('Missing SearchAction target urlTemplate');
    }
    if (!schema.potentialAction['query-input']) {
      errors.push('Missing SearchAction query-input');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate SportsEvent Schema
 */
export function validateSportsEventSchema(schema: SportsEventSchema): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }
  if (!schema['@type'] || schema['@type'] !== 'SportsEvent') {
    errors.push('Missing or invalid @type (must be SportsEvent)');
  }
  if (!schema.name || schema.name.trim() === '') {
    errors.push('Missing name');
  }
  if (!schema.startDate) {
    errors.push('Missing startDate');
  } else if (isNaN(Date.parse(schema.startDate))) {
    errors.push('Invalid startDate format');
  }
  if (!schema.location || !schema.location.name) {
    errors.push('Missing location or location name');
  }
  if (!schema.organizer || !schema.organizer.name) {
    errors.push('Missing organizer or organizer name');
  }

  // Warnings
  if (!schema.image) {
    warnings.push('Missing image (recommended)');
  }
  if (!schema.endDate) {
    warnings.push('Missing endDate (recommended)');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate Breadcrumb Schema
 */
export function validateBreadcrumbSchema(schema: BreadcrumbSchema): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context');
  }
  if (!schema['@type'] || schema['@type'] !== 'BreadcrumbList') {
    errors.push('Missing or invalid @type (must be BreadcrumbList)');
  }
  if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
    errors.push('Missing or invalid itemListElement (must be array)');
  } else {
    if (schema.itemListElement.length === 0) {
      errors.push('itemListElement array is empty');
    }
    
    schema.itemListElement.forEach((item, index) => {
      if (!item['@type'] || item['@type'] !== 'ListItem') {
        errors.push(`Item ${index}: Missing or invalid @type (must be ListItem)`);
      }
      if (typeof item.position !== 'number' || item.position < 1) {
        errors.push(`Item ${index}: Missing or invalid position (must be number >= 1)`);
      }
      if (!item.name || item.name.trim() === '') {
        errors.push(`Item ${index}: Missing name`);
      }
      // Last item doesn't need URL
      if (index < schema.itemListElement.length - 1 && item.item && !isValidUrl(item.item)) {
        warnings.push(`Item ${index}: Invalid item URL`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Helper function to validate URLs
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate metadata completeness
 */
export interface MetadataValidation {
  title: ValidationResult;
  description: ValidationResult;
  openGraph: ValidationResult;
  twitter: ValidationResult;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateMetadata(metadata: any): MetadataValidation {
  const titleResult: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  const descriptionResult: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  const openGraphResult: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  const twitterResult: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  // Validate title
  // Handle both string and TemplateString from Next.js Metadata
  const titleValue = typeof metadata.title === 'string' 
    ? metadata.title 
    : metadata.title?.default || metadata.title?.absolute;
    
  if (!titleValue || titleValue === null) {
    titleResult.valid = false;
    titleResult.errors.push('Missing title');
  } else if (typeof titleValue === 'string') {
    if (titleValue.length > 60) {
      titleResult.warnings.push(`Title is ${titleValue.length} characters (recommended: under 60)`);
    }
    if (titleValue.length < 30) {
      titleResult.warnings.push(`Title is ${titleValue.length} characters (recommended: 30-60)`);
    }
  }

  // Validate description
  if (!metadata.description || metadata.description === null) {
    descriptionResult.valid = false;
    descriptionResult.errors.push('Missing description');
  } else if (typeof metadata.description === 'string') {
    if (metadata.description.length > 160) {
      descriptionResult.warnings.push(`Description is ${metadata.description.length} characters (recommended: 150-160)`);
    }
    if (metadata.description.length < 120) {
      descriptionResult.warnings.push(`Description is ${metadata.description.length} characters (recommended: 150-160)`);
    }
  }

  // Validate Open Graph
  if (!metadata.openGraph || metadata.openGraph === null) {
    openGraphResult.valid = false;
    openGraphResult.errors.push('Missing Open Graph metadata');
  } else {
    if (!metadata.openGraph.title || metadata.openGraph.title === null) {
      openGraphResult.errors.push('Missing og:title');
      openGraphResult.valid = false;
    }
    if (!metadata.openGraph.description || metadata.openGraph.description === null) {
      openGraphResult.errors.push('Missing og:description');
      openGraphResult.valid = false;
    }
    if (!metadata.openGraph.images || metadata.openGraph.images.length === 0) {
      openGraphResult.errors.push('Missing og:image');
      openGraphResult.valid = false;
    }
    if (!metadata.openGraph.url || metadata.openGraph.url === null) {
      openGraphResult.warnings.push('Missing og:url (recommended)');
    }
  }

  // Validate Twitter Card
  if (!metadata.twitter || metadata.twitter === null) {
    twitterResult.valid = false;
    twitterResult.errors.push('Missing Twitter Card metadata');
  } else {
    if (!metadata.twitter.card) {
      twitterResult.errors.push('Missing twitter:card');
      twitterResult.valid = false;
    }
    if (!metadata.twitter.title || metadata.twitter.title === null) {
      twitterResult.errors.push('Missing twitter:title');
      twitterResult.valid = false;
    }
    if (!metadata.twitter.description || metadata.twitter.description === null) {
      twitterResult.errors.push('Missing twitter:description');
      twitterResult.valid = false;
    }
    if (!metadata.twitter.images || metadata.twitter.images.length === 0) {
      twitterResult.errors.push('Missing twitter:image');
      twitterResult.valid = false;
    }
  }

  return {
    title: titleResult,
    description: descriptionResult,
    openGraph: openGraphResult,
    twitter: twitterResult,
  };
}
