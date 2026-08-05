import { useEffect, useRef, useState } from "react";

/** Count up to a numeric value when the element enters the viewport. */
export function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      return;
    }
    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            setVal(0);
            const t0 = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(to * eased);
              if (p < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  const finalDisplay = decimals > 0 ? to.toFixed(decimals) : Math.round(to).toLocaleString();
  return (
    <>
      <span className="sr-only">
        {prefix}
        {finalDisplay}
        {suffix}
      </span>
      <span ref={ref} className={className} aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </>
  );
}

/** Animated horizontal progress bar that fills when visible. */
export function ProgressBar({
  value,
  color = "var(--gold-glow)",
  trackClass = "bg-white/10",
  height = "h-1.5",
}: {
  value: number;
  color?: string;
  trackClass?: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setW(value);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-full ${trackClass} ${height}`}
    >
      <div
        className="h-full rounded-full transition-[width] duration-[1200ms] ease-out"
        style={{ width: `${w}%`, background: color, boxShadow: `0 0 10px ${color}` }}
      />
    </div>
  );
}

/** Mini equalizer bars — live signal indicator. */
export function LiveBars({ color = "var(--gold-glow)" }: { color?: string }) {
  const heights = ["h-3", "h-5", "h-2", "h-4", "h-3"];
  return (
    <div className="flex items-end gap-1">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-1 ${h} animate-pulse-soft rounded-sm`}
          style={{ background: color, animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

/** Animated radial gauge (SVG arc). */
export function RadialGauge({
  value,
  label,
  size = 120,
  stroke = 8,
  color = "var(--gold-glow)",
  trackColor = "rgba(255,255,255,0.1)",
}: {
  value: number;
  label?: string;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [p, setP] = useState(0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setP(value);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * p) / 100}
          style={{
            transition: "stroke-dashoffset 1400ms cubic-bezier(.2,.7,.2,1)",
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-serif text-2xl text-foreground">
            <CountUp to={value} suffix="%" />
          </div>
          {label && (
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
