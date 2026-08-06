import { generatePageMetadata } from '../src/lib/seo/metadata';

// Very simple test script to run checking if Next.js Metadata API structures our tags properly
console.log('Testing Meta Tag generation API...');
const testMetadata = generatePageMetadata({
    title: 'Test',
    description: 'Test description',
    path: '/'
});

if (testMetadata.title && testMetadata.description) {
    console.log('✅ Meta tags correctly formed by utility.');
} else {
    console.error('Meta Tag generation failed.');
}
