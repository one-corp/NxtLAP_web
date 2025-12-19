import { fetchMotorsportNews } from "@/lib/rss";
import { ExternalLink, Smartphone } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export async function RightPanel() {
  const news = await fetchMotorsportNews();

  return (
    <div className="space-y-6 sticky top-24">
      {/* Latest News Section */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
           Latest News
        </h3>
        {news.length > 0 ? (
          <ul className="space-y-4 text-sm">
            {news.map((item, index) => (
              <li key={index} className="border-b last:border-0 pb-3 last:pb-0 border-border/50">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors block font-medium line-clamp-2 leading-snug mb-1"
                >
                  {item.title}
                </a>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span>
                        {item.pubDate ? formatDistanceToNow(new Date(item.pubDate), { addSuffix: true }) : ''}
                    </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">Unable to load news at this time.</p>
        )}
      </div>

      {/* App Promotion Section */}
      <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-background text-card-foreground shadow-sm p-5">
        <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-full">
                <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <div>
                <h3 className="font-bold text-lg">Get the NxtLAP App</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Live race scores, widgets and more on your iPhone.
                </p>
            </div>
            <a
                href="https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
                Download on App Store
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
      </div>

       {/* More Sites Section */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
        <h3 className="font-semibold text-lg mb-3">More Sites</h3>
        <ul className="space-y-2 text-sm">
            <li>
                <a
                    href="https://motorsport24.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                    <span className="font-medium group-hover:text-primary transition-colors">Motorsport Results</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </a>
            </li>
        </ul>
      </div>
    </div>
  );
}
