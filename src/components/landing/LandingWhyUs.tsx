import { CheckCircle2, XCircle } from "lucide-react";

export function LandingWhyUs() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Why NxtLAP</h2>
          <p className="text-xl text-muted-foreground">
            The motorsport calendar, timetables and streams app. One app to replace them all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Before */}
          <div className="bg-destructive/10 border border-destructive/20 p-8 md:p-10 rounded-3xl relative">
            <h3 className="text-2xl font-bold mb-8 text-destructive flex items-center gap-3">
              Before NxtLAP
            </h3>
            <ul className="space-y-6">
              {[
                "Multiple websites and apps to check",
                "Session times in the wrong timezone",
                "Forgetting races until they've started",
                "Discovering streams too late",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                  <span className="text-lg opacity-80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 md:p-10 rounded-3xl relative shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg transform rotate-12">
              The Solution
            </div>
            <h3 className="text-2xl font-bold mb-8 text-emerald-500 flex items-center gap-3">
              With NxtLAP
            </h3>
            <ul className="space-y-6">
              {[
                "Everything in one beautiful app",
                "Times auto-converted to your timezone",
                "Alerts before every session you care about",
                "Streams always at hand",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-lg opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20 text-center">
          {[
            { value: "10+", label: "Global Series" },
            { value: "Live", label: "Race Streams" },
            { value: "100%", label: "Timezone Accurate" },
            { value: "1", label: "App Needed" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
