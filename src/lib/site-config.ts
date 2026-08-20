// Site-wide constants used to build absolute URLs (canonical, og:url, JSON-LD).
// Override in dev via VITE_SITE_URL when needed.

const RAW = (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://www.earthlink.org.uk";

// Normalize: strip trailing slash so `${SITE_URL}${path}` never doubles up.
export const SITE_URL = RAW.replace(/\/+$/, "");

export const SITE_NAME = "Earthlink Consultants";

/** Absolute URL for a given app path (leading slash required). */
export function absUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
