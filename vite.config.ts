// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";
import { BLOGS } from "./src/content/blogs";
import { DESTINATIONS } from "./src/content/destinations";
import { SERVICES } from "./src/content/company";
import { UNIVERSITY_PARTNERS } from "./src/content/universities";

const universitySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function loadSitemapUniversityRoutes(): string[] {
  try {
    const sitemap = readFileSync(new URL("./public/sitemap.xml", import.meta.url), "utf8");
    return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(([, loc]) => new URL(loc).pathname)
      .filter((path) => path.startsWith("/university/"));
  } catch {
    return [];
  }
}

const sitemapUniversityRoutes = loadSitemapUniversityRoutes();

// Fully static prerender routes for Cloudflare Pages.
// `prebuild` refreshes sitemap.xml from Sanity before Vite loads this config,
// so CMS-only university pages receive their own HTML instead of the SPA shell.
const staticRoutes = [
  ...new Set([
    "/",
    "/about",
    "/services",
    "/destinations",
    "/scholarships",
    "/blogs",
    "/partner-universities",
    "/partners/stonebridge",
    "/testimonials",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/style-guide",
    "/settings/sanity",
    ...SERVICES.map((s) => `/service/${s.slug}`),
    ...DESTINATIONS.map((d) => `/destination/${d.slug}`),
    ...BLOGS.map((b) => `/blog/${b.slug}`),
    ...UNIVERSITY_PARTNERS.flatMap((country) =>
      country.universities.map((university) => `/university/${universitySlug(university.name)}`),
    ),
    ...sitemapUniversityRoutes,
  ]),
];

export default defineConfig({
  nitro: false,
  tanstackStart: {
    spa: {
      enabled: true,
      // Use a real route plus a unique query so the shell request returns 200
      // without colliding with that route's own prerender task.
      maskPath: "/about?__spa-shell",
    },
    prerender: {
      enabled: true,
      // Dynamic routes are enumerated above; crawling can add invalid CMS slugs.
      crawlLinks: false,
      failOnError: true,
      // Cloudflare serves about.html at /about, matching the canonical URLs.
      autoSubfolderIndex: false,
    },
    pages: staticRoutes.map((path) => ({ path })),
  },
  vite: {
    environments: {
      client: { build: { outDir: ".output/public", sourcemap: true } },
      ssr: { build: { outDir: ".output/server" } },
    },
  },
});
