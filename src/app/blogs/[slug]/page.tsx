import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blogs";
import { format } from "date-fns";
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((s) => ({ slug: s }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.meta.title} | Racing Chronicles`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-18">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-8 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chronicles
        </Link>

        {/* Article Container */}
        <article>
          {/* Header */}
          <header className="mb-12 pb-10 border-b border-border/50">
            {post.meta.tags && post.meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full bg-primary/15 text-primary border border-primary/30"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.meta.title}
            </h1>

            {post.meta.description && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.meta.description}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.meta.date}>
                    {format(new Date(post.meta.date), "MMMM dd, yyyy")}
                  </time>
                </div>

                {post.meta.readingTime && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{post.meta.readingTime}</span>
                  </div>
                )}
              </div>

              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:bg-accent transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 prose-p:text-muted-foreground
              prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6
              prose-ul:my-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:space-y-2
              prose-li:text-muted-foreground prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-6
              prose-img:rounded-lg prose-img:my-8 prose-img:border prose-img:border-border
              prose-hr:border-border/50 prose-hr:my-10
              prose-table:my-6 prose-table:border-collapse
              prose-th:border prose-th:border-border prose-th:bg-card prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-10 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Enjoyed this article?
                </p>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Read more stories
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Share:</span>
                <button className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
