#!/usr/bin/env node
// Build-time sitemap generator. Writes public/sitemap.xml so it ships with the
// static build. Reads content sources directly via a tiny TS→JS strip so we don't
// need a separate compile step. Since content files are plain data exports, we
// use tsx-like dynamic import via the bundled runtime.

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Register a TS loader so we can import .ts content modules directly.
// Node 22 doesn't natively load TS — bun run handles it.
async function loadContent() {
  const [{ BLOGS }, { DESTINATIONS }, { SERVICES }] = await Promise.all([
    import(pathToFileURL(resolve(root, "src/content/blogs.ts")).href),
    import(pathToFileURL(resolve(root, "src/content/destinations.ts")).href),
    import(pathToFileURL(resolve(root, "src/content/company.ts")).href),
  ]);
  return { BLOGS, DESTINATIONS, SERVICES };
}

const DEFAULT_SITE_URL = "https://www.earthlink.org.uk";
const BASE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(
  /\/+$/,
  "",
);

const xmlEscape = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const today = new Date().toISOString().split("T")[0];

const staticEntries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "weekly", priority: "0.8" },
  { path: "/services", changefreq: "weekly", priority: "0.8" },
  { path: "/destinations", changefreq: "weekly", priority: "0.8" },
  { path: "/scholarships", changefreq: "weekly", priority: "0.7" },
  { path: "/blogs", changefreq: "weekly", priority: "0.7" },
  { path: "/partner-universities", changefreq: "weekly", priority: "0.7" },
  { path: "/contact", changefreq: "weekly", priority: "0.8" },
  { path: "/testimonials", changefreq: "monthly", priority: "0.6" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/partners/stonebridge", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

async function main() {
  const { BLOGS, DESTINATIONS, SERVICES } = await loadContent();

  const entries = [
    ...staticEntries,
    ...SERVICES.map((s) => ({
      path: `/service/${s.slug}`,
      changefreq: "monthly",
      priority: "0.6",
    })),
    ...DESTINATIONS.map((d) => ({
      path: `/destination/${d.slug}`,
      changefreq: "monthly",
      priority: "0.7",
    })),
    ...BLOGS.map((b) => ({
      path: `/blog/${b.slug}`,
      lastmod: b.date,
      changefreq: "monthly",
      priority: "0.6",
      images: b.cover ? [{ loc: b.cover, title: b.title, caption: b.excerpt }] : undefined,
    })),
  ];

  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${e.lastmod || today}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      ...(e.images ?? []).flatMap((img) => [
        `    <image:image>`,
        `      <image:loc>${xmlEscape(img.loc)}</image:loc>`,
        img.title ? `      <image:title>${xmlEscape(img.title)}</image:title>` : null,
        img.caption ? `      <image:caption>${xmlEscape(img.caption)}</image:caption>` : null,
        `    </image:image>`,
      ]),
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
    ...urls,
    `</urlset>`,
  ].join("\n");

  mkdirSync(resolve(root, "public"), { recursive: true });
  writeFileSync(resolve(root, "public/sitemap.xml"), xml, "utf8");
  console.log(`✓ sitemap.xml written (${entries.length} urls)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
