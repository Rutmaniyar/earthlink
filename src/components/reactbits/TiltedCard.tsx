import { ReactNode, useRef, useState } from "react";

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  /** max tilt degrees */
  max?: number;
  /** scale on hover */
  scale?: number;
}

/**
 * Mouse-tracking 3D tilt card with smooth spring-back.
 * Falls back to a plain div on touch devices.
 */
export default function TiltedCard({ children, className = "", max = 10, scale = 1.03 }: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) scale(${scale})`,
    });
  };

  const reset = () => setStyle({ transform: "perspective(900px) rotateY(0) rotateX(0) scale(1)" });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transition: "transform 400ms cubic-bezier(.2,.8,.2,1)", transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
