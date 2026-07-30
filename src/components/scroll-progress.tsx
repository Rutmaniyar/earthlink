import { motion, useScroll, useSpring } from "motion/react";

/**
 * Sticky brand-colored progress bar at the very top of the viewport.
 * Reflects how far the user has scrolled through the current page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.35,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-brand via-gold-glow to-gold"
        style={{ scaleX }}
      />
    </div>
  );
}
