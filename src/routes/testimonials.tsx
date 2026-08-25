import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { absUrl } from "@/lib/site-config";
import { COMPANY, GOOGLE_REVIEW_CONTEXT } from "@/content/company";
import { WRITTEN_GOOGLE_REVIEWS } from "@/content/google-reviews";
import { whatsappLink } from "@/lib/lead";
import { Star, Quote } from "lucide-react";

const REVIEW_BATCH_SIZE = 18;

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Google reviews — Earthlink Consultants" },
      {
        name: "description",
        content: `Public Google Business Profile feedback for Earthlink Consultants. Rated ${COMPANY.rating.score} from ${COMPANY.rating.reviews} reviews.`,
      },
      { property: "og:title", content: "Google reviews — Earthlink Consultants" },
      {
        property: "og:description",
        content: "Public Google Business Profile feedback from Earthlink clients.",
      },
      { property: "og:url", content: absUrl("/testimonials") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Google reviews — Earthlink Consultants" },
      {
        name: "twitter:description",
        content: "Public Google Business Profile feedback from Earthlink clients.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/testimonials") }],
  }),
  component: Testimonials,
});

function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(REVIEW_BATCH_SIZE);
  const visibleReviews = WRITTEN_GOOGLE_REVIEWS.slice(0, visibleCount);
  const remainingReviews = WRITTEN_GOOGLE_REVIEWS.length - visibleReviews.length;
  const hasMoreReviews = remainingReviews > 0;

  return (
    <div>
      <section className="bg-secondary text-foreground">
        <div className="container-page py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Google reviews</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl text-balance md:text-6xl">
            {COMPANY.rating.score} stars from {COMPANY.rating.reviews} published reviews.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Public feedback from Earthlink clients, shown with the Google display names, ratings,
            dates, and wording supplied in the 25 August 2026 Google Business Profile export.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {GOOGLE_REVIEW_CONTEXT}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm">
            <Star className="h-4 w-4 fill-amber text-amber" />
            <span>
              {COMPANY.rating.score} average · {COMPANY.rating.reviews}-review Google snapshot
            </span>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div id="google-review-grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleReviews.map((review) => (
            <article key={review.id} className="rounded border hairline bg-card p-6">
              <Quote className="h-6 w-6 text-brand" />
              <p className="mt-4 text-sm text-navy/80">{review.text}</p>
              <div className="mt-6 border-t hairline pt-4">
                <p className="font-serif text-base text-navy">{review.reviewerName}</p>
                <p className="text-xs text-muted-foreground">
                  Google review ·{" "}
                  <time dateTime={review.publishedAt}>
                    {new Date(`${review.publishedAt}T00:00:00Z`).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </p>
                <p
                  className="mt-1 text-xs uppercase tracking-wider text-brand"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {review.rating}/5 stars
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p id="review-progress" className="mb-3 text-xs text-muted-foreground" aria-live="polite">
            Showing {visibleReviews.length} of {WRITTEN_GOOGLE_REVIEWS.length} written reviews
          </p>
          <button
            type="button"
            aria-controls="google-review-grid"
            aria-describedby="review-progress"
            disabled={!hasMoreReviews}
            onClick={() =>
              setVisibleCount((count) =>
                Math.min(count + REVIEW_BATCH_SIZE, WRITTEN_GOOGLE_REVIEWS.length),
              )
            }
            className="min-h-11 rounded-sm border hairline px-6 py-3 text-sm text-navy transition hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-60"
          >
            {hasMoreReviews
              ? `Show more reviews (${remainingReviews} remaining)`
              : "All reviews shown"}
          </button>
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
