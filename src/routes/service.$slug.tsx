import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES, JOURNEY, COMPANY } from "@/content/company";
import { SERVICE_DETAILS, type ServiceDetail } from "@/content/faqs";
import { whatsappLink, mailtoLink } from "@/lib/lead";
import { absUrl } from "@/lib/site-config";
import { Check, ArrowRight, CheckCircle2, Package, Plus } from "lucide-react";
import { SERVICE_ICON_MAP } from "@/lib/service-icons";
import ogProfileEvaluation from "@/assets/og/profile-evaluation.jpg";
import ogCareerCounselling from "@/assets/og/career-counselling.jpg";
import ogUniversityShortlisting from "@/assets/og/university-shortlisting.jpg";
import ogAdmissionAssistance from "@/assets/og/admission-assistance.jpg";
import ogDocumentation from "@/assets/og/documentation.jpg";
import ogFinancialPlanning from "@/assets/og/financial-planning.jpg";
import ogStudentVisa from "@/assets/og/student-visa.jpg";
import ogVisitVisa from "@/assets/og/visit-visa.jpg";
import ogRecruitment from "@/assets/og/recruitment.jpg";
import ogPreDeparture from "@/assets/og/pre-departure.jpg";

const SERVICE_OG: Record<string, string> = {
  "profile-evaluation": ogProfileEvaluation,
  "career-counselling": ogCareerCounselling,
  "university-shortlisting": ogUniversityShortlisting,
  "admission-assistance": ogAdmissionAssistance,
  documentation: ogDocumentation,
  "financial-planning": ogFinancialPlanning,
  "student-visa": ogStudentVisa,
  "visit-visa": ogVisitVisa,
  recruitment: ogRecruitment,
  "pre-departure": ogPreDeparture,
};

const SERVICE_SEO: Record<string, { title: string; description: string; heading: string }> = {
  "admission-assistance": {
    title: "University Admission Help in Harrow | Earthlink",
    description:
      "University application and admission help in Harrow or online worldwide, including personal statements, documents, forms, and deadline tracking.",
    heading: "University application and admission help in Harrow",
  },
  "student-visa": {
    title: "Student Visa Support in Harrow | Earthlink & Stonebridge",
    description:
      "Student visa support in Harrow: Earthlink supports non-UK routes, while Stonebridge alone provides all UK visa advice and application processing.",
    heading: "Student visa support in Harrow — UK cases by Stonebridge",
  },
  "visit-visa": {
    title: "Visitor Visa Support in Harrow | Earthlink & Stonebridge",
    description:
      "Visitor visa support in Harrow: Earthlink supports non-UK routes, while Stonebridge alone provides all UK visa advice and application processing.",
    heading: "Visitor visa support in Harrow — UK cases by Stonebridge",
  },
};

