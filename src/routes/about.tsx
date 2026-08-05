import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { COMPANY, VALUES } from "@/content/company";
import { ShieldCheck, Heart, Users, Globe2 } from "lucide-react";
import { PhasesOfDoubt, HonestPledge, ForParents } from "@/components/honest-pledge";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Earthlink Consultants | Worldwide Study Support" },
      {
        name: "description",
        content:
          "Earthlink Consultants Limited was incorporated on 9 October 2014, has traded continuously since then, and is now based in Harrow.",
      },
      { property: "og:title", content: "About Earthlink Consultants" },
      {
        property: "og:description",
        content:
          "Incorporated on 9 October 2014 and continuously trading since then. Worldwide education support from Harrow; Stonebridge handles UK immigration.",
      },
      { property: "og:url", content: absUrl("/about") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Earthlink Consultants" },
      {
        name: "twitter:description",
        content:
          "Incorporated on 9 October 2014 and continuously trading since then. Worldwide education support from Harrow; Stonebridge handles UK immigration.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": absUrl("/about#webpage"),
          name: "About Earthlink Consultants",
          url: absUrl("/about"),
          about: { "@id": absUrl("/#organization") },
          isPartOf: { "@id": absUrl("/#website") },
        }),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="bg-muted text-foreground">
        <div className="container-page py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">About Earthlink</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] text-balance md:text-6xl">
            A small UK consultancy doing the careful work that big agencies rush.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Earthlink Consultants Limited was incorporated on 9 October {COMPANY.founded} and has
            traded continuously since then. We are now based in Harrow. Stonebridge alone handles UK
            immigration matters.
          </p>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand">Our story</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">Built around one rule.</h2>
            <div className="prose mt-6 max-w-none text-muted-foreground">
              <p>
                Earthlink Consultants Limited was incorporated on 9 October 2014 and has traded
                continuously since then. The rule we built the firm around was simple: never
                recommend a country, course, or university we wouldn't pick for our own.
              </p>
              <p>
                Today we serve applicants in 120+ countries worldwide. The UK, USA, Canada,
                Australia, Ireland, Malta, New Zealand, Europe, and the UAE are featured study
                destinations. We also support non-UK visitor visas and help jobseekers find suitable
                employers without procuring sponsorship or selling jobs.
              </p>
              <p>
                Every UK visa route, advice matter, form, and application is handled only by our
                solicitor partner <strong className="text-navy">{COMPANY.solicitors.name}</strong>{" "}
                in London. Earthlink may continue to handle the university application separately.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: ShieldCheck,
                label: "UK office",
                body: "Education support from Harrow; UK immigration work is owned by Stonebridge.",
              },
              {
                icon: Heart,
                label: "Student-first",
                body: "We turn down cases we can't honestly help with.",
              },
              {
                icon: Users,
                label: "Named adviser",
                body: "One person owns your file from first call to first week abroad.",
              },
              {
                icon: Globe2,
                label: "120+ countries",
                body: "Applicants served worldwide, with detailed featured-destination guides.",
              },
            ].map((c) => (
              <div key={c.label} className="rounded border hairline bg-card p-5">
                <c.icon className="h-6 w-6 text-brand" />
                <p className="mt-4 font-serif text-lg text-navy">{c.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-brand">Our values</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl text-navy">
            What we don't compromise on.
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded border hairline bg-border md:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v, i) => (
              <li key={v.title} className="bg-paper p-6">
                <span className="font-serif text-3xl text-brand">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-lg text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PhasesOfDoubt />
      <HonestPledge />
      <ForParents />

      <section className="bg-secondary text-foreground">
        <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-2">
          <h2 className="font-serif text-4xl text-balance">
            Come in, or call in. Either way we'll answer.
          </h2>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/contact"
              className="rounded-sm bg-gold px-6 py-3 text-sm font-medium text-navy-deep"
            >
              Book consultation
            </Link>
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="rounded-sm border border-border px-6 py-3 text-sm"
            >
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
