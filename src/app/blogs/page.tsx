import Link from "next/link";
import { format } from "date-fns";
import { getAllPostsMeta } from "@/lib/blogs";
import { Calendar, Clock, Tag, ArrowRight, Zap, TrendingUp, LibraryBig } from "lucide-react";

export const metadata = {
  title: "Racing Chronicles | Latest Updates",
  description: "Stay updated with the latest racing news, insights, and stories",
};

export default async function BlogsPage() {
  const posts = await getAllPostsMeta();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Latest Racing Updates</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gradient">Racing</span> Chronicles
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive into the world of high-speed racing with insights, analysis, and stories from the track
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-lg font-semibold text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp />
              Featured Story
            </h2>
            <Link href={`/blogs/${featuredPost.slug}`} className="block">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-10 lg:p-12">
                {/* Tags */}
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/30"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  {featuredPost.title}
                </h3>

                {/* Description */}
                {featuredPost.description && (
                  <p className="text-base sm:text-lg text-muted-foreground mb-6">
                    {featuredPost.description}
                  </p>
                )}

                {/* Meta & CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={featuredPost.date}>
                        {format(new Date(featuredPost.date), "MMM dd, yyyy")}
                      </time>
                    </div>
                    {featuredPost.readingTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readingTime}</span>
                      </div>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-2 text-primary font-medium">
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Other Posts */}
        <div>
          <h2 className="text-lg font-semibold text-primary mb-6 uppercase tracking-wider flex items-center gap-2">
            <LibraryBig />
            All Stories
          </h2>

          {otherPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <article key={post.slug} className="relative">
                  <Link href={`/blogs/${post.slug}`} className="block h-full">
                    <div className="h-full flex flex-col rounded-xl border border-border bg-card p-6">
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">
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
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={post.date}>
                            {format(new Date(post.date), "MMM dd")}
                          </time>
                        </div>
                        {post.readingTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readingTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No stories yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}