export const Route = createFileRoute("/service/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service || !SERVICE_DETAILS[params.slug]) throw notFound();
    return { service, detail: SERVICE_DETAILS[params.slug] };
  },
  head: ({ params, loaderData }) => {
    const t = loaderData?.service.title ?? "Service";
    const seo = SERVICE_SEO[params.slug];
    const desc = seo?.description ?? loaderData?.service.blurb ?? "";
    const url = absUrl(`/service/${params.slug}`);
    const title = seo?.title ?? `${t} — Earthlink Consultants`;
    const ogImage = SERVICE_OG[params.slug];
    const isVisaService = params.slug === "student-visa" || params.slug === "visit-visa";
    const isRecruitmentService = params.slug === "recruitment";
    const earthlinkProvider = {
      "@type": "Organization",
      "@id": absUrl("/#organization"),
      name: COMPANY.name,
      email: COMPANY.email,
      telephone: COMPANY.phoneHref,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
        addressLocality: COMPANY.address.city,
        postalCode: COMPANY.address.postcode,
        addressCountry: "GB",
      },
    };
    const offerCatalog = loaderData
      ? {
          "@type": "OfferCatalog",
          name: `${loaderData.service.title} — what's included`,
          itemListElement: (loaderData.detail.included as string[]).map((item, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: { "@type": "Service", name: item },
          })),
        }
      : undefined;
    const serviceSchema = loaderData
      ? isVisaService
        ? {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": `${url}#non-uk-service`,
                name: `Non-UK ${loaderData.service.title} support`,
                description: loaderData.service.blurb,
                serviceType: `Non-UK ${loaderData.service.title} support`,
                url,
                provider: earthlinkProvider,
                areaServed: {
                  "@type": "Place",
                  name: "Worldwide excluding the United Kingdom",
                },
                ...(ogImage ? { image: ogImage } : {}),
                hasOfferCatalog: offerCatalog,
              },
              {
                "@type": "Service",
                "@id": `${url}#uk-service`,
                name: `UK ${loaderData.service.title} advice and application processing`,
                description:
                  "All advice and application processing for this UK visa route is provided only by Stonebridge Legal Solutions under a separate contract.",
                serviceType: `UK ${loaderData.service.title} advice and application processing`,
                url,
                provider: {
                  "@type": "Organization",
                  name: COMPANY.solicitors.name,
                  url: "https://stonebridgelegal.co.uk/",
                },
                areaServed: { "@type": "Country", name: "United Kingdom" },
                termsOfService:
                  "Earthlink does not provide UK immigration advice or prepare UK visa applications. Stonebridge provides all UK visa advice and application processing under a separate contract.",
              },
            ],
          }
        : {
            "@context": "https://schema.org",
            "@type": "Service",
            name: seo?.heading ?? loaderData.service.title,
            description: desc,
            serviceType: loaderData.service.title,
            url,
            ...(ogImage ? { image: ogImage } : {}),
            provider: earthlinkProvider,
            areaServed: "120+ countries served",
            ...(isRecruitmentService
              ? {
                  termsOfService:
                    "Job-search support only. Earthlink does not procure sponsorship, arrange sponsor licences, sell jobs, or guarantee employment.",
                }
              : {}),
            hasOfferCatalog: offerCatalog,
          }
      : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: COMPANY.name },
        ...(ogImage
          ? [
              { property: "og:image", content: ogImage },
              { property: "og:image:width", content: "1216" },
              { property: "og:image:height", content: "640" },
              { property: "og:image:alt", content: `${t} — Earthlink Consultants` },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        ...(ogImage ? [{ name: "twitter:image", content: ogImage }] : []),
      ],

      links: [{ rel: "canonical", href: url }],
      scripts: loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(serviceSchema),
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
                    name: "Services",
                    item: absUrl("/services"),
                  },
                  { "@type": "ListItem", position: 3, name: loaderData.service.title, item: url },
                ],
              }),
            },
          ]
        : [],
    };
  },

  notFoundComponent: () => (
    <div className="container-page py-32 text-center">
      <h1 className="font-serif text-4xl text-navy">Service not found</h1>
      <Link to="/services" className="mt-6 inline-block text-brand">
        View all services →
      </Link>
    </div>
  ),
  errorComponent: () => <div className="container-page py-32">Something went wrong.</div>,
  component: ServiceDetail,
});

