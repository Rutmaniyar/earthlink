import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { TESTIMONIALS, COMPANY } from "@/content/company";
import { whatsappLink } from "@/lib/lead";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Student stories — Earthlink Consultants" },
      {
        name: "description",
        content: `Real outcomes from Earthlink students across the UK, USA, Canada, Australia, Ireland, and Europe. Rated ${COMPANY.rating.score} from ${COMPANY.rating.reviews}+ reviews.`,
      },
      { property: "og:title", content: "Student stories — Earthlink Consultants" },
      { property: "og:description", content: "Real outcomes from Earthlink students worldwide." },
      { property: "og:url", content: absUrl("/testimonials") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Student stories — Earthlink Consultants" },
      { name: "twitter:description", content: "Real outcomes from Earthlink students worldwide." },
    ],
    links: [{ rel: "canonical", href: absUrl("/testimonials") }],
  }),
  component: Testimonials,
});

function Testimonials() {
  return (
    <div>
      <section className="bg-secondary text-foreground">
        <div className="container-page py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Student stories</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl text-balance md:text-6xl">
            {COMPANY.rating.score} stars from {COMPANY.rating.reviews}+ students.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            A few of the students who let us share their journey. Names abbreviated for privacy;
            courses and countries are real.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm">
            <Star className="h-4 w-4 fill-amber text-amber" />
            <span>{COMPANY.rating.score} average · Google verified</span>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="rounded border hairline bg-card p-6">
              <Quote className="h-6 w-6 text-brand" />
              <p className="mt-4 text-sm text-navy/80">{t.quote}</p>
              <div className="mt-6 border-t hairline pt-4">
                <p className="font-serif text-base text-navy">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.course}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-brand">{t.country}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded border hairline bg-cream p-10 text-center">
          <h2 className="font-serif text-3xl text-navy">Your story could be next.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Free 30-minute consultation. We'll tell you honestly whether we can help.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href={whatsappLink({}, "Testimonials CTA")}
              target="_blank"
              rel="noopener"
              className="rounded-sm bg-secondary px-6 py-3 text-sm font-medium text-foreground"
            >
              WhatsApp us
            </a>
            <Link to="/contact" className="rounded-sm border hairline px-6 py-3 text-sm text-navy">
              Book consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
