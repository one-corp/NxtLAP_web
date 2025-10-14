/**
 * StructuredData Component
 * Injects JSON-LD structured data into the page for SEO
 * 
 * Note: In Next.js App Router, we render script tags directly (not using next/script)
 * because JSON-LD is data, not executable JavaScript
 */

import {
  ArticleSchema,
  OrganizationSchema,
  FAQSchema,
  BreadcrumbSchema,
  WebSiteSchema,
  SportsEventSchema,
} from '@/lib/seo/structured-data';

type StructuredDataSchema =
  | ArticleSchema
  | OrganizationSchema
  | FAQSchema
  | BreadcrumbSchema
  | WebSiteSchema
  | SportsEventSchema;

interface StructuredDataProps {
  data: StructuredDataSchema | StructuredDataSchema[];
}

/**
 * StructuredData component that injects JSON-LD scripts into the page
 * Supports single schema or array of schemas
 * 
 * @example
 * // Single schema
 * <StructuredData data={buildArticleSchema(post)} />
 * 
 * @example
 * // Multiple schemas
 * <StructuredData data={[
 *   buildOrganizationSchema(),
 *   buildWebSiteSchema()
 * ]} />
 */
export function StructuredData({ data }: StructuredDataProps) {
  // Handle both single schema and array of schemas
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
