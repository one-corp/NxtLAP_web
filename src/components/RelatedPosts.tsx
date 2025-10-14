import Link from "next/link";
import { getAllPostsMeta, getRelatedPosts, type PostMeta } from "@/lib/blogs";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { format } from "date-fns";

interface RelatedPostsProps {
  currentSlug: string;
  limit?: number;
}

export async function RelatedPosts({ currentSlug, limit = 3 }: RelatedPostsProps) {
  // Get all posts and find the current post
  const allPosts = await getAllPostsMeta();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) {
    return null;
  }
  
  // Get related posts
  const relatedPosts = getRelatedPosts(currentPost, allPosts, limit);
  
  // Don't render if no related posts found
  if (relatedPosts.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 border-t border-border/50">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-gradient">
            Related Stories
          </h2>
        </div>
        <p className="text-muted-foreground">
          Continue exploring more motorsports content
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <RelatedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

function RelatedPostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group block h-full"
    >
      <article className="h-full bg-card border border-border/50 rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        {/* Description */}
        {post.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        )}
        
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/30">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <time dateTime={post.date}>
              {format(new Date(post.date), "MMM dd, yyyy")}
            </time>
          </div>
          
          {post.readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{post.readingTime}</span>
            </div>
          )}
          
          <div className="ml-auto flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
