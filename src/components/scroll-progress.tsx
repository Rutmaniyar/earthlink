/**
 * Sticky brand-colored progress bar at the very top of the viewport.
 * Reflects how far the user has scrolled through the current page.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div className="scroll-progress-bar h-full origin-left bg-gradient-to-r from-brand via-gold-glow to-gold" />
    </div>
  );
}
