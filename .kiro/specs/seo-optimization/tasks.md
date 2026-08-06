# Implementation Plan

- [x] 1. Set up SEO infrastructure and configuration
  - Create site configuration file with all SEO constants (site name, URL, social links, default keywords)
  - Create SEO utilities directory structure (`src/lib/seo/`)
  - _Requirements: 2.1, 2.6, 13.1_

- [x] 2. Implement core SEO metadata generation
  - [x] 2.1 Create metadata generator utility
    - Build `generateBlogMetadata()` function that creates complete metadata objects from post frontmatter
    - Build `generatePageMetadata()` function for static pages
    - Implement fallback logic for missing metadata fields
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 13.2, 13.4_
  
  - [x] 2.2 Update blog post pages to use metadata generator
    - Modify `src/app/blogs/[slug]/page.tsx` to use new metadata generator
    - Add canonical URLs to blog posts
    - Add article:published_time and article:author tags
    - _Requirements: 2.5, 2.6, 9.4_
  
  - [x] 2.3 Update static pages metadata
    - Update homepage metadata with proper keywords
    - Update blogs listing page metadata
    - Update FAQs page metadata
    - Update about page metadata
    - _Requirements: 2.1, 2.2, 2.6_

- [x] 3. Implement structured data (JSON-LD)
  - [x] 3.1 Create structured data builder utilities
    - Build `buildArticleSchema()` for blog posts
    - Build `buildOrganizationSchema()` for homepage
    - Build `buildFAQSchema()` for FAQs page
    - Build `buildBreadcrumbSchema()` for navigation
    - Build `buildWebSiteSchema()` with SearchAction
    - _Requirements: 1.1, 1.2, 7.1, 7.3, 7.5_
  
  - [x] 3.2 Create StructuredData React component
    - Build reusable component that injects JSON-LD scripts
    - Add proper script type and formatting
    - _Requirements: 1.1, 1.6_
  
  - [x] 3.3 Add structured data to blog posts
    - Integrate Article schema in blog post pages
    - Include author, publisher, and image data
    - Add dateModified field support
    - _Requirements: 1.1, 9.4_
  
  - [x] 3.4 Add structured data to homepage
    - Add Organization schema
    - Add WebSite schema with search functionality
    - _Requirements: 1.2, 7.5_
  
  - [x] 3.5 Add structured data to FAQs page
    - Transform FAQ data into FAQPage schema
    - Ensure all questions and answers are included
    - _Requirements: 7.1_

- [x] 4. Enhance blog library with SEO features
  - [x] 4.1 Add file modification time tracking
    - Implement `getFileModifiedTime()` function using fs.stat
    - Update `PostMeta` type to include `lastModified` field
    - Modify blog post retrieval to include modification times
    - _Requirements: 4.1, 9.3_
  
  - [x] 4.2 Add keyword extraction functionality
    - Implement `extractKeywords()` function for automatic keyword detection
    - Update blog library to use keywords from frontmatter or extract them
    - _Requirements: 13.1, 13.3_
  
  - [x] 4.3 Implement related posts algorithm
    - Build `getRelatedPosts()` function based on tags and keywords
    - Return top 3-4 most relevant posts
    - _Requirements: 10.1, 10.4_
  
  - [x] 4.4 Update PostMeta type definition
    - Add `keywords`, `author`, `featuredImage`, and `lastModified` fields
    - Update all blog processing functions to handle new fields
    - _Requirements: 9.1, 13.5_

- [x] 5. Create related posts component for internal linking
  - Build RelatedPosts component that displays related blog posts
  - Integrate component at the end of blog post pages
  - Style component to match existing design
  - Add internal links to related posts
  - _Requirements: 10.1, 10.4_

- [x] 6. Update and optimize sitemap generation
  - [x] 6.1 Enhance sitemap with accurate modification times
    - Update `src/app/sitemap.ts` to use actual file modification times
    - Implement proper priority values (homepage: 1.0, blogs: 0.8)
    - Set appropriate changeFrequency values
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [x] 6.2 Ensure sitemap includes all pages
    - Verify all blog posts are included
    - Verify all static pages are included
    - Test sitemap validity
    - _Requirements: 4.4, 4.5_

