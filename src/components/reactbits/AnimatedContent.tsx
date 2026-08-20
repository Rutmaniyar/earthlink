import React, { createElement, useEffect, useRef } from "react";

type AsTag = keyof React.JSX.IntrinsicElements;

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** HTML tag to render as. Defaults to 'div'. */
  as?: AsTag;
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

function cssEase(ease: string): string {
  if (ease === "power3.in") return "cubic-bezier(0.64, 0, 0.78, 0)";
  if (ease === "power3.inOut") return "cubic-bezier(0.65, 0, 0.35, 1)";
  if (ease === "power3.out") return "cubic-bezier(0.22, 1, 0.36, 1)";
  return ease;
}

/**
 * Native Web Animations replacement for the previous GSAP/ScrollTrigger
 * wrapper. It keeps the same transform, opacity, duration, and threshold
 * controls while avoiding a large runtime and scroll-time layout work.
 */
const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  as = "div",
  container,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power3.in",
  onComplete,
  onDisappearanceComplete,
  className = "",
  ...props
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onComplete?.();
      return;
    }

    let root: Element | null = null;
    if (typeof container === "string") root = document.querySelector(container);
    else if (container instanceof Element) root = container;
    else root = document.getElementById("snap-main-container");

    const axis = direction === "horizontal" ? "X" : "Y";
    const offset = (reverse ? -1 : 1) * distance;
    const fromTransform = `translate${axis}(${offset}px) scale(${scale})`;
    const fromOpacity = animateOpacity ? initialOpacity : 1;
    const startPct = Math.max(0, Math.min(100, (1 - threshold) * 100));
    let entrance: Animation | null = null;
    let exit: Animation | null = null;
    let exitTimer = 0;
    let observer: IntersectionObserver | null = null;
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      entrance = el.animate(
        [
          { transform: fromTransform, opacity: fromOpacity },
          { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: cssEase(ease),
          fill: "both",
        },
      );
      entrance.onfinish = () => {
        el.style.transform = "translate3d(0, 0, 0) scale(1)";
        el.style.opacity = "1";
        entrance?.cancel();
        onComplete?.();

        if (disappearAfter > 0) {
          exitTimer = window.setTimeout(() => {
            const exitOffset = reverse ? distance : -distance;
            exit = el.animate(
              [
                { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
                {
                  transform: `translate${axis}(${exitOffset}px) scale(0.8)`,
                  opacity: animateOpacity ? initialOpacity : 0,
                },
              ],
              {
                duration: disappearDuration * 1000,
                easing: cssEase(disappearEase),
                fill: "forwards",
              },
            );
            exit.onfinish = () => onDisappearanceComplete?.();
          }, disappearAfter * 1000);
        }
      };
    };

    // Measure before applying any animation style so this component does not
    // cause a read-after-write layout flush during hydration.
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportHeight && rect.bottom > 0) {
      play();
    } else {
      el.style.transform = fromTransform;
      el.style.opacity = String(fromOpacity);
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            observer?.disconnect();
            play();
          }
        },
        {
          root,
          rootMargin: `0px 0px -${100 - startPct}% 0px`,
          threshold: 0,
        },
      );
      observer.observe(el);
    }

    return () => {
      observer?.disconnect();
      entrance?.cancel();
      exit?.cancel();
      window.clearTimeout(exitTimer);
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete,
  ]);

  return createElement(as, { ref, className, ...props }, children);
};

export default AnimatedContent;
