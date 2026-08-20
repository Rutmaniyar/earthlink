import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Info, X } from "lucide-react";

interface InfoBadgeProps {
  title: string;
  children: ReactNode;
  cta?: { label: string; href: string; external?: boolean };
  tone?: "dark" | "light";
  positionClass?: string;
}

/**
 * Info badge that opens a popover on hover (desktop) or tap (mobile).
 * The popover uses `position: fixed` so it escapes tiles with overflow: hidden.
 */
export default function InfoBadge({
  title,
  children,
  cta,
  tone = "dark",
  positionClass = "top-2 right-2",
}: InfoBadgeProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    placement: "below" | "above";
  } | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }

    let repositionFrame = 0;
    const reposition = () => {
      const btn = btnRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const popW = 288; // w-72
      const popH = popRef.current?.offsetHeight ?? 180;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const spaceBelow = vh - r.bottom;
      const placement: "below" | "above" = spaceBelow < popH + 16 ? "above" : "below";
      let left = r.right - popW; // align right edges
      left = Math.max(8, Math.min(left, vw - popW - 8));
      const top = placement === "below" ? r.bottom + 8 : r.top - popH - 8;
      setPos({ top, left, placement });
    };
    const scheduleReposition = () => {
      cancelAnimationFrame(repositionFrame);
      repositionFrame = requestAnimationFrame(reposition);
    };

    reposition();
    window.addEventListener("scroll", scheduleReposition, true);
    window.addEventListener("resize", scheduleReposition);
    return () => {
      cancelAnimationFrame(repositionFrame);
      window.removeEventListener("scroll", scheduleReposition, true);
      window.removeEventListener("resize", scheduleReposition);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (popRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const stop = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const popTone =
    tone === "dark"
      ? "border-border bg-navy-deep/95 text-foreground"
      : "border-border bg-card text-navy";
  const btnTone =
    tone === "dark"
      ? "border-border bg-navy-deep/70 text-foreground/85 hover:border-gold hover:text-gold"
      : "border-border bg-paper/95 text-navy/70 hover:border-brand hover:text-brand";

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={`More about ${title}`}
        aria-expanded={open}
        onClick={(e) => {
          stop(e);
          setOpen((o) => !o);
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={(e) => {
          // keep open if moving into popover
          const next = e.relatedTarget as Node | null;
          if (next && popRef.current?.contains(next)) return;
          setOpen(false);
        }}
        onFocus={() => setOpen(true)}
        className={`absolute z-20 ${positionClass} grid h-7 w-7 place-items-center rounded-full border backdrop-blur transition ${btnTone}`}
      >
        <Info className="h-3.5 w-3.5" />
      </button>

      {open && pos && (
        <div
          ref={popRef}
          role="dialog"
          aria-label={title}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={stop}
          style={{ position: "fixed", top: pos.top, left: pos.left, width: 288 }}
          className={`z-50 rounded-xl border p-4 shadow-2xl backdrop-blur ${popTone} animate-fade-in`}
        >
          <div className="flex items-start justify-between gap-3">
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${tone === "dark" ? "text-gold-glow" : "text-brand"}`}
            >
              {title}
            </p>
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                stop(e);
                setOpen(false);
              }}
              className="opacity-60 hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div
            className={`mt-2 text-xs leading-relaxed ${tone === "dark" ? "text-foreground/85" : "text-muted-foreground"}`}
          >
            {children}
          </div>
          {cta && (
            <a
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener" : undefined}
              onClick={(e) => e.stopPropagation()}
              className={`mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest ${
                tone === "dark" ? "text-gold hover:text-gold-glow" : "text-brand hover:underline"
              }`}
            >
              {cta.label} →
            </a>
          )}
        </div>
      )}
    </>
  );
}
