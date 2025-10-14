import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";
import { PostMeta } from "@/lib/blogs";

interface LatestBlogsProps {
  posts: PostMeta[];
  limit?: number;
}

export function LatestBlogs({ posts, limit = 3 }: LatestBlogsProps) {
  const displayPosts = posts.slice(0, limit);

  return (
    <section
      className="relative bg-gradient-to-b from-background via-slate-accent/30 to-background py-16 md:py-20"
      aria-labelledby="latest-blogs-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            <span>Latest Updates</span>
          </div>
          <h2
            id="latest-blogs-heading"
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Racing <span className="text-gradient">Chronicles</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest race recaps, analysis, and motorsport news
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {displayPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative h-full"
            >
              <Link href={`/blogs/${post.slug}`} className="block h-full">
                <div className="h-full flex flex-col rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-xl hover:-translate-y-1">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
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
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                      {post.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "MMM dd, yyyy")}
                      </time>
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{post.readingTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:gap-3 group"
          >
            <span>View All Chronicles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
