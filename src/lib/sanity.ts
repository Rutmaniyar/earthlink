// Sanity client + image URL builder.
// Reads projectId/dataset from Vite env (safe for browser).
// If VITE_SANITY_PROJECT_ID is not set, `sanityClient` is null and
// callers should fall back to their local static content.

import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ?? "2024-10-01";

export const sanityConfigured = Boolean(projectId);
export const SANITY_PROJECT_ID = projectId ?? "";
export const SANITY_DATASET = dataset;

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error("Sanity not configured");
  return builder.image(source);
}

// Safe helper for images that may be a Sanity image or a plain URL string fallback.
export function imgUrl(source: SanityImageSource | string | undefined | null, width = 1200): string | undefined {
  if (!source) return undefined;
  if (typeof source === "string") return source;
  if (!builder) return undefined;
  try {
    return builder.image(source).width(width).auto("format").url();
  } catch {
    return undefined;
  }
}

// Build a responsive srcSet for a Sanity image reference.
// Returns undefined for plain strings / missing sources.
export function imgSrcSet(
  source: SanityImageSource | string | undefined | null,
  widths: number[] = [320, 480, 640, 800, 1024, 1280, 1600],
  opts: { fit?: "crop" | "max"; height?: (w: number) => number } = {},
): string | undefined {
  if (!source || typeof source === "string" || !builder) return undefined;
  try {
    return widths
      .map((w) => {
        let b = builder.image(source).width(w).auto("format").quality(75);
        if (opts.height) b = b.height(opts.height(w)).fit(opts.fit ?? "crop");
        else if (opts.fit) b = b.fit(opts.fit);
        return `${b.url()} ${w}w`;
      })
      .join(", ");
  } catch {
    return undefined;
  }
}

export type { SanityImageSource };

// ---------- Health check ----------
//
// Distinguishes CORS blocks from real network failures. A CORS-blocked
// fetch in the browser rejects with a generic TypeError and no readable
// response — we treat any opaque failure against a reachable-looking host
// as "cors". A true offline / DNS / TLS failure surfaces the same way,
// so we probe a neutral endpoint first to disambiguate.

export type SanityHealth =
  | { status: "ok" }
  | { status: "not_configured" }
  | { status: "cors"; detail: string }
  | { status: "offline"; detail: string }
  | { status: "server_error"; code: number; detail: string }
  | { status: "unknown"; detail: string };

async function isOnline(): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) return false;
  try {
    // no-cors probe: succeeds (opaque response) whenever the network is up,
    // even without CORS. Failure here means the browser truly can't reach out.
    await fetch("https://www.google.com/generate_204", {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
    });
    return true;
  } catch {
    return false;
  }
}

export async function checkSanityHealth(): Promise<SanityHealth> {
  if (!projectId) return { status: "not_configured" };
  // Cheap GROQ query — returns the current dataset time. Uses the CDN and
  // triggers the same CORS preflight the app's real queries do.
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent("now()")}`;
  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (res.ok) return { status: "ok" };
    const body = await res.text().catch(() => "");
    return {
      status: "server_error",
      code: res.status,
      detail: body.slice(0, 200) || res.statusText,
    };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    const online = await isOnline();
    if (!online) return { status: "offline", detail };
    // Network is fine but the browser rejected the request — almost always
    // CORS not allow-listed for this origin.
    return { status: "cors", detail };
  }
}
