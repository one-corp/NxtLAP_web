import { Calendar, Globe2, Bell, LayoutDashboard, Tv2, Search } from "lucide-react";

const features = [
  {
    title: "Motorsport calendar, streams and timetables - in one app",
    description: "Built by fans, for fans. One app to replace the spreadsheets, browser tabs, and alarm clocks.",
    icon: Calendar,
  },
  {
    title: "Live Motorsport Streams",
    description: "Watch live motorsport streams directly in the app. Top racing series covered - streams always at your fingertips.",
    icon: Tv2,
  },
  {
    title: "10+ Series Racing Calendar",
    description: "The complete motorsport racing calendar in one app - from Formula 1 and MotoGP to regional championships.",
    icon: Globe2,
  },
  {
    title: "Race Timetables in Your Timezone",
    description: "Every motorsport timetable auto-converted to your local time. No more mental gymnastics - correct race times, every session.",
    icon: LayoutDashboard,
  },
  {
    title: "Smart Notifications",
    description: "Get alerts before your favourite sessions start. Customise per series, session type, and lead time.",
    icon: Bell,
  },
  {
    title: "Discover More",
    description: "Explore new series, discover drivers, and find motorsport services you never knew existed.",
    icon: Search,
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 bg-card/50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">Features</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to follow the world of motorsport, perfectly organized in one beautiful app.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-background border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
