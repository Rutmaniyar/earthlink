import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import {
  ArrowRight,
  BadgeCheck,
  Scale,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { COMPANY } from "@/content/company";
import { callLink, mailtoLink, whatsappLink } from "@/lib/lead";
import earthlinkLogoUrl from "@/assets/earthlink-logo.png";
import stonebridgeLogoUrl from "@/assets/stonebridge-logo.png";

export const Route = createFileRoute("/partners/stonebridge")({
  head: () => ({
    meta: [
      { title: "Our Solicitor Partner — Stonebridge Legal Solutions | Earthlink Consultants" },
      {
        name: "description",
        content:
          "Earthlink Consultants partners with Stonebridge Legal Solutions — IAA Level 3 UK immigration advisers — for regulated visa, sponsor licence, and family route casework.",
      },
      { property: "og:title", content: "Our Solicitor Partner — Stonebridge Legal Solutions" },
      {
        property: "og:description",
        content:
          "Regulated UK immigration advice through our partner solicitors. IAA Level 3, 5.0/158 Google reviews.",
      },
      { property: "og:url", content: absUrl("/partners/stonebridge") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Solicitor Partner — Stonebridge Legal Solutions" },
      {
        name: "twitter:description",
        content:
          "Regulated UK immigration advice through our partner solicitors. IAA Level 3, 5.0/158 Google reviews.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/partners/stonebridge") }],
  }),
  component: StonebridgePartnerPage,
});

const PARTNER_SERVICES = [
  {
    title: "Student & Graduate Visas",
    blurb:
      "Regulated representation for the visa stage of your study journey — from CAS to BRP collection.",
    items: [
      "Student Visa (Sponsored Study route)",
      "Child Student Visa",
      "Graduate Visa (2-year post-study work)",
      "Switching from Visitor to Student in-country (where permitted)",
    ],
  },
  {
    title: "Family & Partner Visas",
    blurb:
      "For students bringing a spouse, partner, or children — and for families joining a settled relative.",
    items: [
      "Spouse Visa",
      "Unmarried Partner Visa",
      "Dependent Visa (PBS routes)",
      "Fiancé(e) Visa",
    ],
  },
  {
    title: "Skilled Worker & Health Care",
    blurb:
      "Post-study employment routes and sponsor matching — handed off cleanly when you receive a CoS.",
    items: [
      "Skilled Worker Visa",
      "Health and Care Worker Visa",
      "Sponsor Licence support for employers",
      "Right to Work checks",
    ],
  },
  {
    title: "Business, Innovator & Mobility",
    blurb:
      "Founders, transferees, and self-sponsored entrepreneurs who want a UK base after graduation.",
    items: [
      "Innovator Founder Visa",
      "Self-Sponsorship Visa",
      "UK Expansion Worker Visa",
      "Graduate Trainee & Specialist Worker Visa",
    ],
  },
  {
    title: "Visit & Short-Stay Visas",
    blurb: "For parents attending your graduation, conferences, or short academic visits.",
    items: [
      "Standard Visitor Visa",
      "Business Visitor Visa",
      "Academic Visitor Visa",
      "Parent of a Child Student Visa",
    ],
  },
  {
    title: "Compliance & Employer Support",
    blurb:
      "If your future employer needs sponsor-side support, we route them to Stonebridge directly.",
    items: [
      "Sponsor Licence Application & Renewal",
      "Home Office Compliance Visit prep",
      "Civil Penalty defence",
      "Right to Work audits",
    ],
  },
];

const WORKFLOW = [
  {
    n: "01",
    t: "You start with Earthlink",
    b: "Counselling, university shortlisting, admission, CAS or I-20, and document checks — all handled by us.",
  },
  {
    n: "02",
    t: "We refer the legal work",
    b: "When your case needs regulated immigration advice, we introduce you to Stonebridge Legal Solutions in writing.",
  },
  {
    n: "03",
    t: "Stonebridge advises you directly",
    b: "You sign a separate client-care letter with them. They quote their own fees and own the legal advice.",
  },
  {
    n: "04",
    t: "We coordinate, you stay informed",
    b: "Earthlink and Stonebridge share updates — but you remain the client of both firms, with no duplication of work.",
  },
];

const FAQS = [
  {
    q: "Are Stonebridge regulated?",
    a: "Yes. Stonebridge Legal Solutions is led by an IAA Level 3 Immigration Adviser — the highest accreditation granted by the Immigration Advice Authority (formerly OISC). That covers complex casework including appeals.",
  },
  {
    q: "Do I pay Earthlink and Stonebridge separately?",
    a: "Yes. Earthlink handles your education consultancy and applications; Stonebridge handles regulated immigration legal work under a separate engagement letter and fee. We tell you the likely Stonebridge fee range up-front, before any referral.",
  },
  {
    q: "Is Earthlink itself a law firm?",
    a: "No. Earthlink Consultants is an education consultancy. UK regulations require regulated advisers (IAA-registered or solicitors) for immigration legal advice — that's why we partner with Stonebridge.",
  },
  {
    q: "Will I have to go to Stratford to meet them?",
    a: "Not necessarily. Stonebridge offer in-person, phone, and video consultations. We can sit in on the introduction call from our Harrow office if that helps.",
  },
  {
    q: "What if I already have a solicitor?",
    a: "That's fine — we'll work with your chosen adviser. The Stonebridge route is the default for students who don't have one and want a vetted partner.",
  },
];

function StonebridgePartnerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted text-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,_color-mix(in_oklab,_var(--color-brand)_40%,_transparent),_transparent_50%),radial-gradient(circle_at_75%_80%,_color-mix(in_oklab,_var(--color-gold)_30%,_transparent),_transparent_45%)]" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Partner firms</p>
          <img
            src={stonebridgeLogoUrl}
            alt="Stonebridge Legal Solutions logo"
            className="mx-auto mt-4 h-20 w-auto md:h-24"
            loading="eager"
          />
          <h1 className="mt-6 max-w-3xl font-serif text-4xl text-balance leading-tight md:text-6xl">
            Our solicitor partner: <span className="text-brand">Stonebridge Legal Solutions</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/85">
            Earthlink handles your education journey. Stonebridge handles the regulated immigration
            legal work that sits beside it — visas, sponsor licences, family routes, and appeals —
            at IAA Level 3, the highest UK accreditation.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: BadgeCheck, label: "IAA Level 3", sub: "Highest UK accreditation" },
              { icon: Scale, label: "5.0 / 158 reviews", sub: "Google verified" },
              { icon: ShieldCheck, label: "London-based", sub: "Stratford E15 1NT" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-md border border-border bg-paper/5 p-4 backdrop-blur"
              >
                <s.icon className="h-6 w-6 text-gold" />
                <div>
                  <div className="font-semibold">{s.label}</div>
                  <div className="text-sm text-muted-foreground">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={whatsappLink(
                { message: "I'd like to be referred to Stonebridge for immigration advice." },
                "Partner page",
              )}
              className="btn-primary rounded-sm px-5 py-3 text-sm font-medium"
            >
              Request a referral <ArrowRight className="ml-2 inline h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="rounded-sm border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:bg-background/50"
            >
              Book a free consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Who they are */}
      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand">About the firm</p>
            <h2 className="mt-3 font-serif text-3xl text-navy md:text-4xl">
              Independent UK immigration advisers since 2022
            </h2>
            <p className="mt-5 text-muted-foreground">
              Stonebridge Legal Solutions Limited is a London-based immigration advisory firm
              (Companies House <span className="font-mono text-navy">14359957</span>) led by an{" "}
              <strong className="text-navy">IAA Level 3 Immigration Adviser</strong>. Level 3 is the
              most senior tier of regulation issued by the Immigration Advice Authority, covering
              complex applications, judicial reviews, and First-Tier Tribunal appeals.
            </p>
            <p className="mt-4 text-muted-foreground">
              They've built a 5.0-star reputation across 158 verified Google reviews working with
              students, families, and skilled workers from multi-ethnic backgrounds across the UK
              and overseas — the same audience Earthlink files for every week. That overlap is why
              the partnership works.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Regulated by the Immigration Advice Authority",
                "First-Tier Tribunal & appeals capability",
                "Sponsor licence work for employers",
                "In-person, phone, and video consultations",
                "Multi-lingual case handling",
                "Transparent fixed-fee quotes per matter",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-navy">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-md border hairline bg-card p-6">
            <img
              src={stonebridgeLogoUrl}
              alt="Stonebridge Legal Solutions"
              className="mb-5 h-16 w-auto"
              loading="lazy"
            />
            <h3 className="font-serif text-xl text-navy">Stonebridge Legal Solutions</h3>
            <div className="mt-5 space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <div className="text-navy">
                  64 Boardman House
                  <br />
                  Stratford, London E15 1NT
                  <br />
                  United Kingdom
                </div>
              </div>
              <a
                href="tel:+447926650908"
                className="flex items-center gap-3 text-navy transition hover:text-brand"
              >
                <Phone className="h-4 w-4 text-brand" /> +44 7926 650 908
              </a>
              <a
                href="https://stonebridgelegal.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-navy transition hover:text-brand"
              >
                <ExternalLink className="h-4 w-4 text-brand" /> stonebridgelegal.co.uk
              </a>
            </div>

            <div className="my-6 h-px bg-border" />

            <img
              src={earthlinkLogoUrl}
              alt="Earthlink Consultants logo"
              className="mb-3 h-12 w-auto"
              loading="lazy"
            />
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Earthlink Consultants
            </p>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <div className="text-navy">
                  {COMPANY.address.line1}, {COMPANY.address.line2}
                  <br />
                  {COMPANY.address.city} {COMPANY.address.postcode}
                </div>
              </div>
              <a
                href={callLink()}
                className="flex items-center gap-3 text-navy transition hover:text-brand"
              >
                <Phone className="h-4 w-4 text-brand" /> {COMPANY.phone}
              </a>
              <a
                href={mailtoLink()}
                className="flex items-center gap-3 text-navy transition hover:text-brand"
              >
                <Mail className="h-4 w-4 text-brand" /> {COMPANY.email}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Joint services */}
      <section className="bg-secondary/40 py-20">
        <div className="container-page">
          <p className="text-xs uppercase tracking-[0.25em] text-brand">Services in partnership</p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-4xl">
            What we deliver together
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Earthlink owns the education side — universities, offers, documents, finances,
            pre-departure. Stonebridge owns the regulated immigration side. Six service blocks, one
            coordinated handover.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PARTNER_SERVICES.map((s) => (
              <article
                key={s.title}
                className="group rounded-md border hairline bg-card p-6 transition hover:-translate-y-1 hover:border-brand hover:shadow-lg"
              >
                <h3 className="font-serif text-xl text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-navy">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand transition group-hover:text-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="container-page py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-brand">How the handover works</p>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-4xl">
          One journey. Two firms. Clear lines.
        </h2>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW.map((w) => (
            <li key={w.n} className="relative rounded-md border hairline bg-card p-6">
              <div className="font-serif text-3xl text-brand">{w.n}</div>
              <h3 className="mt-3 font-semibold text-navy">{w.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.b}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-md border-l-4 border-brand bg-secondary/50 p-5 text-sm text-navy">
          <strong className="text-navy-deep">Plain English:</strong> Earthlink is your education
          consultancy. Stonebridge is your regulated immigration adviser. We've worked together long
          enough to make the handover invisible to you — but the engagement letters, fees, and legal
          responsibility remain separate, as UK regulations require.
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-20 text-foreground">
        <div className="container-page">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Common questions</p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl md:text-4xl">About the partnership</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-md border border-border bg-paper/5 p-6">
                <h3 className="font-semibold text-foreground">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-md bg-secondary p-10 text-center text-foreground md:p-16">
          <h2 className="font-serif text-3xl md:text-4xl">
            Ready for a regulated, joined-up plan?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Start with a free 30-minute call with Earthlink. If your case needs regulated
            immigration advice, we'll introduce you to Stonebridge in the same week.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(
                { message: "I'd like to discuss a study + visa case that may need Stonebridge." },
                "Partner page",
              )}
              className="btn-primary rounded-sm px-6 py-3 text-sm font-medium"
            >
              WhatsApp Earthlink
            </a>
            <Link
              to="/contact"
              className="rounded-sm border border-border px-6 py-3 text-sm font-medium transition hover:bg-background/50"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
