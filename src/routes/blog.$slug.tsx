import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { BLOGS, getBlog, type Blog } from "@/content/blogs";
import { fetchBlogBySlug, type BlogWithPortableText } from "@/lib/sanity-queries";
import { PortableBody } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import { absUrl } from "@/lib/site-config";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const blog = getBlog(params.slug);
    if (blog) return { blog: blog as BlogWithPortableText, refreshFromCms: true };
    const remote = await fetchBlogBySlug(params.slug);
    if (!remote) throw notFound();
    return { blog: remote, refreshFromCms: false };
  },
  head: ({ params, loaderData }) => {
    const b = loaderData?.blog;
    if (!b) return { meta: [{ title: "Article — Earthlink Blog" }] };
    const url = absUrl(`/blog/${params.slug}`);
    const title = b.title;
    const suffix = ` ${b.readMinutes}-min ${b.category} guide from Earthlink's UK counsellors.`;
    const description =
      (b.excerpt + suffix).length <= 158
        ? b.excerpt + suffix
        : b.excerpt.length > 158
          ? b.excerpt.slice(0, 155).trimEnd() + "…"
          : b.excerpt;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: b.tags.join(", ") },
        { name: "author", content: b.author },
        { property: "article:published_time", content: b.date },
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
            dateModified: b.date,
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
  const { blog: initialBlog, refreshFromCms } = Route.useLoaderData() as {
    blog: BlogWithPortableText;
    refreshFromCms: boolean;
  };
  const [cmsBlog, setCmsBlog] = useState<BlogWithPortableText | null>(null);

  useEffect(() => {
    if (!refreshFromCms) return;
    let cancelled = false;
    fetchBlogBySlug(initialBlog.slug).then((blog) => {
      if (!cancelled && blog) setCmsBlog(blog);
    });
    return () => {
      cancelled = true;
    };
  }, [initialBlog.slug, refreshFromCms]);

  const blog = cmsBlog?.slug === initialBlog.slug ? cmsBlog : initialBlog;
  const related = BLOGS.filter((b) => b.slug !== blog.slug && b.category === blog.category).slice(
    0,
    3,
  );

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
        </p>
      </header>

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

      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-navy/90 md:text-lg">
          {blog.portableBody ? (
            <PortableBody value={blog.portableBody} />
          ) : (
            (blog as Blog).body.map((p, i) => <p key={i}>{p}</p>)
          )}
        </div>

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
