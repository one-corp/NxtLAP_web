export function LeftPanel() {
    return (
        <div className="space-y-4">
             <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
                <h3 className="font-semibold text-lg mb-2">Featured Series</h3>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                        <span>F1</span>
                        <span className="text-muted-foreground">Active</span>
                    </li>
                    <li className="flex justify-between">
                        <span>MotoGP</span>
                        <span className="text-muted-foreground">Active</span>
                    </li>
                    <li className="flex justify-between">
                        <span>IndyCar</span>
                        <span className="text-muted-foreground">Upcoming</span>
                    </li>
                </ul>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
                 <h3 className="font-semibold text-lg mb-2">My Favorites</h3>
                 <p className="text-sm text-muted-foreground">
                    Sign in to follow your favorite leagues and drivers.
                 </p>
            </div>
        </div>
    )
}
