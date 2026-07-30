import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { useEffect, useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { BLOGS, BLOG_CATEGORIES, type Blog } from "@/content/blogs";
import { fetchBlogListResult } from "@/lib/sanity-queries";
import { checkSanityHealth, type SanityHealth } from "@/lib/sanity";
import { SanityImage } from "@/components/sanity-image";
import { BlogCardSkeleton, CmsStatus } from "@/components/cms-status";

const BLOGS_TITLE = "Study Abroad Blog — Earthlink Consultants UK";
const BLOGS_DESC =
  "Fresh visa updates, scholarship playbooks, SOP templates and university insights — practical guides from Earthlink's UK counsellors, updated weekly.";

const PAGE_SIZE = 6;

const CATEGORY_VALUES = ["All", ...BLOG_CATEGORIES] as const;

const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
  q: fallback(z.string(), "").default(""),
  cat: fallback(z.enum(CATEGORY_VALUES), "All").default("All"),
  tag: fallback(z.string(), "").default(""),
});

const FEATURED_COVER = BLOGS[0]?.cover;

export const Route = createFileRoute("/blogs")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: BLOGS_TITLE },
      { name: "description", content: BLOGS_DESC },
      { property: "og:title", content: BLOGS_TITLE },
      { property: "og:description", content: BLOGS_DESC },
      ...(FEATURED_COVER
        ? [
            { property: "og:image", content: FEATURED_COVER } as const,
            { property: "og:image:secure_url", content: FEATURED_COVER } as const,
            { property: "og:image:alt", content: BLOGS[0].coverCaption || BLOGS[0].title } as const,
            { name: "twitter:image", content: FEATURED_COVER } as const,
            {
              name: "twitter:image:alt",
              content: BLOGS[0].coverCaption || BLOGS[0].title,
            } as const,
          ]
        : []),
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/blogs") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: BLOGS_TITLE },
      { name: "twitter:description", content: BLOGS_DESC },
    ],
    links: [{ rel: "canonical", href: absUrl("/blogs") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: BLOGS_TITLE,
          description: BLOGS_DESC,
          url: absUrl("/blogs"),
          publisher: { "@type": "Organization", name: "Earthlink Consultants" },
          blogPost: BLOGS.map((b) => ({
            "@type": "BlogPosting",
            headline: b.title,
            url: absUrl(`/blog/${b.slug}`),
            datePublished: b.date,
            image: b.cover,
            author: { "@type": "Organization", name: b.author },
          })),
        }),
      },
    ],
  }),
  component: BlogsPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BlogsPage() {
  const { page, q, cat, tag } = Route.useSearch();
  const navigate = useNavigate({ from: "/blogs" });

  const [posts, setPosts] = useState<Blog[]>(BLOGS);
  const [cmsState, setCmsState] = useState<"loading" | "error" | "idle">("loading");
  const [reloadKey, setReloadKey] = useState(0);
  const [cmsHealth, setCmsHealth] = useState<SanityHealth | null>(null);
  const [cmsError, setCmsError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    setCmsState("loading");
    setCmsError(null);
    fetchBlogListResult().then(async (res) => {
      if (cancelled) return;
      if (res.status === "ok" && res.data.length > 0) {
        setPosts(res.data);
        setCmsHealth({ status: "ok" });
        setCmsError(null);
        setCmsState("idle");
      } else if (res.status === "error") {
        setCmsError(res.error);
        console.error("[cms] blog list fetch failed:", res.error);
        const health = await checkSanityHealth();
        if (cancelled) return;
        console.error("[cms] health probe result:", health);
        setCmsHealth(health);
        setCmsState(health.status === "ok" ? "idle" : "error");
      } else {
        setCmsState("idle");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  // Top tags by frequency across the current post set (Sanity or fallback).
  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 20)
      .map(([t]) => t);
  }, [posts]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const activeTag = tag.trim().toLowerCase();
    return posts
      .filter((b) => {
        const matchCat = cat === "All" || b.category === cat;
        const matchTag = !activeTag || b.tags.some((t) => t.toLowerCase() === activeTag);
        const matchQ =
          !query ||
          b.title.toLowerCase().includes(query) ||
          b.excerpt.toLowerCase().includes(query) ||
          b.tags.some((t) => t.toLowerCase().includes(query));
        return matchCat && matchTag && matchQ;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, cat, tag, posts]);

  // Featured only on page 1 (and only when no filters applied)
  const hasFilters = q.length > 0 || cat !== "All" || tag.length > 0;
  const showFeatured = page === 1 && !hasFilters;
  const list = showFeatured ? filtered.slice(1) : filtered;
  const featured = showFeatured ? filtered[0] : undefined;

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = list.slice(start, start + PAGE_SIZE);

  type Search = z.infer<typeof searchSchema>;
  const setQuery = (value: string) =>
    navigate({ search: (prev: Search) => ({ ...prev, q: value, page: 1 }), replace: true });
  const setCat = (value: (typeof CATEGORY_VALUES)[number]) =>
    navigate({ search: (prev: Search) => ({ ...prev, cat: value, page: 1 }) });
  const setTag = (value: string) =>
    navigate({ search: (prev: Search) => ({ ...prev, tag: value, page: 1 }) });
  const setPage = (n: number) => navigate({ search: (prev: Search) => ({ ...prev, page: n }) });
  const clearAll = () =>
    navigate({ search: () => ({ page: 1, q: "", cat: "All" as const, tag: "" }) });

  return (
    <div className="bg-paper">
      <section className="border-b hairline bg-gradient-to-b from-secondary/40 to-paper">
        <div className="container-page py-16 md:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">Insights</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-navy md:text-5xl">
            The Earthlink Blog
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Visa updates, admissions playbooks, scholarship deep-dives, and honest guides for
            students planning studies in the UK, USA, Canada, Australia and beyond.
          </p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              value={q}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, tags…"
              className="w-full max-w-sm rounded-sm border hairline bg-paper px-4 py-2.5 text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              aria-label="Search blogs"
            />
            <div className="flex flex-wrap gap-2">
              {CATEGORY_VALUES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
                    (cat === c
                      ? "border-brand bg-brand text-white"
                      : "hairline text-navy hover:border-brand hover:text-brand")
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {topTags.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Popular tags
              </p>
              <div className="flex flex-wrap gap-2">
                {topTags.map((t) => {
                  const active = t.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={t}
                      onClick={() => setTag(active ? "" : t)}
                      aria-pressed={active}
                      className={
                        "rounded-full border px-2.5 py-0.5 text-[11px] transition-colors " +
                        (active
                          ? "border-brand bg-brand text-white"
                          : "hairline text-muted-foreground hover:border-brand hover:text-brand")
                      }
                    >
                      #{t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {hasFilters && (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Active filters:</span>
              {q && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-full border hairline px-2.5 py-0.5 text-navy hover:border-brand hover:text-brand"
                >
                  “{q}” ✕
                </button>
              )}
              {cat !== "All" && (
                <button
                  onClick={() => setCat("All")}
                  className="rounded-full border hairline px-2.5 py-0.5 text-navy hover:border-brand hover:text-brand"
                >
                  {cat} ✕
                </button>
              )}
              {tag && (
                <button
                  onClick={() => setTag("")}
                  className="rounded-full border hairline px-2.5 py-0.5 text-navy hover:border-brand hover:text-brand"
                >
                  #{tag} ✕
                </button>
              )}
              <button
                onClick={clearAll}
                className="ml-1 text-brand hover:text-gold hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <CmsStatus
          state={cmsState}
          loadingLabel="Checking for the latest posts…"
          health={cmsHealth}
          errorDetail={cmsError}
          onRetry={() => setReloadKey((k) => k + 1)}
        />

        {filtered.length === 0 && cmsState !== "loading" && (
          <p className="py-16 text-center text-muted-foreground">
            No articles match your search. Try a different keyword or category.
          </p>
        )}

        {featured && (
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid overflow-hidden rounded-lg border hairline bg-paper shadow-sm transition-shadow hover:shadow-md md:grid-cols-2"
          >
            <div className="aspect-[16/10] overflow-hidden bg-secondary md:aspect-auto">
              <SanityImage
                image={(featured as unknown as { coverRef?: unknown }).coverRef as never}
                src={featured.cover}
                alt={featured.coverCaption || featured.title}
                loading="eager"
                fetchPriority="high"
                aspectRatio={16 / 10}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-brand">
                <span>Featured</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{featured.category}</span>
              </div>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-navy group-hover:text-brand md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">{featured.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {featured.author} • {formatDate(featured.date)} • {featured.readMinutes} min read
              </p>
            </div>
          </Link>
        )}

        {pageItems.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((b: Blog) => (
              <Link
                key={b.slug}
                to="/blog/$slug"
                params={{ slug: b.slug }}
                className="group flex flex-col overflow-hidden rounded-lg border hairline bg-paper shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  <SanityImage
                    image={(b as unknown as { coverRef?: unknown }).coverRef as never}
                    src={b.cover}
                    alt={b.coverCaption || b.title}
                    aspectRatio={16 / 10}
                    widths={[320, 480, 640, 800]}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs uppercase tracking-wider text-brand">{b.category}</span>
                  <h3 className="mt-2 font-serif text-lg leading-snug text-navy group-hover:text-brand">
                    {b.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{b.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {formatDate(b.date)} • {b.readMinutes} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {cmsState === "loading" && pageItems.length === 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Blog pagination"
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="rounded-sm border hairline px-3 py-1.5 text-sm text-navy transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-current={n === currentPage ? "page" : undefined}
                className={
                  "min-w-9 rounded-sm border px-3 py-1.5 text-sm transition-colors " +
                  (n === currentPage
                    ? "border-brand bg-brand text-white"
                    : "hairline text-navy hover:border-brand hover:text-brand")
                }
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="rounded-sm border hairline px-3 py-1.5 text-sm text-navy transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </nav>
        )}

        {filtered.length > 0 && (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Showing {start + 1}–{Math.min(start + PAGE_SIZE, list.length)} of {list.length}
            {showFeatured ? " (plus featured)" : ""}
          </p>
        )}
      </section>
    </div>
  );
}
