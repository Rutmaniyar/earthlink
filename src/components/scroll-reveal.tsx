import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const MOTION_SELECTORS = [
  { selector: "main section", type: "section" },
  { selector: "main h1, main h2", type: "headline" },
  { selector: "main h3, main h4", type: "subhead" },
  {
    selector: "main article, main aside, main form, main .bento-tile, main .bento-tile-light",
    type: "card",
  },
  { selector: "main img, main iframe, main canvas, main [class*='aspect-']", type: "media" },
  { selector: "main ol > li, main ul > li", type: "item" },
] as const;

const MAX_STAGGER = 10;

/**
 * Client-only initializer that:
 *  1. Adds typed motion hooks to sections, headings, cards, media, form blocks,
 *     and list items (opt out with data-reveal="off").
 *  2. Observes every element independently and adds `.in-view` on intersection.
 *  3. Maintains lightweight scroll state for direction/progress styling.
 *  4. Applies a light parallax translateY to elements marked `data-parallax`.
 *
 * Re-runs on route change so new pages get wired up.
 */
export function ScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    let lastY = window.scrollY;
    const root = document.documentElement;

    const update = () => {
      const y = window.scrollY || root.scrollTop;
      const max = Math.max(1, root.scrollHeight - root.clientHeight);
      root.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, y / max))));
      root.dataset.scrollDir =
        y > lastY + 2 ? "down" : y < lastY - 2 ? "up" : (root.dataset.scrollDir ?? "up");
      root.dataset.scrolled = y > 24 ? "true" : "false";
      lastY = y;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Reveal on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup = () => {};
    const timer = window.setTimeout(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const groups = new Map<Element, number>();
      const targets = new Set<HTMLElement>();

      for (const { selector, type } of MOTION_SELECTORS) {
        document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
          if (el.dataset.reveal === "off") return;
          if (el.closest("[data-reveal='off']")) return;
          if (el.closest("header, footer, [aria-hidden='true']")) return;
          if (type === "item" && el.closest("[data-motion='card']")) return;

          el.dataset.reveal = el.dataset.reveal || "";
          el.dataset.motion = el.dataset.motion || type;

          const parent = el.parentElement ?? document.body;
          const next = groups.get(parent) ?? 0;
          groups.set(parent, next + 1);
          const index = Math.min(next, MAX_STAGGER);
          el.style.setProperty("--reveal-delay", `${index * 45}ms`);
          targets.add(el);
        });
      }

      if (!targets.size) return;

      if (reduceMotion) {
        targets.forEach((el) => el.classList.add("in-view"));
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              io.unobserve(e.target);
            }
          }
        },
        { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
      );

      targets.forEach((el) => io.observe(el));
      cleanup = () => io.disconnect();
    }, 250);

    return () => {
      window.clearTimeout(timer);
      cleanup();
    };
  }, [pathname]);

  // Parallax
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!els.length) return;

    let raf = 0;
    const update = () => {
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Only animate while element is roughly in viewport
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.2");
        const offset = (rect.top - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
