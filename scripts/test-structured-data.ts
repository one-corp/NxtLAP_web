import { buildOrganizationSchema, buildWebSiteSchema } from '../src/lib/seo/structured-data';

// Simple sanity check of our schema builders
console.log('Testing Structured Data schema builders...');
const org = buildOrganizationSchema();
const site = buildWebSiteSchema();

if (org['@type'] === 'Organization' && site['@type'] === 'WebSite') {
    console.log('✅ Structured data JSON-LD builder objects format verified.');
} else {
    console.error('Structured data generation failed.');
}
