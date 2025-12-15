"use client"
export function RightPanel() {
    return (
        <div className="space-y-4">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-2">Latest News</h3>
                 <ul className="space-y-3 text-sm">
                    <li>
                        <a href="#" className="hover:text-primary transition-colors block line-clamp-2">
                            Verstappen secures pole position in thrilling qualifier
                        </a>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </li>
                    <li>
                        <a href="#" className="hover:text-primary transition-colors block line-clamp-2">
                            MotoGP: Bagnaia aiming for consecutive wins
                        </a>
                        <span className="text-xs text-muted-foreground">5 hours ago</span>
                    </li>
                     <li>
                        <a href="#" className="hover:text-primary transition-colors block line-clamp-2">
                            New regulations announced for 2026 season
                        </a>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
