import React from "react";

interface ThreePanelLayoutProps {
  children: React.ReactNode; // The Center Panel content (Main)
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export function ThreePanelLayout({
  children,
  leftPanel,
  rightPanel,
}: ThreePanelLayoutProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
        {/* Left Panel - Context (Hidden on mobile/tablet initially, or stacked? Plan said stacked below, but usually side panels hide or go below. Let's make it col-span-3) */}
        <aside className="lg:col-span-3 order-2 lg:order-1 space-y-6">
          <div className="sticky top-32 space-y-6">
             {leftPanel || <div className="text-muted-foreground text-sm italic">Select a series to see details</div>}
          </div>
        </aside>

        {/* Center Panel - Main Content */}
        <main className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2 space-y-6 min-h-[50vh]">
          {children}
        </main>

        {/* Right Panel - Tertiary Info */}
        <aside className="lg:col-span-3 xl:col-span-3 order-3 lg:order-3 space-y-6">
           <div className="sticky top-32 space-y-6">
            {rightPanel || <div className="text-muted-foreground text-sm italic">Trending news & updates</div>}
           </div>
        </aside>
      </div>
    </div>
  );
}
