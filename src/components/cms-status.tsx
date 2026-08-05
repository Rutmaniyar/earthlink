import { AlertTriangle, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import type { SanityHealth } from "@/lib/sanity";

function healthCode(h: SanityHealth | null | undefined): string | null {
  if (!h) return null;
  if (h.status === "server_error") return `HTTP ${h.code}`;
  return h.status.toUpperCase();
}

function healthMessage(h: SanityHealth | null | undefined): {
  title: string;
  hint?: string;
  showSettingsLink: boolean;
} {
  if (!h)
    return { title: "Couldn't load latest content — showing saved copy.", showSettingsLink: false };
  switch (h.status) {
    case "cors":
      return {
        title: "The CMS blocked this browser — showing our saved copy.",
        hint: "Your Sanity project isn't allowing requests from this origin. Add it under API → CORS origins.",
        showSettingsLink: true,
      };
    case "offline":
      return {
        title: "You appear to be offline — showing our saved copy.",
        hint: "Reconnect to the internet, then retry.",
        showSettingsLink: false,
      };
    case "server_error":
      return {
        title: `The CMS returned an error (${h.code}) — showing our saved copy.`,
        hint: "This is usually temporary. Try again in a moment.",
        showSettingsLink: false,
      };
    case "not_configured":
      return {
        title: "The CMS isn't configured yet — showing our saved copy.",
        showSettingsLink: false,
      };
    default:
      return {
        title: "Couldn't reach the CMS — showing our saved copy.",
        showSettingsLink: true,
      };
  }
}

/**
 * Inline status strip shown above CMS-backed lists. Non-blocking:
 * the existing static/cached content stays visible underneath.
 */
export function CmsStatus({
  state,
  loadingLabel = "Loading latest content…",
  errorLabel,
  health,
  errorDetail,
  onRetry,
}: {
  state: "loading" | "error" | "idle";
  loadingLabel?: string;
  /** Optional override for the error headline. When omitted, the label is derived from `health`. */
  errorLabel?: string;
  /** Result of checkSanityHealth() — drives the specific guidance shown. */
  health?: SanityHealth | null;
  /** Original error message from the failing fetch, shown in the Details drawer. */
  errorDetail?: string | null;
  onRetry?: () => void;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || state === "idle") return null;
  if (state === "error" && dismissed) return null;

  if (state === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mb-6 flex items-center gap-2 rounded-md border hairline bg-secondary/40 px-4 py-2 text-xs text-muted-foreground"
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" aria-hidden />
        <span>{loadingLabel}</span>
      </div>
    );
  }

  const msg = healthMessage(health);
  const title = errorLabel ?? msg.title;
  const code = healthCode(health);
  const detailLines = [
    code ? `Code: ${code}` : null,
    health && "detail" in health && health.detail ? `Probe: ${health.detail}` : null,
    errorDetail ? `Fetch: ${errorDetail}` : null,
  ].filter(Boolean) as string[];

  return (
    <div
      role="alert"
      className="mb-6 flex flex-col gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-900 dark:text-amber-200"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <div className="flex-1 space-y-1">
          <p className="font-medium">
            {title}
            {code && (
              <span className="ml-2 rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                {code}
              </span>
            )}
          </p>
          {msg.hint && <p className="text-[11px] opacity-90">{msg.hint}</p>}
        </div>
        <div className="flex items-center gap-1">
          {detailLines.length > 0 && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="rounded border border-amber-600/40 px-2 py-0.5 font-medium hover:bg-amber-500/20"
            >
              {open ? "Hide details" : "Details"}
            </button>
          )}
          {msg.showSettingsLink && (
            <Link
              to="/settings/sanity"
              className="rounded border border-amber-600/40 px-2 py-0.5 font-medium hover:bg-amber-500/20"
            >
              Fix
            </Link>
          )}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded border border-amber-600/40 px-2 py-0.5 font-medium hover:bg-amber-500/20"
            >
              Retry
            </button>
          )}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setDismissed(true)}
            className="rounded p-0.5 hover:bg-amber-500/20"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {open && detailLines.length > 0 && (
        <pre className="mt-1 max-h-48 overflow-auto rounded bg-amber-950/10 p-2 font-mono text-[11px] leading-relaxed text-amber-950/90 dark:bg-amber-950/40 dark:text-amber-100">
          {detailLines.join("\n")}
        </pre>
      )}
    </div>
  );
}

/**
 * Placeholder card matching the blog grid card footprint.
 */
export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border hairline bg-paper shadow-sm">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="mt-2 h-3 w-1/3" />
      </div>
    </div>
  );
}

/**
 * Placeholder card matching the university flip-card footprint.
 */
export function UniversityCardSkeleton() {
  return (
    <div className="flex h-72 w-full flex-col items-center justify-center gap-4 rounded-md border hairline bg-gradient-to-br from-paper to-secondary/40 p-6">
      <Skeleton className="h-20 w-20 rounded-xl" />
      <div className="flex w-full flex-col items-center gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="mt-auto h-3 w-2/3" />
    </div>
  );
}
