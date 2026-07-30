import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds per loop
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Infinite seamless marquee — duplicates children for a seamless loop.
 * Keyframe defined inline-safe via Tailwind arbitrary animation.
 */
export default function Marquee({
  children,
  speed = 30,
  reverse = false,
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 items-center gap-12 pr-12"
        style={{
          animation: `marquee-loop ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: "running",
        }}
        onMouseEnter={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "running")}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-center gap-12 pr-12"
        style={{
          animation: `marquee-loop ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}
