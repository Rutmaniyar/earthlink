import React, { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const reduced = usePrefersReducedMotion();
  const effectiveDisabled = disabled || reduced;
  const magnetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magnet = magnetRef.current;
    const inner = innerRef.current;
    if (!magnet || !inner || effectiveDisabled) return;

    let rect = magnet.getBoundingClientRect();
    let active = false;
    let rectRaf = 0;

    const updateRect = () => {
      rectRaf = 0;
      rect = magnet.getBoundingClientRect();
    };
    const scheduleRect = () => {
      if (!rectRaf) rectRaf = requestAnimationFrame(updateRect);
    };
    const reset = () => {
      active = false;
      inner.style.transition = inactiveTransition;
      inner.style.transform = "translate3d(0, 0, 0)";
    };
    const onPointerMove = (event: PointerEvent) => {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const inside =
        Math.abs(centerX - event.clientX) < rect.width / 2 + padding &&
        Math.abs(centerY - event.clientY) < rect.height / 2 + padding;

      if (!inside) {
        if (active) reset();
        return;
      }

      active = true;
      inner.style.transition = activeTransition;
      inner.style.transform = `translate3d(${(event.clientX - centerX) / magnetStrength}px, ${(event.clientY - centerY) / magnetStrength}px, 0)`;
    };

    const resizeObserver = new ResizeObserver(scheduleRect);
    resizeObserver.observe(magnet);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", scheduleRect, { passive: true });
    window.addEventListener("resize", scheduleRect);

    return () => {
      cancelAnimationFrame(rectRaf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", scheduleRect);
      window.removeEventListener("resize", scheduleRect);
    };
  }, [activeTransition, effectiveDisabled, inactiveTransition, magnetStrength, padding]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          transform: "translate3d(0, 0, 0)",
          transition: inactiveTransition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
