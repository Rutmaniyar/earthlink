import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { SCHOLARSHIPS } from "@/content/faqs";
import { whatsappLink } from "@/lib/lead";
import { Award } from "lucide-react";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — Earthlink Consultants" },
      {
        name: "description",
        content:
          "Government, university, and external scholarships for applicants across 120+ countries, with selected featured destinations shown in detail.",
      },
      { property: "og:title", content: "Scholarships for international students" },
      {
        property: "og:description",
        content:
          "Major government and university scholarships for applicants across 120+ countries and featured destinations.",
      },
      { property: "og:url", content: absUrl("/scholarships") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Scholarships for international students" },
      {
        name: "twitter:description",
        content:
          "Major government and university scholarships for applicants across 120+ countries and featured destinations.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/scholarships") }],
  }),
  component: Scholarships,
});

function Scholarships() {
  const byCountry = SCHOLARSHIPS.reduce<Record<string, (typeof SCHOLARSHIPS)[number][]>>(
    (acc, s) => {
      (acc[s.country] ||= []).push(s);
      return acc;
    },
    {},
  );

  return (
    <div>
      <section className="bg-secondary text-foreground">
        <div className="container-page py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Scholarships</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl text-balance md:text-6xl">
            Real scholarships. Realistic applications.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            We don't promise scholarships — we promise applications strong enough to compete. Below:
            the major government and university awards we routinely help students secure.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        {Object.entries(byCountry).map(([country, list]) => (
          <div key={country} className="mb-12">
            <h2 className="font-serif text-2xl text-navy">{country}</h2>
            <div className="mt-5 overflow-hidden rounded border hairline">
              <table className="w-full text-left text-sm">
                <thead className="bg-cream text-xs uppercase tracking-wider text-navy/70">
                  <tr>
                    <th className="px-4 py-3">Scholarship</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3">Value</th>
                    <th className="px-4 py-3">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => (
                    <tr key={s.name} className="border-t hairline">
                      <td className="px-4 py-3 font-serif text-navy">
                        <Award className="mr-2 inline h-4 w-4 text-brand" />
                        {s.name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{s.level}</td>
                      <td className="px-4 py-3 text-navy">{s.value}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="rounded border hairline bg-muted p-10 text-center text-foreground">
          <h2 className="font-serif text-3xl">Want a shortlist tailored to your profile?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Send us your transcripts and we'll come back with the awards you actually qualify for.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href={whatsappLink({ service: "Scholarship review" }, "Scholarships page")}
              target="_blank"
              rel="noopener"
              className="rounded-sm bg-gold px-6 py-3 text-sm font-medium text-navy-deep"
            >
              WhatsApp transcripts
            </a>
            <Link
              to="/contact"
              className="rounded-sm border border-border px-6 py-3 text-sm hover:border-brand"
            >
              Book consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
