import { ReactNode, useEffect, useRef, useState } from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let intersecting = true;
    const sync = () => setActive(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry?.isIntersecting ?? true;
      sync();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const animationPlayState = active && !(pauseOnHover && hovered) ? "running" : "paused";

  return (
    <div
      ref={rootRef}
      className={`group relative flex overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex shrink-0 items-center gap-12 pr-12"
        style={{
          animation: `marquee-loop ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-center gap-12 pr-12"
        style={{
          animation: `marquee-loop ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState,
        }}
      >
        {children}
      </div>
    </div>
  );
}
