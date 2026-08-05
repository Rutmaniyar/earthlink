import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { SERVICES, JOURNEY, COMPANY } from "@/content/company";
import { whatsappLink } from "@/lib/lead";
import { Star, ShieldCheck, MapPin, Briefcase } from "lucide-react";
import { SERVICE_ICON_MAP } from "@/lib/service-icons";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Earthlink Consultants" },
      {
        name: "description",
        content:
          "Worldwide education, non-UK visa, visitor, and job-search support. Stonebridge alone handles every UK immigration route and application.",
      },
      {
        property: "og:title",
        content: "Earthlink services — worldwide education and application support",
      },
      {
        property: "og:description",
        content:
          "Ten services with clear ownership, including a direct Stonebridge handover for every UK immigration matter.",
      },
      { property: "og:url", content: absUrl("/services") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Earthlink services — worldwide education and application support",
      },
      {
        name: "twitter:description",
        content:
          "Ten services with clear ownership, including a direct Stonebridge handover for every UK immigration matter.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/services") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          provider: { "@type": "Organization", name: COMPANY.legalName },
          serviceType: "International education, non-UK visa, and job-search support",
          areaServed: "120+ countries served",
          termsOfService:
            "Stonebridge Legal Solutions alone provides UK immigration advice and handles every UK visa route and application.",
        }),
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div>
      <section className="relative overflow-hidden bg-secondary text-foreground">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Services</p>
            <h1 className="mt-3 font-serif text-5xl text-balance md:text-6xl">
              Education, global visa support, and job-search guidance — clearly scoped.
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Earthlink owns education applications, supported non-UK visa work, and job-search
              guidance. Stonebridge alone owns every UK immigration route and application. Below:
              ten services and the eight-step process that connects them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-sm bg-gold px-6 py-3 text-sm font-medium text-navy-deep hover:bg-gold-glow"
              >
                Book free consultation
              </Link>
              <a
                href={whatsappLink({}, "Services hero")}
                target="_blank"
                rel="noopener"
                className="rounded-sm border border-border px-6 py-3 text-sm hover:border-gold hover:text-gold"
              >
                WhatsApp an adviser
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=70"
              alt="Adviser session"
              className="w-full rounded-md object-cover"
            />
            <div className="absolute -left-4 top-6 hidden rounded border hairline bg-paper px-4 py-2 text-xs text-navy shadow-lg sm:flex sm:items-center sm:gap-2">
              <Star className="h-3 w-3 fill-amber text-amber" />
              {COMPANY.rating.score} · {COMPANY.rating.reviews} reviews
            </div>
            <div className="absolute -right-4 top-32 hidden rounded border hairline bg-paper px-4 py-2 text-xs text-navy shadow-lg sm:flex sm:items-center sm:gap-2">
              <ShieldCheck className="h-3 w-3 text-brand" />
              UK office
            </div>
            <div className="absolute -left-4 bottom-10 hidden rounded border hairline bg-paper px-4 py-2 text-xs text-navy shadow-lg sm:flex sm:items-center sm:gap-2">
              <MapPin className="h-3 w-3 text-brand" />
              Harrow, London
            </div>
            <div className="absolute -right-4 bottom-24 hidden rounded border hairline bg-paper px-4 py-2 text-xs text-navy shadow-lg sm:flex sm:items-center sm:gap-2">
              <Briefcase className="h-3 w-3 text-brand" />
              Jobseeker support
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <h2 className="font-serif text-4xl text-navy">Every service we offer.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Pick a service to understand what's included. Most students take 4–6 from this list; we
          never upsell ones you don't need.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICON_MAP[s.icon];
            return (
              <Link
                key={s.slug}
                to="/service/$slug"
                params={{ slug: s.slug }}
                className="group rounded border hairline bg-card p-6 transition hover:-translate-y-1 hover:border-brand"
              >
                <Icon className="h-7 w-7 text-brand" />
                <h3 className="mt-4 font-serif text-xl text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-brand opacity-0 transition group-hover:opacity-100">
                  Learn about {s.title} →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-muted text-foreground">
        <div className="container-page py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Process</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl">The eight-step Earthlink journey.</h2>
          <ol className="mt-12 relative grid gap-px overflow-hidden rounded border border-border bg-background/50 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((j) => (
              <li key={j.step} className="bg-muted p-6">
                <span className="font-serif text-3xl text-gold">0{j.step}</span>
                <h3 className="mt-3 font-serif text-lg text-foreground">{j.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{j.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
