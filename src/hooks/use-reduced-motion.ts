import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion at the OS level
 * (prefers-reduced-motion: reduce). SSR-safe — defaults to `false` until
 * the component mounts on the client.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}
