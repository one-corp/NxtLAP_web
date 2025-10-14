# NxtLAP.com Repository

This repository hosts the source code and related files for the official website, **nxtlap.com** - your premier destination for tracking upcoming motorsports events with AI-powered insights.

## Overview

NxtLAP is a Next.js 15-based motorsports platform that provides comprehensive coverage of racing events, leagues, and news. The site is built with modern web technologies and optimized for search engines, performance, and accessibility.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Content:** MDX for blog posts
- **Analytics:** Vercel Analytics
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nxtlap.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run validate:seo` - Validate structured data and SEO implementation
- `npm run validate:sitemap` - Validate sitemap.xml
- `npm run validate:rss` - Validate RSS feed
- `npm run test:meta-tags` - Test meta tags on all pages

## Project Structure

```
nxtlap/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── blogs/        # Blog listing and individual posts
│   │   ├── faqs/         # FAQ page
│   │   ├── my-leagues/   # User leagues page
│   │   ├── rss.xml/      # RSS feed route
│   │   ├── layout.tsx    # Root layout with metadata
│   │   ├── page.tsx      # Homepage
│   │   └── sitemap.ts    # Dynamic sitemap generation
│   ├── components/       # React components
│   │   ├── ui/           # Radix UI components
│   │   ├── StructuredData.tsx
│   │   ├── RelatedPosts.tsx
│   │   └── ...
│   ├── lib/              # Utility functions
│   │   ├── seo/          # SEO utilities
│   │   │   ├── index.ts
│   │   │   ├── metadata.ts
│   │   │   ├── structured-data.ts
│   │   │   └── validation.ts
│   │   ├── blogs.ts      # Blog post utilities
│   │   └── utils.ts
│   ├── posts/            # MDX blog posts
│   ├── Data/             # Static data (FAQs, Leagues, etc.)
│   ├── config/           # Site configuration
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── scripts/              # Validation and testing scripts
└── .kiro/                # Kiro specs and documentation
```

## SEO Features

NxtLAP is built with comprehensive SEO optimization to maximize search engine visibility and organic traffic.

### Core SEO Features

#### 1. Structured Data (JSON-LD)

All pages include rich structured data for enhanced search results:

- **Blog Posts:** Article schema with author, publisher, dates, and images
- **Homepage:** Organization and WebSite schema with search functionality
- **FAQs:** FAQPage schema for rich FAQ snippets
- **Events:** SportsEvent schema for race events
- **Breadcrumbs:** BreadcrumbList schema for navigation

Structured data is automatically generated and validated. Test with:
```bash
npm run validate:seo
```

#### 2. Meta Tags & Open Graph

Every page includes optimized meta tags:

- Unique title tags (under 60 characters)
- Compelling meta descriptions (150-160 characters)
- Open Graph tags for social media sharing
- Twitter Card tags with large images
- Canonical URLs to prevent duplicate content
- Article-specific tags (published time, author, etc.)

Test meta tags with:
```bash
npm run test:meta-tags
```

#### 3. Dynamic Sitemap

The sitemap is automatically generated with:

- Accurate `lastModified` dates from file system
- Priority values (homepage: 1.0, blogs: 0.8, pages: 0.6)
- Change frequency indicators
- All blog posts and static pages

Access at: `https://www.nxtlap.com/sitemap.xml`

Validate with:
```bash
npm run validate:sitemap
```

#### 4. RSS Feed

Full-featured RSS 2.0 feed for blog content:

- Complete post content
- Featured images as enclosures
- Publication dates
- Author information
- Automatic updates with new posts

Access at: `https://www.nxtlap.com/rss.xml`

Validate with:
```bash
npm run validate:rss
```

#### 5. Internal Linking

Automated internal linking strategy:

- Related posts component on blog pages
- Contextual links within content
- League page references
- Breadcrumb navigation

#### 6. Image Optimization

All images are optimized for SEO:

- Next.js Image component for automatic optimization
- Descriptive alt text with keywords
- Lazy loading for performance
- WebP format with fallbacks
- Proper sizing and responsive images

