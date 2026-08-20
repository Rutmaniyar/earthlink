import type React from "react";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
}

/**
 * Compositor-driven shine effect. CSS background animation preserves the
 * original appearance without running a JavaScript callback on every frame.
 */
const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}) => {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  if (disabled || reduced) {
    return (
      <span className={`inline-block ${className}`} style={{ color }}>
        {text}
      </span>
    );
  }

  const animationDirection =
    direction === "left" ? (yoyo ? "alternate" : "normal") : yoyo ? "alternate-reverse" : "reverse";

  const style: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: "200% auto",
    backgroundPosition: "150% center",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationName: "shiny-text-sweep",
    animationDuration: `${speed}s`,
    animationDelay: `${delay}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDirection,
    animationPlayState: paused ? "paused" : "running",
  };

  return (
    <span
      className={`inline-block ${className}`}
      style={style}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {text}
    </span>
  );
};

export default ShinyText;
