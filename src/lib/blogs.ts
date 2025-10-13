import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostMeta = {
  title: string;
  description?: string;
  date: string; // ISO string
  tags?: string[];
  slug: string;
  readingTime?: string;
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

      const meta: PostMeta = {
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ? String(data.date) : new Date().toISOString(),
        tags: Array.isArray(data.tags) 
          ? data.tags 
          : (data.tags ? [String(data.tags)] : []),
        slug,
        readingTime: calculateReadingTime(content),
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

      const meta: PostMeta = {
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ? String(data.date) : new Date().toISOString(),
        tags: Array.isArray(data.tags) 
          ? data.tags 
          : (data.tags ? [String(data.tags)] : []),
        slug,
        readingTime: calculateReadingTime(content),
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