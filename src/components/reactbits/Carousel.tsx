import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  /** items visible at once on desktop */
  perView?: number;
}

/**
 * Snap-scroll carousel with arrows, dots, and optional auto-play.
 * Uses native scroll-snap so it's keyboard/touch friendly out of the box.
 */
export default function Carousel({
  items,
  autoPlay = true,
  interval = 5000,
  className = "",
  perView = 1,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(i);
  }, []);

  const next = useCallback(() => scrollTo((active + 1) % items.length), [active, items.length, scrollTo]);
  const prev = useCallback(() => scrollTo((active - 1 + items.length) % items.length), [active, items.length, scrollTo]);

  useEffect(() => {
    if (!autoPlay || paused || !visible) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, visible, interval, next]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const root = track.parentElement;
    if (!root) return;
    let intersecting = true;
    const sync = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry?.isIntersecting ?? true;
      sync();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // sync active index on manual scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        children.forEach((c, i) => {
          const mid = c.offsetLeft + c.clientWidth / 2 - track.offsetLeft;
          const d = Math.abs(mid - center);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const basis = perView === 1 ? "basis-full" : perView === 2 ? "md:basis-1/2 basis-full" : "lg:basis-1/3 md:basis-1/2 basis-full";

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth gap-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={i} className={`${basis} shrink-0 grow-0 snap-center`}>
            {item}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-navy/90 text-foreground shadow-lg backdrop-blur transition hover:bg-secondary"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-navy/90 text-foreground shadow-lg backdrop-blur transition hover:bg-secondary"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-brand" : "w-2 bg-navy/30 hover:bg-navy/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
