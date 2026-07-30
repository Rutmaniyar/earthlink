import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DESTINATIONS } from "@/content/destinations";
import { COMPANY } from "@/content/company";
import { whatsappLink, mailtoLink } from "@/lib/lead";
import { LandmarkLazy } from "@/components/three/landmark-lazy";
import {
  Calendar,
  Coins,
  Briefcase,
  GraduationCap,
  FileText,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { absUrl } from "@/lib/site-config";

export const Route = createFileRoute("/destination/$slug")({
  loader: ({ params }) => {
    const d = DESTINATIONS.find((x) => x.slug === params.slug);
    if (!d) throw notFound();
    return { d };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.d;
    if (!d) return {};
    const url = absUrl(`/destination/${d.slug}`);
    return {
      meta: [
        { title: `Study in ${d.name} — Earthlink Consultants` },
        { name: "description", content: d.short },
        { property: "og:title", content: `Study in ${d.name} · Earthlink` },
        { property: "og:description", content: d.short },
        { property: "og:image", content: d.heroImage },
        { property: "og:image:secure_url", content: d.heroImage },
        { property: "og:image:alt", content: `Study in ${d.name}` },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `Study in ${d.name} · Earthlink` },
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
            "@type": "FAQPage",
            mainEntity: d.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: DestinationPage,
});

function DestinationPage() {
  const { d } = Route.useLoaderData() as { d: (typeof DESTINATIONS)[number] };
  const other = DESTINATIONS.filter((x) => x.slug !== d.slug).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div className="absolute inset-0">
          <img
            src={d.heroImage}
            alt=""
            data-parallax="0.15"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/80 to-navy-deep" />
        </div>
        <div className="container-page relative grid items-center gap-12 py-24 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">{d.eyebrow}</p>
            <h1 className="mt-3 font-serif text-6xl text-balance md:text-7xl">{d.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">{d.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-sm bg-gold px-6 py-3 text-sm font-medium text-navy-deep hover:bg-gold-glow"
              >
                Free consultation
              </Link>
              <a
                href={whatsappLink({ country: d.name }, `Destination ${d.name}`)}
                target="_blank"
                rel="noopener"
                className="rounded-sm border border-white/25 px-6 py-3 text-sm hover:border-gold hover:text-gold"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative h-[360px] md:h-[480px]">
            <LandmarkLazy variant={d.landmark} className="h-full w-full" />
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="border-y hairline bg-paper">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Calendar, label: "Intakes", value: d.intakes.join(" · ") },
            { icon: Coins, label: "Tuition / year", value: d.costs.tuition },
            { icon: Briefcase, label: "Work rights", value: d.workRights.split(".")[0] + "." },
            { icon: GraduationCap, label: "Top courses", value: d.courses.slice(0, 3).join(", ") },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <f.icon className="mt-1 h-5 w-5 text-brand" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </p>
                <p className="mt-1 text-sm text-navy">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY STUDY */}
      <section className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-brand">Why {d.name}</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">
              The honest reasons students pick {d.name}.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Not brochure points — the things that actually matter once you're studying and trying
              to stay on.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded border hairline bg-border sm:grid-cols-2 lg:col-span-8">
            {d.whyStudy.map((w) => (
              <li key={w.title} className="bg-paper p-6">
                <Sparkles className="h-5 w-5 text-brand" />
                <h3 className="mt-3 font-serif text-lg text-navy">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EDUCATION + COSTS + DOCS */}
      <section className="bg-paper">
        <div className="container-page grid gap-10 py-24 lg:grid-cols-3">
          <div className="rounded border hairline bg-card p-8">
            <GraduationCap className="h-6 w-6 text-brand" />
            <h3 className="mt-4 font-serif text-2xl text-navy">Education system</h3>
            <p className="mt-3 text-sm text-muted-foreground">{d.education}</p>
            <p className="mt-6 text-xs uppercase tracking-wider text-brand">Popular courses</p>
            <ul className="mt-3 space-y-1.5 text-sm text-navy">
              {d.courses.map((c) => (
                <li key={c} className="flex gap-2">
                  <Check className="h-4 w-4 flex-none text-brand" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border hairline bg-card p-8">
            <Coins className="h-6 w-6 text-brand" />
            <h3 className="mt-4 font-serif text-2xl text-navy">Costs & funding</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Tuition</dt>
                <dd className="text-navy">{d.costs.tuition}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Living</dt>
                <dd className="text-navy">{d.costs.living}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Visa</dt>
                <dd className="text-navy">{d.costs.visa}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs uppercase tracking-wider text-brand">Scholarships</p>
            <ul className="mt-3 space-y-1.5 text-sm text-navy">
              {d.scholarships.map((s) => (
                <li key={s} className="flex gap-2">
                  <Check className="h-4 w-4 flex-none text-brand" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border hairline bg-card p-8">
            <FileText className="h-6 w-6 text-brand" />
            <h3 className="mt-4 font-serif text-2xl text-navy">Documents you'll need</h3>
            <ul className="mt-4 space-y-2 text-sm text-navy">
              {d.documents.map((doc) => (
                <li key={doc} className="flex gap-2">
                  <Check className="h-4 w-4 flex-none text-brand" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WORK RIGHTS BANNER */}
      <section className="bg-secondary text-foreground">
        <div className="container-page grid items-center gap-8 py-16 lg:grid-cols-3">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Work & post-study</p>
          <p className="font-serif text-2xl text-foreground/85 lg:col-span-2">{d.workRights}</p>
        </div>
      </section>

      {/* FAQS */}
      <section className="container-page py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-brand">Frequently asked</p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl text-navy">
          {d.name} questions, answered straight.
        </h2>
        <div className="mt-12 divide-y hairline border-y hairline">
          {d.faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="font-serif text-lg text-navy">{f.q}</span>
                <span className="mt-1 text-brand transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted text-foreground">
        <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-2">
          <h2 className="font-serif text-4xl text-balance">Ready to apply to {d.name}?</h2>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/contact"
              className="rounded-sm bg-gold px-6 py-3 text-sm font-medium text-navy-deep"
            >
              Book consultation
            </Link>
            <a
              href={mailtoLink({}, `Enquiry — ${d.name}`)}
              className="rounded-sm border border-border px-6 py-3 text-sm"
            >
              Email {COMPANY.email}
            </a>
          </div>
        </div>
      </section>

      {/* OTHER DESTINATIONS */}
      <section className="container-page py-20">
        <div className="mb-8 flex items-end justify-between">
          <h3 className="font-serif text-2xl text-navy">Other destinations</h3>
          <Link to="/destinations" className="text-sm text-navy hover:underline">
            All destinations →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {other.map((o) => (
            <Link
              key={o.slug}
              to="/destination/$slug"
              params={{ slug: o.slug }}
              className="group flex items-center justify-between rounded border hairline bg-card p-4 transition hover:border-brand"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand">Study in</p>
                <p className="font-serif text-lg text-navy">{o.name}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-brand" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
