import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostMeta = {
  title: string;
  description?: string;
  date: string; // ISO string
  tags?: string[];
  keywords?: string[]; // SEO keywords
  author?: string; // Post author
  featuredImage?: string; // Featured image path
  slug: string;
  readingTime?: string;
  lastModified?: string; // Last modification date
};

export type Post = {
  meta: PostMeta;
  contentHtml: string;
};

const POSTS_PATH = path.join(process.cwd(), "src", "posts");

function slugFromFilename(filename: string) {
  return filename.replace(/\.(md|mdx)$/, "");
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Get file modification time from file system
 * @param filePath - Full path to the file
 * @returns ISO string of last modification time, or current date as fallback
 */
export async function getFileModifiedTime(filePath: string): Promise<string> {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime.toISOString();
  } catch (error) {
    console.warn(`Could not get file stats for ${filePath}:`, error);
    return new Date().toISOString(); // Fallback to current date
  }
}

/**
 * Extract keywords from content using simple frequency analysis
 * @param content - The markdown content to analyze
 * @param count - Number of keywords to extract (default: 10)
 * @returns Array of extracted keywords
 */
export function extractKeywords(content: string, count: number = 10): string[] {
  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
    'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
    'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
    'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them',
    'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
    'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
    'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
    'give', 'day', 'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had',
    'were', 'said', 'did', 'having', 'may', 'should', 'am', 'being', 'more'
  ]);

  // Remove markdown syntax and special characters
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract link text
    .replace(/[#*_~\[\]()]/g, '') // Remove markdown symbols
    .replace(/[^\w\s-]/g, ' ') // Remove special chars except hyphens
    .toLowerCase();

  // Tokenize and count word frequency
  const words = cleanContent.split(/\s+/).filter(word => 
    word.length > 3 && // Minimum length
    !stopWords.has(word) &&
    !/^\d+$/.test(word) // Not just numbers
  );

  // Count frequency
  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  // Sort by frequency and return top keywords
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}

export async function getPostFilePaths(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_PATH);
    return files.filter((f) => /\.(md|mdx)$/.test(f));
  } catch (err) {
    console.error("Error reading posts directory:", err);
    return [];
  }
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const files = await getPostFilePaths();
  const posts: PostMeta[] = [];

  for (const file of files) {
    const fullPath = path.join(POSTS_PATH, file);
    try {
      const raw = await fs.readFile(fullPath, "utf-8");
      const { data, content } = matter(raw);

      const slug = slugFromFilename(file);
      
      // Get file modification time from filesystem
      const fileModTime = await getFileModifiedTime(fullPath);
      
      // Extract keywords from frontmatter or content
      let keywords: string[] | undefined;
      if (Array.isArray(data.keywords)) {
        keywords = data.keywords;
      } else if (data.keywords) {
        keywords = [String(data.keywords)];
      } else {
        // Auto-extract keywords if not provided
        keywords = extractKeywords(content, 8);
      }

      const meta: PostMeta = {
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ? String(data.date) : new Date().toISOString(),
        tags: Array.isArray(data.tags) 
          ? data.tags 
          : (data.tags ? [String(data.tags)] : []),
        keywords,
        author: data.author ? String(data.author) : undefined,
        featuredImage: data.featuredImage ? String(data.featuredImage) : undefined,
        slug,
        readingTime: calculateReadingTime(content),
        lastModified: data.lastModified ? String(data.lastModified) : fileModTime,
      };

      posts.push(meta);
    } catch (err) {
      console.error(`Error processing file ${file}:`, err);
    }
  }

  // Sort by date desc
  posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: false,
});

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const possible = [`${slug}.mdx`, `${slug}.md`];
  
  for (const fileName of possible) {
    const fullPath = path.join(POSTS_PATH, fileName);
    try {
      const raw = await fs.readFile(fullPath, "utf-8");
      const { data, content } = matter(raw);

      // Convert markdown to HTML using marked
      const contentHtml = await marked(content);
      
      // Get file modification time from filesystem
      const fileModTime = await getFileModifiedTime(fullPath);
      
      // Extract keywords from frontmatter or content
      let keywords: string[] | undefined;
      if (Array.isArray(data.keywords)) {
        keywords = data.keywords;
      } else if (data.keywords) {
        keywords = [String(data.keywords)];
      } else {
        // Auto-extract keywords if not provided
        keywords = extractKeywords(content, 8);
      }

      const meta: PostMeta = {
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ? String(data.date) : new Date().toISOString(),
        tags: Array.isArray(data.tags) 
          ? data.tags 
          : (data.tags ? [String(data.tags)] : []),
        keywords,
        author: data.author ? String(data.author) : undefined,
        featuredImage: data.featuredImage ? String(data.featuredImage) : undefined,
        slug,
        readingTime: calculateReadingTime(content),
        lastModified: data.lastModified ? String(data.lastModified) : fileModTime,
      };

      return { meta, contentHtml };
    } catch (err) {
      console.error(`Error processing ${fileName}:`, err);
      continue;
    }
  }
  
  return null;
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await getPostFilePaths();
  return files.map((f) => slugFromFilename(f));
}

/**
 * Get related posts based on tags and keywords similarity
 * @param currentPost - The current post to find related posts for
 * @param allPosts - All available posts
 * @param limit - Maximum number of related posts to return (default: 4)
 * @returns Array of related posts sorted by relevance
 */
export function getRelatedPosts(
  currentPost: PostMeta,
  allPosts: PostMeta[],
  limit: number = 4
): PostMeta[] {
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
  
  // Calculate relevance score for each post
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Score based on shared tags
    if (currentPost.tags && post.tags) {
      const currentTags = new Set(currentPost.tags.map(t => t.toLowerCase()));
      const postTags = new Set(post.tags.map(t => t.toLowerCase()));
      
      const sharedTags = [...currentTags].filter(tag => postTags.has(tag));
      score += sharedTags.length * 3; // Weight tags heavily
    }
    
    // Score based on shared keywords
    if (currentPost.keywords && post.keywords) {
      const currentKeywords = new Set(currentPost.keywords.map(k => k.toLowerCase()));
      const postKeywords = new Set(post.keywords.map(k => k.toLowerCase()));
      
      const sharedKeywords = [...currentKeywords].filter(kw => postKeywords.has(kw));
      score += sharedKeywords.length * 2; // Weight keywords moderately
    }
    
    // Bonus for same author
    if (currentPost.author && post.author && currentPost.author === post.author) {
      score += 1;
    }
    
    // Slight penalty for older posts (prefer recent content)
    const currentDate = new Date(currentPost.date).getTime();
    const postDate = new Date(post.date).getTime();
    const daysDiff = Math.abs(currentDate - postDate) / (1000 * 60 * 60 * 24);
    const recencyScore = Math.max(0, 1 - (daysDiff / 365)); // Decay over a year
    score += recencyScore * 0.5;
    
    return { post, score };
  });
  
  // Sort by score (descending) and return top results
  return scoredPosts
    .filter(({ score }) => score > 0) // Only return posts with some relevance
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}