- [x] 7. Fix and optimize robots.txt
  - Update sitemap URL from motorsportsai.in to nxtlap.com
  - Add disallow rules for /api/, /_next/, and other non-public paths
  - Ensure all major search engines are allowed
  - _Requirements: 5.1, 5.2, 5.4_

- [x] 8. Implement RSS feed generation
  - [x] 8.1 Create RSS feed route handler
    - Create `src/app/rss.xml/route.ts` with GET handler
    - Build RSS 2.0 XML structure
    - Include all blog posts with full content
    - Add featured images as enclosures
    - _Requirements: 11.1, 11.2, 11.3, 11.5_
  
  - [x] 8.2 Add RSS link to site layout
    - Add `<link rel="alternate" type="application/rss+xml">` to layout head
    - _Requirements: 11.4_

- [x] 9. Optimize images for SEO
  - [x] 9.1 Audit existing images
    - Check all images use Next.js Image component
    - Verify images have descriptive alt text
    - _Requirements: 3.3, 6.1, 12.1_
  
  - [x] 9.2 Update blog post images
    - Ensure all blog post images have keyword-rich alt text
    - Add lazy loading where appropriate
    - _Requirements: 3.3, 3.6, 13.9_

- [x] 10. Implement content optimization features
  - [x] 10.1 Update blog post content structure
    - Ensure proper heading hierarchy (H1 → H2 → H3)
    - Verify primary keywords in H1 tags
    - Add semantic HTML structure
    - _Requirements: 3.1, 3.2, 12.3, 13.2_
  
  - [x] 10.2 Add internal linking to existing posts
    - Review existing blog posts for internal linking opportunities
    - Add contextual links to related content
    - Link race mentions to league pages
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 11. Create SEO-optimized blog post template
  - Create `src/posts/_template.mdx` with complete frontmatter structure
  - Add comments explaining each SEO field
  - Include examples of proper heading hierarchy
  - Add internal linking examples
  - Add image with alt text examples
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

- [x] 12. Implement accessibility improvements
  - [x] 12.1 Audit and fix navigation accessibility
    - Ensure keyboard navigation works properly
    - Add proper focus indicators
    - Add ARIA labels where needed
    - _Requirements: 12.2, 12.6_
  
  - [x] 12.2 Verify color contrast ratios
    - Check all text meets WCAG AA standards (4.5:1)
    - Fix any contrast issues
    - _Requirements: 12.5_

- [x] 13. Optimize page performance
  - [x] 13.1 Optimize font loading
    - Verify font-display: swap is set
    - Check for render-blocking fonts
    - _Requirements: 6.3_
  
  - [x] 13.2 Optimize JavaScript loading
    - Ensure non-critical scripts are deferred
    - Check for unnecessary JavaScript
    - _Requirements: 6.4_
  
  - [x] 13.3 Verify image optimization
    - Confirm WebP format usage
    - Check image sizing and lazy loading
    - _Requirements: 6.1, 6.5_

- [-] 14. Testing and validation
  - [x] 14.1 Validate structured data
    - Test all pages with Google Rich Results Test
    - Fix any schema validation errors
    - _Requirements: 1.6_
  
  - [x] 14.2 Test meta tags
    - Verify Open Graph tags with Facebook Debugger
    - Test Twitter Cards with Twitter Card Validator
    - Check all pages have unique titles and descriptions
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [x] 14.3 Validate sitemap and RSS feed
    - Test sitemap.xml validity
    - Test RSS feed validity
    - Submit sitemap to Google Search Console
    - _Requirements: 4.5, 11.1_
  
  - [x] 14.4 Run performance audits
    - Run Lighthouse audit on key pages
    - Check Core Web Vitals scores
    - Fix any performance issues
    - _Requirements: 6.6_
  
  - [x] 14.5 Accessibility testing
    - Run WAVE accessibility checker
    - Test keyboard navigation
    - Verify screen reader compatibility
    - _Requirements: 12.1, 12.2, 12.3_

- [x] 15. Documentation and deployment
  - Update README with SEO features documentation
  - Document blog post frontmatter requirements
  - Create guide for writing SEO-optimized content
  - Deploy changes and monitor Search Console
  - _Requirements: All_
