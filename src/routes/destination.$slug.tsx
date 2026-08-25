import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  Coins,
  ExternalLink,
  FileCheck2,
  FileText,
  GraduationCap,
  Map,
  Sparkles,
} from "lucide-react";
import { COST_GUIDANCE_NOTICE } from "@/content/authority";
import { BLOGS } from "@/content/blogs";
import { COMPANY } from "@/content/company";
import { DESTINATIONS } from "@/content/destinations";
import { LandmarkLazy } from "@/components/three/landmark-lazy";
import { mailtoLink, whatsappLink } from "@/lib/lead";
import { absUrl } from "@/lib/site-config";

export const Route = createFileRoute("/destination/$slug")({
  loader: ({ params }) => {
    const d = DESTINATIONS.find((destination) => destination.slug === params.slug);
    if (!d) throw notFound();
    return { d };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.d;
    if (!d) return {};
    const url = absUrl(`/destination/${d.slug}`);
    const citations = d.sources?.map((source) => source.href) ?? [];
    return {
      meta: [
        { title: `Study in ${d.name} | Earthlink Consultants` },
        { name: "description", content: d.short },
        { property: "og:title", content: `Study in ${d.name} | Earthlink` },
        { property: "og:description", content: d.short },
        { property: "og:image", content: d.heroImage },
        { property: "og:image:secure_url", content: d.heroImage },
        { property: "og:image:alt", content: `Study in ${d.name}` },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `Study in ${d.name} | Earthlink` },
        { name: "twitter:description", content: d.short },
        { name: "twitter:image", content: d.heroImage },
        { name: "twitter:image:alt", content: `Study in ${d.name}` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `International education application support for ${d.name}`,
            description: d.directAnswer ?? d.short,
            url,
            provider: { "@id": absUrl("/#organization") },
            areaServed: "Worldwide",
            audience: { "@type": "EducationalAudience", educationalRole: "prospective student" },
            about: { "@type": d.slug === "europe" ? "Place" : "Country", name: d.name },
            ...(citations.length ? { citation: citations } : {}),
            ...(d.reviewedAt ? { dateModified: d.reviewedAt } : {}),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: d.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              {
                "@type": "ListItem",
                position: 2,
                name: "Destinations",
                item: absUrl("/destinations"),
              },
              { "@type": "ListItem", position: 3, name: d.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: DestinationPage,
});

const FALLBACK_APPLICATION_ROUTE = [
  "Choose the exact programme and verify its entry requirements",
  "Prepare the academic, language, and programme-specific documents",
  "Review the offer, conditions, provider terms, and next steps before accepting",
  "Use the live authority guidance for any visa or residence stage",
];

function DestinationPage() {
  const { d } = Route.useLoaderData() as { d: (typeof DESTINATIONS)[number] };
  const relatedDestinations = (d.relatedDestinations ?? [])
    .map((slug) => DESTINATIONS.find((destination) => destination.slug === slug))
    .filter((destination): destination is (typeof DESTINATIONS)[number] => Boolean(destination));
  const relatedGuides = (d.relatedGuides ?? [])
    .map((slug) => BLOGS.find((blog) => blog.slug === slug))
    .filter((blog): blog is (typeof BLOGS)[number] => Boolean(blog));
  const sectionLinks = [
    ["answer", "Overview"],
    ["fit", "Applicant fit"],
    ["application", "Application route"],
    ["budget", "Budget planning"],
    ["work", "Work and post-study"],
    ["questions", "Questions"],
    ...(d.sources?.length ? [["sources", "Official sources"]] : []),
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div className="absolute inset-0">
          <img
            src={d.heroImage}
            alt=""
            className="h-full w-full object-cover opacity-30"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/80 to-navy-deep" />
        </div>
        <div className="container-page relative grid items-center gap-12 py-24 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">{d.eyebrow}</p>
            <h1 className="mt-3 font-serif text-5xl text-balance md:text-7xl">{d.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">{d.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center rounded-sm bg-gold px-6 py-3 text-sm font-medium text-navy-deep hover:bg-gold-glow"
              >
                Free consultation
              </Link>
              <a
                href={whatsappLink({ country: d.name }, `Destination ${d.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-sm border border-white/25 px-6 py-3 text-sm hover:border-gold hover:text-gold"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative h-[320px] md:h-[460px]">
            <LandmarkLazy variant={d.landmark} className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-paper" aria-label="Destination highlights">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Calendar, label: "Typical starts", value: d.intakes.join(", ") },
            {
              icon: Map,
              label: "Application",
              value: d.applicationRoute?.[0] ?? "Programme-specific",
            },
            { icon: Briefcase, label: "Work guidance", value: "Check live national rules" },
            {
              icon: GraduationCap,
              label: "Popular subjects",
              value: d.courses.slice(0, 3).join(", "),
            },
          ].map((fact) => (
            <div key={fact.label} className="flex items-start gap-3">
              <fact.icon className="mt-1 h-5 w-5 flex-none text-brand" aria-hidden="true" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm text-navy">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <nav className="border-b hairline bg-card" aria-label="On this page">
        <div className="container-page py-4">
          <p className="text-sm font-medium text-navy">On this page</p>
          <div className="mt-2 flex snap-x gap-2 overflow-x-auto pb-1">
            {sectionLinks.map(([href, label]) => (
              <a
                key={href}
                href={`#${href}`}
                className="inline-flex min-h-11 shrink-0 snap-start items-center rounded-sm border hairline bg-paper px-4 text-sm text-navy hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="answer" className="container-page scroll-mt-28 py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-sm font-medium text-brand">Direct answer</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl text-navy">
              Is {d.name} a good study destination for you?
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-navy/85">
              {d.directAnswer ?? d.intro}
            </p>
          </div>
          <aside className="rounded border border-brand/30 bg-brand/10 p-6 lg:col-span-4">
            <AlertTriangle className="h-6 w-6 text-brand" aria-hidden="true" />
            <h2 className="mt-3 font-serif text-xl text-navy">Check current requirements</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy/80">
              {d.reviewNotice ??
                "Requirements change. Confirm the current position with the relevant authority and contact Earthlink before relying on this guide."}
            </p>
            {d.reviewedAt ? (
              <p className="mt-4 text-xs text-muted-foreground">
                Editorial review: {d.reviewedAt}. This is not a validity guarantee.
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      <section id="fit" className="scroll-mt-28 bg-paper">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-brand">Applicant fit</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">What to verify before applying</h2>
            <p className="mt-4 text-muted-foreground">
              A useful shortlist connects your academic profile to a verified programme and a
              realistic application plan.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            <div className="rounded border hairline bg-card p-7">
              <FileCheck2 className="h-6 w-6 text-brand" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl text-navy">Good applicant fit</h3>
              <ul className="mt-4 space-y-3 text-sm text-navy/85">
                {(d.applicantFit ?? d.whyStudy.slice(0, 4).map((item) => item.body)).map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded border hairline bg-card p-7">
              <BookOpen className="h-6 w-6 text-brand" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl text-navy">Programme verification</h3>
              <ul className="mt-4 space-y-3 text-sm text-navy/85">
                {(
                  d.programmeChecks ?? [
                    "Confirm the awarding institution and exact programme",
                    "Check entry, language, campus, delivery, and recognition",
                    "Read deposits, refunds, placement, and progression terms before paying",
                  ]
                ).map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="application" className="container-page scroll-mt-28 py-20">
        <p className="text-sm font-medium text-brand">Application route</p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl text-navy">
          Build the route around the exact programme
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {(d.applicationRoute ?? FALLBACK_APPLICATION_ROUTE).map((item, index) => (
            <li key={item} className="flex gap-4 rounded border hairline bg-card p-6">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand/15 text-sm font-medium text-navy">
                {index + 1}
              </span>
              <p className="pt-1.5 text-sm text-navy/85">{item}</p>
            </li>
          ))}
        </ol>
        {d.nationalityNotes?.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {d.nationalityNotes.map((note) => (
              <aside key={note.title} className="rounded border border-gold/40 bg-gold/10 p-6">
                <h3 className="font-serif text-xl text-navy">{note.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/80">{note.body}</p>
              </aside>
            ))}
          </div>
        ) : null}
      </section>

      <section id="budget" className="scroll-mt-28 bg-paper">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-brand">Budget planning</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">
              Plan categories, then check live costs
            </h2>
            <p className="mt-4 text-muted-foreground">{COST_GUIDANCE_NOTICE}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {d.budget.map((item) => (
              <div key={item.title} className="rounded border hairline bg-card p-6">
                <Coins className="h-5 w-5 text-brand" aria-hidden="true" />
                <h3 className="mt-3 font-serif text-xl text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.guidance}
                </p>
              </div>
            ))}
            <div className="rounded border hairline bg-card p-6">
              <GraduationCap className="h-5 w-5 text-brand" aria-hidden="true" />
              <h3 className="mt-3 font-serif text-xl text-navy">Scholarship checks</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {d.scholarships.map((scholarship) => (
                  <li key={scholarship}>{scholarship}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20" aria-labelledby="study-structure-heading">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded border hairline bg-card p-8">
            <GraduationCap className="h-6 w-6 text-brand" aria-hidden="true" />
            <h2 id="study-structure-heading" className="mt-4 font-serif text-3xl text-navy">
              Education and subject choice
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.education}</p>
            <ul className="mt-6 grid gap-2 text-sm text-navy sm:grid-cols-2">
              {d.courses.map((course) => (
                <li key={course} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden="true" />
                  {course}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border hairline bg-card p-8">
            <FileText className="h-6 w-6 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-3xl text-navy">Document categories</h2>
            <ul className="mt-4 space-y-3 text-sm text-navy">
              {d.documents.map((document) => (
                <li key={document} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden="true" />
                  {document}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-28 bg-secondary text-foreground">
        <div className="container-page grid items-start gap-8 py-16 lg:grid-cols-3">
          <div>
            <Briefcase className="h-6 w-6 text-gold" aria-hidden="true" />
            <h2 className="mt-3 font-serif text-3xl">Work and post-study</h2>
          </div>
          <p className="text-lg leading-relaxed text-foreground/85 lg:col-span-2">{d.workRights}</p>
        </div>
      </section>

      <section id="questions" className="container-page scroll-mt-28 py-20">
        <p className="text-sm font-medium text-brand">Frequently asked questions</p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl text-navy">
          Questions about studying in {d.name}
        </h2>
        <div className="mt-10 divide-y hairline border-y hairline">
          {d.faqs.map((faq) => (
            <details key={faq.q} className="group py-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                <span className="font-serif text-lg text-navy">{faq.q}</span>
                <span
                  className="text-xl text-brand transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {d.sources?.length ? (
        <section id="sources" className="scroll-mt-28 border-y hairline bg-paper">
          <div className="container-page py-20">
            <p className="text-sm font-medium text-brand">Official source ledger</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">Check the live authority pages</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {d.sources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-start justify-between gap-4 rounded border hairline bg-card p-6 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span>
                    <span className="text-xs font-medium text-brand">{source.authority}</span>
                    <span className="mt-1 block font-serif text-xl text-navy">{source.title}</span>
                    {source.description ? (
                      <span className="mt-2 block text-sm text-muted-foreground">
                        {source.description}
                      </span>
                    ) : null}
                  </span>
                  <ExternalLink
                    className="mt-1 h-5 w-5 flex-none text-muted-foreground group-hover:text-brand"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedGuides.length ? (
        <section className="container-page py-20" aria-labelledby="related-guides-heading">
          <h2 id="related-guides-heading" className="font-serif text-3xl text-navy">
            Related guides
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                to="/blog/$slug"
                params={{ slug: guide.slug }}
                className="group flex min-h-11 items-start justify-between gap-4 rounded border hairline bg-card p-6 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <span>
                  <span className="text-xs font-medium text-brand">{guide.category}</span>
                  <span className="mt-1 block font-serif text-xl text-navy group-hover:text-brand">
                    {guide.title}
                  </span>
                </span>
                <ArrowRight
                  className="mt-1 h-5 w-5 flex-none text-muted-foreground group-hover:text-brand"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-muted text-foreground">
        <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <Sparkles className="h-6 w-6 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-4xl text-balance">Ready to shortlist {d.name}?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Get a profile-led programme shortlist and a current source check before you commit.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/service/$slug"
              params={{ slug: "profile-evaluation" }}
              className="inline-flex min-h-11 items-center rounded-sm bg-gold px-6 py-3 text-sm font-medium text-navy-deep"
            >
              Start profile evaluation
            </Link>
            <a
              href={mailtoLink({ country: d.name }, `Enquiry - ${d.name}`)}
              className="inline-flex min-h-11 items-center rounded-sm border border-border px-6 py-3 text-sm"
            >
              Email {COMPANY.email}
            </a>
          </div>
        </div>
      </section>

      {relatedDestinations.length ? (
        <section className="container-page py-20" aria-labelledby="related-destinations-heading">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-destinations-heading" className="font-serif text-3xl text-navy">
              Related destinations
            </h2>
            <Link
              to="/destinations"
              className="inline-flex min-h-11 items-center text-sm text-navy hover:underline"
            >
              All destinations
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedDestinations.map((destination) => (
              <Link
                key={destination.slug}
                to="/destination/$slug"
                params={{ slug: destination.slug }}
                className="group flex min-h-11 items-center justify-between rounded border hairline bg-card p-5 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <div>
                  <p className="text-xs font-medium text-brand">Study in</p>
                  <p className="font-serif text-xl text-navy">{destination.name}</p>
                </div>
                <ArrowRight
                  className="h-5 w-5 text-muted-foreground group-hover:text-brand"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
