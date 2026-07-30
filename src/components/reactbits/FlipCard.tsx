import { ReactNode } from "react";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  height?: string;
}

/**
 * 3D flip card — flips on hover (desktop) and on focus/tap (mobile/keyboard).
 * Pure CSS, SSR-safe, no JS state.
 */
export default function FlipCard({ front, back, className = "", height = "h-64" }: FlipCardProps) {
  return (
    <div
      tabIndex={0}
      className={`group/flip relative ${height} w-full [perspective:1200px] outline-none ${className}`}
    >
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)] group-focus/flip:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden">
          {front}
        </div>
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden">
          {back}
        </div>
      </div>
    </div>
  );
}
