// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { BLOGS } from "./src/content/blogs";
import { DESTINATIONS } from "./src/content/destinations";
import { SERVICES } from "./src/content/company";
import { UNIVERSITY_PARTNERS } from "./src/content/universities";

const universitySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Fully static prerender routes for Cloudflare Pages.
const staticRoutes = [
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
      client: { build: { outDir: ".output/public" } },
      ssr: { build: { outDir: ".output/server" } },
    },
  },
});
