import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { BLOGS, getBlog, type Blog } from "@/content/blogs";
import { DESTINATIONS } from "@/content/destinations";
import { type BlogWithPortableText } from "@/lib/sanity-queries";
import { PortableBody } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import { absUrl } from "@/lib/site-config";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const blog = getBlog(params.slug);
    const localIsAuthoritative = Boolean(
      blog &&
      (blog.questionSections?.length ||
        blog.sources?.length ||
        blog.updateNotice ||
        blog.relatedDestinations?.length),
    );
    if (blog && localIsAuthoritative) return { blog: blog as BlogWithPortableText };
    const { fetchBlogBySlug } = await import("@/lib/sanity-queries");
    const remote = await fetchBlogBySlug(params.slug);
    if (remote) return { blog: remote };
    if (blog) return { blog: blog as BlogWithPortableText };
    throw notFound();
  },
  head: ({ params, loaderData }) => {
    const b = loaderData?.blog;
    if (!b) return { meta: [{ title: "Article | Earthlink Blog" }] };
    const url = absUrl(`/blog/${params.slug}`);
    const title = b.title;
    const suffix = ` ${b.readMinutes}-min ${b.category} guide from Earthlink's UK counsellors.`;
    const description =
      (b.excerpt + suffix).length <= 158
        ? b.excerpt + suffix
        : b.excerpt.length > 158
          ? b.excerpt.slice(0, 155).trimEnd() + "..."
          : b.excerpt;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: b.tags.join(", ") },
        { name: "author", content: b.author },
        { property: "article:published_time", content: b.date },
        { property: "article:modified_time", content: b.updatedAt ?? b.date },
        { property: "article:section", content: b.category },
        { property: "article:tag", content: b.tags.join(", ") },
        { property: "og:title", content: b.title },
        { property: "og:description", content: description },
        { property: "og:image", content: b.cover },
        { property: "og:image:secure_url", content: b.cover },
        { property: "og:image:alt", content: b.coverCaption || b.title },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Earthlink Consultants" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: b.title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: b.cover },
        { name: "twitter:image:alt", content: b.coverCaption || b.title },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: b.title,
            description: b.excerpt,
            image: {
              "@type": "ImageObject",
              url: b.cover,
              caption: b.coverCaption || b.title,
            },
            thumbnailUrl: b.cover,
            datePublished: b.date,
            dateModified: b.updatedAt ?? b.date,
            author: { "@type": "Organization", name: b.author },
            publisher: {
              "@type": "Organization",
              name: "Earthlink Consultants",
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            articleSection: b.category,
            keywords: b.tags.join(", "),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: "Blog", item: absUrl("/blogs") },
              { "@type": "ListItem", position: 3, name: b.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-serif text-3xl text-navy">Article not found</h1>
      <Link to="/blogs" className="mt-4 inline-block text-brand hover:underline">
        Back to blogs
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="container-page py-24 text-center">
      <h1 className="font-serif text-2xl text-navy">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-4 text-brand hover:underline">
        Try again
      </button>
    </div>
  ),
  component: BlogPost,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogPost() {
  const { blog } = Route.useLoaderData() as {
    blog: BlogWithPortableText;
  };
  const related = BLOGS.filter((b) => b.slug !== blog.slug && b.category === blog.category).slice(
    0,
    3,
  );
  const relatedDestinations = (blog.relatedDestinations ?? [])
    .map((slug) => DESTINATIONS.find((destination) => destination.slug === slug))
    .filter((destination): destination is (typeof DESTINATIONS)[number] => Boolean(destination));
  const hasGuideSections = Boolean(blog.questionSections?.length || blog.sources?.length);

  return (
    <article className="bg-paper">
      <div className="container-page pt-8">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" /> All blogs
        </Link>
      </div>

      <header className="container-page pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">{blog.category}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-tight text-navy md:text-5xl">
          {blog.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{blog.excerpt}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          {blog.author} • {formatDate(blog.date)} • {blog.readMinutes} min read
          {blog.updatedAt && blog.updatedAt !== blog.date
            ? ` • Reviewed ${formatDate(blog.updatedAt)}`
            : ""}
        </p>
      </header>

      {hasGuideSections && (
        <nav className="container-page mt-8" aria-label="On this page">
          <div className="rounded border hairline bg-card p-4">
            <p className="text-sm font-medium text-navy">On this page</p>
            <div className="mt-2 flex snap-x gap-2 overflow-x-auto pb-1">
              <a
                href="#guide-answer"
                className="inline-flex min-h-11 shrink-0 snap-start items-center rounded-sm border hairline bg-paper px-4 text-sm text-navy hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Guide
              </a>
              {blog.questionSections?.length ? (
                <a
                  href="#questions"
                  className="inline-flex min-h-11 shrink-0 snap-start items-center rounded-sm border hairline bg-paper px-4 text-sm text-navy hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  Questions
                </a>
              ) : null}
              {blog.sources?.length ? (
                <a
                  href="#official-sources"
                  className="inline-flex min-h-11 shrink-0 snap-start items-center rounded-sm border hairline bg-paper px-4 text-sm text-navy hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  Official sources
                </a>
              ) : null}
            </div>
          </div>
        </nav>
      )}

      <div className="container-page mt-8">
        <div className="aspect-[16/8] w-full overflow-hidden rounded-lg bg-secondary">
          <SanityImage
            image={(blog as unknown as { coverRef?: unknown }).coverRef as never}
            src={blog.cover}
            alt={blog.coverCaption || blog.title}
            aspectRatio={16 / 8}
            widths={[640, 800, 1024, 1280, 1600, 1920]}
            sizes="(min-width: 1280px) 1200px, 100vw"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <section id="guide-answer" className="container-page scroll-mt-28 py-12 md:py-16">
        {blog.updateNotice ? (
          <aside className="mx-auto mb-10 max-w-3xl rounded border border-brand/30 bg-brand/10 p-6">
            <AlertTriangle className="h-5 w-5 text-brand" aria-hidden="true" />
            <h2 className="mt-3 font-serif text-xl text-navy">Check current requirements</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/80">{blog.updateNotice}</p>
            {blog.updatedAt ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Editorial review: {formatDate(blog.updatedAt)}. This is not a validity guarantee.
              </p>
            ) : null}
          </aside>
        ) : null}
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-navy/90 md:text-lg">
          {blog.portableBody ? (
            <PortableBody value={blog.portableBody} />
          ) : (
            (blog as Blog).body.map((p, i) => <p key={i}>{p}</p>)
          )}
        </div>

        {blog.questionSections?.length ? (
          <section id="questions" className="mx-auto mt-16 max-w-3xl scroll-mt-28">
            <p className="text-sm font-medium text-brand">Questions answered</p>
            <h2 className="mt-3 font-serif text-3xl text-navy">Key decisions for this guide</h2>
            <div className="mt-8 space-y-8">
              {blog.questionSections.map((section) => (
                <section key={section.question} className="rounded border hairline bg-card p-6">
                  <h3 className="font-serif text-2xl text-navy">{section.question}</h3>
                  <p className="mt-3 text-base leading-relaxed text-navy/85">{section.answer}</p>
                  {section.points?.length ? (
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </section>
        ) : null}

        {blog.sources?.length ? (
          <section id="official-sources" className="mx-auto mt-16 max-w-3xl scroll-mt-28">
            <p className="text-sm font-medium text-brand">Official source ledger</p>
            <h2 className="mt-3 font-serif text-3xl text-navy">Check the live authority pages</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {blog.sources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-start justify-between gap-4 rounded border hairline bg-card p-5 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span>
                    <span className="text-xs font-medium text-brand">{source.authority}</span>
                    <span className="mt-1 block font-serif text-lg text-navy">{source.title}</span>
                    {source.description ? (
                      <span className="mt-2 block text-sm text-muted-foreground">
                        {source.description}
                      </span>
                    ) : null}
                  </span>
                  <ExternalLink
                    className="mt-1 h-4 w-4 flex-none text-muted-foreground group-hover:text-brand"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {relatedDestinations.length ? (
          <section className="mx-auto mt-16 max-w-3xl" aria-labelledby="related-country-heading">
            <h2 id="related-country-heading" className="font-serif text-3xl text-navy">
              Related country guides
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedDestinations.map((destination) => (
                <Link
                  key={destination.slug}
                  to="/destination/$slug"
                  params={{ slug: destination.slug }}
                  className="group flex min-h-11 items-center justify-between rounded border hairline bg-card p-5 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span className="font-serif text-xl text-navy group-hover:text-brand">
                    Study in {destination.name}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground group-hover:text-brand"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border hairline px-3 py-1 text-xs text-muted-foreground"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t hairline bg-secondary/30 py-12">
          <div className="container-page">
            <h2 className="font-serif text-2xl text-navy">Related reading</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((b) => (
                <Link
                  key={b.slug}
                  to="/blog/$slug"
                  params={{ slug: b.slug }}
                  className="group overflow-hidden rounded-lg border hairline bg-paper shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <SanityImage
                      image={(b as unknown as { coverRef?: unknown }).coverRef as never}
                      src={b.cover}
                      alt={b.title}
                      aspectRatio={16 / 10}
                      widths={[320, 480, 640, 800]}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base text-navy group-hover:text-brand">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(b.date)} • {b.readMinutes} min
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