function ServiceDetail() {
  const loaderData = Route.useLoaderData() as {
    service: (typeof SERVICES)[number];
    detail: ServiceDetail;
  };
  const { service, detail } = loaderData;
  const seo = SERVICE_SEO[service.slug];
  const Icon = SERVICE_ICON_MAP[service.icon];
  const related = detail.related
    .map((slug: string) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  return (
    <div>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden bg-secondary text-foreground">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.12]" />
        <div className="pointer-events-none absolute -top-32 -left-32 h-[360px] w-[360px] rounded-full bg-brand/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full bg-gold-glow/10 blur-[120px]" />

        <div className="container-page relative py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground"
          >
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <Link to="/services" className="hover:text-gold">
              Services
            </Link>
            <span>/</span>
            <span className="text-gold">{service.title}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-xl border border-gold/30 bg-gold/10">
                  <Icon className="h-7 w-7 text-gold" />
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {detail.timeline}
                </span>
              </div>
              <h1 className="mt-6 font-serif text-5xl text-balance md:text-6xl">
                {seo?.heading ?? service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-foreground/85">{detail.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappLink({ service: service.title }, `Service: ${service.title}`)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition hover:bg-gold-glow"
                >
                  WhatsApp about {service.title}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/contact"
                  className="rounded-md border border-border px-6 py-3 text-sm transition hover:border-gold hover:text-gold"
                >
                  Book free consultation
                </Link>
                <a
                  href={mailtoLink({ service: service.title }, `Enquiry: ${service.title}`)}
                  className="rounded-md border border-border px-6 py-3 text-sm transition hover:border-gold hover:text-gold"
                >
                  Email an adviser
                </a>
              </div>
            </div>

            {/* Quick facts card */}
            <aside className="lg:col-span-4">
              <div className="rounded-xl border border-white/10 bg-navy-deep p-6 text-white backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  At a glance
                </p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-white/60">Typical timeline</dt>
                    <dd className="mt-1 font-medium text-white">{detail.timeline}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Consultation</dt>
                    <dd className="mt-1 font-medium text-white">Free 30-minute call</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Delivery</dt>
                    <dd className="mt-1 font-medium text-white">
                      In-person (Harrow), WhatsApp, or Zoom
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Speak to</dt>
                    <dd className="mt-1 font-medium text-white">
                      <a href={`tel:${COMPANY.phoneHref}`} className="hover:text-gold">
                        {COMPANY.phone}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============== BENEFITS ============== */}
      <section className="bg-paper">
        <div className="container-page py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Why this service exists
            </p>
            <h2 className="mt-3 font-serif text-4xl text-navy">Benefits you'll actually feel</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {detail.benefits.map((b, i) => (
              <article
                key={b.title}
                className="rounded-xl border hairline bg-card p-6 transition hover:-translate-y-0.5 hover:border-brand/40"
              >
                <span className="font-serif text-3xl text-brand">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-xl text-navy">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== INCLUDED + DELIVERABLES ============== */}
      <section className="bg-secondary/60">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              What's included
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">Scope of work</h2>
            <ul className="mt-6 space-y-3">
              {detail.included.map((i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-lg border hairline bg-card p-4 text-sm text-navy/85"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              What you walk away with
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">Deliverables</h2>
            <ul className="mt-6 space-y-3">
              {detail.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex gap-3 rounded-lg border hairline bg-card p-4 text-sm text-navy/85"
                >
                  <Package className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border hairline bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Ideal for
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {detail.idealFor.map((tag) => (
                  <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-navy">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PROCESS ============== */}
      <section className="bg-paper">
        <div className="container-page py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                How it runs
              </p>
              <h2 className="mt-3 font-serif text-4xl text-navy">The {service.title} process</h2>
            </div>
            <p className="text-sm text-muted-foreground">Timeline: {detail.timeline}</p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {detail.process.map((p, i) => (
              <li key={p.title} className="relative rounded-xl border hairline bg-card p-6">
                <span className="absolute -top-3 left-6 rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 font-serif text-lg text-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============== OUTCOMES STRIP ============== */}
      <section className="bg-secondary text-foreground">
        <div className="container-page py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Outcomes</p>
          <h2 className="mt-3 font-serif text-3xl text-balance">The result you can point to</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {detail.outcomes.map((o) => (
              <li
                key={o}
                className="flex gap-3 rounded-lg border border-border bg-navy-deep/60 p-4 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-glow" />
                <span className="text-foreground/85">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============== FAQs ============== */}
      <section className="bg-cream">
        <div className="container-page py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">FAQs</p>
              <h2 className="mt-3 font-serif text-3xl text-navy">Questions we hear often</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Don't see yours?{" "}
                <a
                  href={whatsappLink({ service: service.title }, `FAQ: ${service.title}`)}
                  target="_blank"
                  rel="noopener"
                  className="text-brand underline decoration-gold underline-offset-4"
                >
                  Ask on WhatsApp
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="divide-y hairline overflow-hidden rounded-xl border hairline bg-paper">
                {detail.faqs.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-medium text-navy [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <Plus className="mt-1 h-4 w-4 shrink-0 text-brand transition-transform group-open:rotate-45" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== RELATED ============== */}
      {related.length > 0 && (
        <section className="bg-paper">
          <div className="container-page py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Pairs well with
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">Related services</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((r) => {
                const RIcon = SERVICE_ICON_MAP[r.icon];
                return (
                  <Link
                    key={r.slug}
                    to="/service/$slug"
                    params={{ slug: r.slug }}
                    className="group rounded-xl border hairline bg-card p-6 transition hover:-translate-y-0.5 hover:border-brand/40"
                  >
                    <RIcon className="h-6 w-6 text-brand" />
                    <h3 className="mt-3 font-serif text-lg text-navy">{r.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{r.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-brand">
                      About {r.title}{" "}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============== FITS PROCESS ============== */}
      <section className="bg-cream">
        <div className="container-page py-16">
          <h2 className="font-serif text-2xl text-navy">Part of the Earthlink 8-step process</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.slice(0, 4).map((j) => (
              <li key={j.step} className="rounded border hairline bg-paper p-5">
                <span className="font-serif text-2xl text-brand">0{j.step}</span>
                <p className="mt-2 font-serif text-base text-navy">{j.title}</p>
              </li>
            ))}
          </ol>
          <Link
            to="/services"
            className="mt-8 inline-block text-sm text-navy underline decoration-gold underline-offset-4"
          >
            See all 10 services and the full 8-step process →
          </Link>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="bg-muted py-20 text-foreground">
        <div className="container-page grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Ready when you are
            </p>
            <h2 className="mt-3 font-serif text-4xl text-balance">
              Start with {service.title.toLowerCase()}.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              First consultation is free. UK office, real adviser, no auto-replies. Or call{" "}
              {COMPANY.phone}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <a
              href={whatsappLink({ service: service.title }, `Final CTA: ${service.title}`)}
              target="_blank"
              rel="noopener"
              className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition hover:bg-gold-glow"
            >
              WhatsApp now
            </a>
            <Link
              to="/contact"
              className="rounded-md border border-border px-6 py-3 text-sm transition hover:border-gold hover:text-gold"
            >
              Book consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
