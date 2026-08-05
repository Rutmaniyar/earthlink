import { useEffect, useState, lazy, Suspense } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const Aurora = lazy(() => import("@/components/reactbits/Aurora"));

export function AuroraClient(props: {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    setMounted(true);
  }, []);

  const stops = (props.colorStops ?? ["#3A29FF", "#FF94B4", "#FF3232"]).join(", ");
  const fallbackStyle = {
    backgroundImage: `linear-gradient(120deg, ${stops})`,
    opacity: 0.45,
  };
  const fallback = <div className={props.className} style={fallbackStyle} aria-hidden="true" />;

  if (!mounted) return fallback;

  // Reduced-motion fallback: render a static linear-gradient using the same
  // color stops so the visual identity stays intact without WebGL motion.
  if (reduced) {
    return fallback;
  }

  return (
    <div className={props.className}>
      <Suspense
        fallback={<div className="h-full w-full" style={fallbackStyle} aria-hidden="true" />}
      >
        <Aurora
          colorStops={props.colorStops}
          amplitude={props.amplitude}
          blend={props.blend}
          speed={props.speed}
        />
      </Suspense>
    </div>
  );
}
