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
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Reduced-motion fallback: render a static linear-gradient using the same
  // color stops so the visual identity stays intact without WebGL motion.
  if (reduced) {
    const stops = (props.colorStops ?? ["#3A29FF", "#FF94B4", "#FF3232"]).join(", ");
    return (
      <div
        className={props.className}
        style={{
          backgroundImage: `linear-gradient(120deg, ${stops})`,
          opacity: 0.45,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={props.className}>
      <Suspense fallback={null}>
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
