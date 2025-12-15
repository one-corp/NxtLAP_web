"use client"
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

export function RightPanel() {
    const [timeLeft, setTimeLeft] = useState("");

    // Simple countdown logic (mocking a next big race)
    useEffect(() => {
        // Mock target: Next F1 Sunday (just an example)
        const target = new Date();
        target.setDate(target.getDate() + (7 - target.getDay()) % 7 + 1); // Next Sundayish
        target.setHours(14, 0, 0, 0);

        const interval = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft("Race Started!");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Timer className="w-5 h-5 text-primary" />
                    Next Big Race
                </h3>
                <div className="text-3xl font-bold text-center py-4 text-gradient">
                   {timeLeft || "Loading..."}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Estimated Countdown
                </p>
            </div>

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