#### 7. Performance Optimization

Built for Core Web Vitals:

- Server-side rendering (SSR)
- Static generation for blog posts
- Optimized font loading
- Code splitting
- Lazy loading for non-critical content

#### 8. Accessibility

WCAG AA compliant:

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- ARIA labels where needed
- Color contrast ratios (4.5:1+)

### SEO Utilities

The `src/lib/seo/` directory contains reusable SEO utilities:

```typescript
// Generate metadata for any page
import { generateBlogMetadata, generatePageMetadata } from '@/lib/seo/metadata';

// Build structured data schemas
import { 
  buildArticleSchema, 
  buildOrganizationSchema,
  buildFAQSchema 
} from '@/lib/seo/structured-data';

// Validate SEO implementation
import { validateMetadata, validateSchema } from '@/lib/seo/validation';
```

## Writing Blog Posts

Blog posts are written in MDX format and stored in `src/posts/`. Each post must include comprehensive frontmatter for SEO optimization.

### Blog Post Template

Create new posts using the template at `src/posts/_template.mdx`:

```bash
cp src/posts/_template.mdx src/posts/your-post-slug.mdx
```

### Required Frontmatter

```yaml
---
title: "Your SEO-Optimized Title (Under 60 Characters)"
description: "Compelling meta description that includes primary keyword and call-to-action (150-160 characters)"
date: "2025-10-14"
tags: ["Formula 1", "Race Name", "F1 2025", "Category"]
author: "Author Name"
featuredImage: "/path/to/image.jpg"
keywords:
  - "Primary keyword phrase"
  - "Secondary keyword phrase"
  - "Long-tail keyword"
  - "Location-based keyword"
---
```

### Frontmatter Field Guide

| Field | Required | Description | SEO Impact |
|-------|----------|-------------|------------|
| `title` | Yes | Page title and H1 heading | Critical - appears in search results |
| `description` | Yes | Meta description | Critical - influences click-through rate |
| `date` | Yes | Publication date (YYYY-MM-DD) | Used in Article schema and sorting |
| `tags` | Yes | Content categories | Used for related posts and organization |
| `author` | Yes | Author name | Appears in Article schema |
| `featuredImage` | Yes | Path to featured image | Used in Open Graph and Twitter Cards |
| `keywords` | Yes | 4-6 target keywords | Used for SEO optimization and related posts |

### SEO Best Practices for Blog Posts

#### Title Optimization

- Keep under 60 characters
- Include primary keyword near the beginning
- Make it compelling and click-worthy
- Use numbers, years, or power words when relevant
- Examples:
  - ✅ "2025 Singapore GP — Race Recap, Results & Standings"
  - ✅ "Dutch Grand Prix 2025: Piastri's Dominant Victory"
  - ❌ "Race Report" (too vague)
  - ❌ "The Complete and Comprehensive Guide to Everything About the Singapore Grand Prix" (too long)

#### Description Optimization

- Keep between 150-160 characters
- Include primary keyword naturally
- Add a call-to-action or value proposition
- Make it compelling to encourage clicks
- Examples:
  - ✅ "Detailed report and analysis of the 2025 Singapore Grand Prix: qualifying drama, race results, full standings, and what the outcome means for the championship."
  - ❌ "This is a blog post about the race." (too short, not compelling)

#### Keyword Selection

Choose 4-6 keywords that include:

1. **Primary keyword:** Main topic with good search volume
   - Example: "Singapore Grand Prix 2025"

2. **Secondary keywords:** Related terms
   - Example: "Marina Bay race results"

3. **Long-tail keywords:** Specific phrases with lower competition
   - Example: "George Russell Singapore victory"

4. **Location-based keywords:** Geographic terms
   - Example: "Marina Bay Street Circuit"

Use tools like Google Keyword Planner, Ahrefs, or SEMrush to research keywords.

#### Content Structure

Use proper heading hierarchy:

