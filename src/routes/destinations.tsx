import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { DESTINATIONS } from "@/content/destinations";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Study Abroad Destinations — UK, USA, Canada & More" },
      {
        name: "description",
        content:
          "Compare 8 study-abroad destinations at a glance — UK, USA, Canada, Australia, Ireland, NZ, Europe & UAE. Tuition, intakes, visa routes and post-study work, side by side.",
      },
      { property: "og:title", content: "Destinations · Earthlink Consultants" },
      {
        property: "og:description",
        content: "Pick a destination, see the real numbers, and book a free consultation.",
      },
      { property: "og:url", content: absUrl("/destinations") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Destinations · Earthlink Consultants" },
      {
        name: "twitter:description",
        content: "Pick a destination, see the real numbers, and book a free consultation.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/destinations") }],
  }),
  component: Destinations,
});

function Destinations() {
  return (
    <div>
      <section className="bg-muted text-foreground">
        <div className="container-page py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Destinations</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl text-balance md:text-6xl">
            Eight countries we file applications for every week.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            These aren't brochure pages. Each destination below carries real intakes, real tuition
            ranges, real work-rights rules — the things you need before you decide.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.slug}
              to="/destination/$slug"
              params={{ slug: d.slug }}
              className="group block overflow-hidden rounded-md border hairline bg-card transition hover:-translate-y-1 hover:border-brand hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={d.heroImage}
                  alt={`Study in ${d.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-brand">{d.eyebrow}</p>
                <h2 className="mt-1 flex items-center justify-between font-serif text-2xl text-navy">
                  {d.name}
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-brand" />
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{d.short}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-navy">
                  {d.intakes.slice(0, 2).map((i) => (
                    <span key={i} className="rounded-full border hairline px-2 py-1">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
