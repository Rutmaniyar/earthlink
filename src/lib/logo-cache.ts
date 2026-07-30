// Persistent client-side cache for university logo URLs.
// We probe several favicon services in order; once one succeeds for a domain
// we remember it in localStorage so subsequent visits skip the failed probes.
// Browser HTTP cache handles the actual image bytes.

const KEY = "earthlink:logo-cache:v1";
const TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

type Entry = { src: string | null; ts: number }; // src === null means "all sources failed"
type Cache = Record<string, Entry>;

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function read(): Cache {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Cache) : {};
  } catch {
    return {};
  }
}

function write(cache: Cache) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // quota exceeded — prune oldest half
    const entries = Object.entries(cache).sort((a, b) => a[1].ts - b[1].ts);
    const pruned: Cache = {};
    entries.slice(Math.floor(entries.length / 2)).forEach(([k, v]) => (pruned[k] = v));
    try {
      localStorage.setItem(KEY, JSON.stringify(pruned));
    } catch {
      // give up silently
    }
  }
}

export function getCachedLogo(domain: string): Entry | undefined {
  const cache = read();
  const entry = cache[domain];
  if (!entry) return undefined;
  if (Date.now() - entry.ts > TTL_MS) return undefined;
  return entry;
}

export function setCachedLogo(domain: string, src: string | null) {
  const cache = read();
  cache[domain] = { src, ts: Date.now() };
  write(cache);
}
