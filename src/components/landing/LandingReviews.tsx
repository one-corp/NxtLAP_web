import { Star } from "lucide-react";

const reviews = [
  {
    name: "Mark T.",
    role: "Formula 1 & WRC fan",
    content: "NxtLAP has completely changed how I follow motorsport. No more searching across multiple sites - everything I need is right there. The timezone conversion alone is worth it!",
    initials: "MT",
    bg: "bg-blue-500",
  },
  {
    name: "Sarah K.",
    role: "Endurance racing fan",
    content: "As someone who follows both WEC and IMSA, this app is an absolute game changer. I can see both series times in one place and get notified before each session. Brilliant!",
    initials: "SK",
    bg: "bg-emerald-500",
  },
  {
    name: "James R.",
    role: "Motorsport journalist",
    content: "I use it every single week. The live stream integration means I never miss a session even when travelling. The app is gorgeous too.",
    initials: "JR",
    bg: "bg-purple-500",
  },
  {
    name: "Priya M.",
    role: "MotoGP & F1 fan",
    content: "I've discovered so much racing via this app. I'm watching GT World Challenge now. I didn't even know what that was a year ago!",
    initials: "PM",
    bg: "bg-pink-500",
  },
  {
    name: "Chris L.",
    role: "NASCAR & IndyCar fan",
    content: "Living in Europe and following American series used to be a nightmare. The timezone conversion is flawless - I always know exactly when to tune in.",
    initials: "CL",
    bg: "bg-orange-500",
  },
  {
    name: "Annika B.",
    role: "DTM & Formula E fan",
    content: "Love that it covers smaller series just as well as F1. It's clear the developer really cares about all of motorsport, not just F1.",
    initials: "AB",
    bg: "bg-red-500",
  },
];

export function LandingReviews() {
  return (
    <section id="reviews" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What fans are saying</h2>
          <div className="flex items-center justify-center gap-2 text-xl font-medium mb-4">
            <span className="text-yellow-500 flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="currentColor" />
              ))}
            </span>
          </div>
          <p className="text-lg text-muted-foreground">4.9 out of 5 from hundreds of ratings</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-background border border-border/50 p-8 rounded-2xl flex flex-col h-full shadow-sm">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg italic text-foreground/90 mb-8 flex-grow">
                &quot;{review.content}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full ${review.bg} flex items-center justify-center text-white font-bold text-lg`}>
                  {review.initials}
                </div>
                <div>
                  <div className="font-bold text-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
