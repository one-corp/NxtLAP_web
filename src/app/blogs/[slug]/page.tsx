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
    <main className="min-h-screen bg-background pt-10">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-b from-card/50 to-transparent border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Chronicles
          </Link>
        </div>
      </div>

      {/* Article Container */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="py-12 lg:py-16">
          {/* Tags */}
          {post.meta.tags && post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] text-foreground">
            {post.meta.title}
          </h1>

          {/* Description */}
          {post.meta.description && (
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
              {post.meta.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground pt-6 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <time dateTime={post.meta.date}>
                {format(new Date(post.meta.date), "MMMM dd, yyyy")}
              </time>
            </div>

            {post.meta.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{post.meta.readingTime}</span>
              </div>
            )}

            <button className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:bg-accent hover:border-primary/30 transition-all">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </header>

        {/* Content Section with Better Spacing */}
        <div className="pb-16 lg:pb-20">
          <div
            style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
            className="prose prose-invert prose-xl max-w-none
              /* Base Styles */
              [&>*]:max-w-none
              
              /* Headings - Much tighter spacing */
              prose-headings:text-primary prose-headings:font-black prose-headings:tracking-tight prose-headings:scroll-mt-20
              prose-h1:text-5xl prose-h1:mb-4 prose-h1:mt-4 prose-h1:leading-tight prose-h1:pb-3 prose-h1:border-b prose-h1:border-border/30
              prose-h2:text-4xl prose-h2:mb-3 prose-h2:mt-4 prose-h2:leading-tight prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/20
              prose-h3:text-3xl prose-h3:mb-3 prose-h3:mt-3 prose-h3:leading-tight
              prose-h4:text-2xl prose-h4:mb-2 prose-h4:mt-3 prose-h4:leading-tight
              prose-h5:text-xl prose-h5:mb-2 prose-h5:mt-3 prose-h5:leading-tight
              prose-h6:text-lg prose-h6:mb-2 prose-h6:mt-2 prose-h6:leading-tight
              
              /* Paragraphs - Much tighter spacing */
              prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:mb-3 prose-p:text-[21px] prose-p:font-normal
              
              /* Links - Red color with citation support */
              prose-a:text-primary prose-a:no-underline prose-a:font-medium prose-a:transition-colors
              hover:prose-a:underline hover:prose-a:underline-offset-4
              prose-a:break-words
              
              /* Emphasis - Bolder */
              prose-strong:text-foreground prose-strong:font-black
              prose-em:text-muted-foreground prose-em:italic
              
              /* Lists - Tighter spacing */
              prose-ul:my-4 prose-ul:pl-6 prose-ul:space-y-1
              prose-ol:my-4 prose-ol:pl-6 prose-ol:space-y-1
              prose-li:text-muted-foreground prose-li:leading-[1.8] prose-li:text-[21px]
              prose-li::marker:text-primary prose-li::marker:font-bold
              
              /* Blockquotes - Tighter spacing */
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:pr-6
              prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:bg-primary/5
              prose-blockquote:py-4 prose-blockquote:my-5 prose-blockquote:rounded-r-xl prose-blockquote:font-medium
              prose-blockquote:text-xl prose-blockquote:leading-[1.8]
              
              /* Code - Clean inline code */
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 
              prose-code:rounded-md prose-code:text-[17px] prose-code:font-mono prose-code:font-medium
              prose-code:before:content-none prose-code:after:content-none
              
              /* Code blocks - Tighter spacing */
              prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl 
              prose-pre:p-5 prose-pre:my-5 prose-pre:overflow-x-auto prose-pre:text-[16px]
              prose-pre:shadow-xl prose-pre:leading-relaxed
              
              /* Tables - Better wrapping and spacing */
              prose-table:w-full prose-table:my-5 prose-table:border-collapse prose-table:text-[16px]
              prose-table:border-y prose-table:border-border prose-table:table-fixed
              prose-thead:border-b-2 prose-thead:border-border
              prose-th:border-0 prose-th:bg-transparent prose-th:px-4 prose-th:py-4 
              prose-th:text-left prose-th:font-bold prose-th:text-foreground prose-th:text-base
              prose-td:border-0 prose-td:border-t prose-td:border-border/50 prose-td:px-4 prose-td:py-4 
              prose-td:text-muted-foreground prose-td:align-top prose-td:break-words
              prose-tr:border-0
              
              /* Images - Tighter spacing */
              prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-2xl
              prose-img:my-5 prose-img:mx-auto prose-img:w-full
              
              /* Horizontal rules - Tighter spacing */
              prose-hr:border-border/50 prose-hr:my-6 prose-hr:border-t-2
              
              /* Figure captions */
              prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-muted-foreground
              prose-figcaption:mt-3 prose-figcaption:italic
              
              /* Citation links - smaller and subtle */
              [&_sup]:text-xs [&_sup]:text-primary/70 [&_sup]:font-normal
              [&_sup_a]:text-primary/70 [&_sup_a]:no-underline hover:[&_sup_a]:text-primary"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>

        {/* Footer Section */}
        <footer className="py-12 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Enjoyed this article?
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Read more stories
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Share:</span>
              <button className="p-3 rounded-lg bg-card border border-border hover:bg-primary/10 hover:border-primary/30 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
