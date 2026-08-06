import { getAllPostsMeta } from '../src/lib/blogs';
import fs from 'fs';
import path from 'path';

async function testSitemapDeps() {
    console.log('Testing Sitemap data availability...');
    const posts = await getAllPostsMeta();
    const appDirExists = fs.existsSync(path.join(process.cwd(), 'src/app/page.tsx'));

    if (posts && posts.length > 0 && appDirExists) {
        console.log('✅ Sitemap metadata and static routes available.');
    } else {
        console.error('Sitemap requirements check failed.');
    }
}
testSitemapDeps();