```markdown
# Main Title (H1) - Automatically generated from frontmatter title

## Introduction (H2)

Brief overview with primary keyword in first paragraph.

## Section Title (H2)

### Subsection (H3)

Content with natural keyword usage.

## Conclusion (H2)

Summary with internal links to related content.
```

#### Internal Linking

Add 2-3 internal links per post:

```markdown
After the drama at [Zandvoort](/blogs/dutch-gp-2025) and [Spa](/blogs/BelgianGP), 
Singapore added another memorable chapter to the season.

For more race recaps and motorsport analysis, explore our [complete racing coverage](/blogs).
```

#### Image Optimization

Use descriptive filenames and alt text:

```markdown
![George Russell celebrates his Singapore GP victory on the podium](singapore-gp-2025-russell-podium.jpg)
```

- Filename: `singapore-gp-2025-russell-podium.jpg` (includes keywords)
- Alt text: Descriptive and includes relevant keywords
- Format: Use JPG for photos, PNG for graphics
- Size: Optimize before upload (under 500KB)

#### Content Length

Aim for comprehensive coverage:

- Minimum: 800 words
- Optimal: 1,500-2,500 words
- Include data tables, lists, and structured information
- Break up long paragraphs for readability

#### Keyword Density

- Use primary keyword 3-5 times naturally
- Include in: title, first paragraph, one H2, conclusion
- Don't force keywords - write naturally
- Use synonyms and related terms

## Deployment

### Vercel Deployment

The site is automatically deployed to Vercel on every push to the main branch.

1. **Push to main branch:**
   ```bash
   git push origin main
   ```

2. **Vercel automatically:**
   - Builds the site
   - Runs type checking
   - Deploys to production
   - Updates preview URLs

### Post-Deployment Checklist

After deploying SEO changes:

- [ ] Verify sitemap is accessible: `https://www.nxtlap.com/sitemap.xml`
- [ ] Verify RSS feed is accessible: `https://www.nxtlap.com/rss.xml`
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test meta tags with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Run Lighthouse audit on key pages
- [ ] Check Google Search Console for crawl errors
- [ ] Submit updated sitemap to Google Search Console

### Google Search Console Setup

1. **Verify ownership:**
   - Add HTML meta tag to `src/app/layout.tsx`
   - Or upload verification file to `public/`

2. **Submit sitemap:**
   - Go to Sitemaps section
   - Submit: `https://www.nxtlap.com/sitemap.xml`

3. **Monitor performance:**
   - Check indexing status
   - Review search queries
   - Monitor Core Web Vitals
   - Fix any coverage issues

### Monitoring

Track SEO performance with:

- **Google Search Console:** Impressions, clicks, CTR, position
- **Google Analytics 4:** Traffic sources, user behavior
- **Vercel Analytics:** Performance metrics, Core Web Vitals
- **Lighthouse CI:** Automated performance audits

## Contributing

### Adding New Blog Posts

1. Create new MDX file in `src/posts/`
2. Use the template: `cp src/posts/_template.mdx src/posts/your-slug.mdx`
3. Fill in all frontmatter fields
4. Write content following SEO best practices
5. Add internal links to related posts
6. Optimize images before adding
7. Test locally: `npm run dev`
8. Validate SEO: `npm run validate:seo`
9. Commit and push

### Adding New Pages

1. Create page in `src/app/`
2. Generate metadata using `generatePageMetadata()`
3. Add structured data if applicable
4. Update sitemap if needed
5. Test and validate

## Troubleshooting

### Common Issues

**Sitemap not updating:**
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`

**Structured data errors:**
- Run validation: `npm run validate:seo`
- Check schema syntax in browser console
- Test with Google Rich Results Test

**Meta tags not appearing:**
- Check metadata export in page files
- Verify no duplicate meta tags
- Clear browser cache

**RSS feed not updating:**
- Check blog post frontmatter
- Verify date format (YYYY-MM-DD)
- Clear build cache

## Resources

### SEO Tools

- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema.org Documentation](https://schema.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Documentation

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

This project is proprietary and confidential.

---

**For more information, visit [nxtlap.com](https://www.nxtlap.com)**
