import { getLatestNews } from "@/lib/rss";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";

export async function RightPanel() {
  const news = await getLatestNews();
  // Limit total news to show
  const displayNews = news.slice(0, 15);

  return (
    <div className="space-y-4 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 scrollbar-thin">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 sticky top-0 bg-card z-10 pb-2 border-b border-border/40">
                <Newspaper className="w-5 h-5 text-primary" />
                Latest News
            </h3>

             {displayNews.length > 0 ? (
                <ul className="space-y-4 pt-2">
                    {displayNews.map((item, idx) => (
                        <li key={idx} className="group border-b border-border/40 last:border-0 pb-4 last:pb-0">
                            <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block space-y-1.5"
                            >
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    {item.sourceLogo && (
                                        <div className="relative w-4 h-4 flex-shrink-0">
                                            <Image
                                                src={item.sourceLogo}
                                                alt={item.source}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    {!item.sourceLogo && (
                                         <span className="font-medium text-primary">{item.source}</span>
                                    )}
                                    <span>•</span>
                                    <span className="whitespace-nowrap">{formatDistanceToNow(new Date(item.isoDate), { addSuffix: true }).replace("about ", "")}</span>
                                </div>

                                <h4 className="font-medium text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3">
                                    {item.title}
                                </h4>
                            </Link>
                        </li>
                    ))}
                </ul>
             ) : (
                 <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">No news updates available.</p>
                 </div>
             )}
        </div>
    </div>
  )
}
