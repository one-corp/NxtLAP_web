"use client";
import Marquee from "react-fast-marquee";

function MarqueeText() {
  return (
    <div className="font-bold overflow-hidden">
      {/* Top line scroll left */}
      <Marquee speed={40}>
        <span>
          · CHASING LAP TIMES · FUEL YOUR PASSION · THE TRACK NEVER LIES ·
        </span>
        <span className="mx-1">
          CHASING LAP TIMES · FUEL YOUR PASSION · THE TRACK NEVER LIES ·
        </span>
        <span className="mx-1">
          CHASING LAP TIMES · FUEL YOUR PASSION · THE TRACK NEVER LIES ·
        </span>
        <span className="mx-1">
          CHASING LAP TIMES · FUEL YOUR PASSION · THE TRACK NEVER LIES
        </span>
      </Marquee>

      {/* Bottom line scroll right */}
      <Marquee speed={40} direction="right">
        <span>
          · CHASING LAP TIMES · FUEL YOUR PASSION · THE TRACK NEVER LIES ·
        </span>
        <span className="mx-1">
          CHASING LAP TIMES · FUEL YOUR PASSION · THE TRACK NEVER LIES ·
        </span>
        <span className="mx-1">
          CHASING LAP TIMES · FUEL YOUR PASSION · THE TRACK NEVER LIES ·
        </span>
        <span className="mx-1">
          CHASING LAP TIMES · FUEL YOUR PASSION · THE TRACK NEVER LIES
        </span>
      </Marquee>
    </div>
  );
}

export default MarqueeText;
