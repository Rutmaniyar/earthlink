import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Global scroll-linked depth layer. It adds spatial context without changing
 * page layout or blocking interaction.
 */
export function ScrollDepth() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.5,
  });

  const nearY = useTransform(smooth, [0, 1], ["0%", "-18%"]);
  const farY = useTransform(smooth, [0, 1], ["0%", "-8%"]);
  const lift = useTransform(smooth, [0, 1], [0, -24]);

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="depth-atmosphere">
      <motion.div className="depth-grid depth-grid-far" style={{ y: farY }} />
      <motion.div className="depth-grid depth-grid-near" style={{ y: nearY }} />
      <motion.div className="depth-edge depth-edge-left" style={{ y: lift }} />
      <motion.div className="depth-edge depth-edge-right" style={{ y: lift }} />
    </div>
  );
}
