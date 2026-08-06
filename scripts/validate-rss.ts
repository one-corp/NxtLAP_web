import { getAllPostsMeta } from '../src/lib/blogs';

async function testRssDeps() {
    console.log('Testing RSS data availability...');
    const posts = await getAllPostsMeta();
    if (posts && posts.length > 0) {
        console.log('✅ Found posts suitable for RSS generation.');
    } else {
        console.error('No posts available for RSS.');
    }
}
testRssDeps();
