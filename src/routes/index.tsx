import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { COMPANY, GOOGLE_REVIEW_CONTEXT, SERVICES, JOURNEY, VALUES } from "@/content/company";
import { FEATURED_GOOGLE_REVIEWS } from "@/content/featured-google-reviews";
import { DESTINATIONS } from "@/content/destinations";
import { UNIVERSITY_DIRECTORY_TOTAL } from "@/content/universities";
import { whatsappLink, mailtoLink, callLink } from "@/lib/lead";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  Activity,
  Globe2,
  Plane,
} from "lucide-react";
import { SERVICE_ICON_MAP } from "@/lib/service-icons";
import { CountUp, ProgressBar, LiveBars, RadialGauge } from "@/components/infographics";
import { AuroraClient } from "@/components/reactbits/aurora-client";
import ShinyText from "@/components/reactbits/ShinyText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Magnet from "@/components/reactbits/Magnet";
import { PhasesOfDoubt, HonestPledge, ForParents } from "@/components/honest-pledge";
import FlipCard from "@/components/reactbits/FlipCard";
import TiltedCard from "@/components/reactbits/TiltedCard";
import Carousel from "@/components/reactbits/Carousel";
import Marquee from "@/components/reactbits/Marquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Education Consultants in Harrow | Earthlink Consultants" },
      {
        name: "description",
        content:
          "Education consultants in Harrow for university admissions and study abroad. Earthlink supports non-UK visas; Stonebridge handles every UK visa route.",
      },
      {
        property: "og:title",
        content: "Education Consultants in Harrow — Earthlink Consultants",
      },
      {
        property: "og:description",
        content:
          "Continuously trading since 2014. 412 Google reviews. Worldwide education support with clearly scoped visa services.",
      },
      { property: "og:url", content: absUrl("/") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Education Consultants in Harrow — Earthlink Consultants",
      },
      {
        name: "twitter:description",
        content:
          "Continuously trading since 2014. 412 Google reviews. Worldwide education support with clearly scoped visa services.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/") }],
  }),
  component: Home,
});

// destination intake/demand weights for the data viz strip
const DEST_WEIGHTS: Record<string, number> = {
  uk: 96,
  usa: 88,
  canada: 84,
  australia: 78,
  ireland: 70,
  newzealand: 62,
  europe: 58,
  uae: 54,
};

function Home() {
  return (
    <div className="bg-paper">
      {/* ============== HERO — BENTO DASHBOARD ============== */}
      <section className="relative overflow-hidden bg-muted text-foreground">
        {/* Aurora WebGL background */}
        <AuroraClient
          className="pointer-events-none absolute inset-0 opacity-60"
          colorStops={["#2FA3D6", "#9BD936", "#2FA3D6"]}
          amplitude={1.0}
          blend={0.55}
          speed={0.6}
        />
        {/* ambient glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-gold-glow/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.18]" />

        <div className="container-page relative grid gap-6 py-16 lg:grid-cols-12 lg:py-24">
          {/* Headline tile */}
          <AnimatedContent
            distance={40}
            direction="vertical"
            duration={0.9}
            delay={0}
            className="bento-tile p-8 lg:col-span-9 lg:row-span-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <ShinyText
                text="Advisers online · Harrow, UK"
                color="#9BD936"
                shineColor="#ffffff"
                speed={3}
              />
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-foreground text-balance md:text-6xl">
              Education consultants who{" "}
              <ShinyText
                text="answer their phone."
                color="#9BD936"
                shineColor="#ffffff"
                speed={3.5}
                className="italic"
              />
            </h1>

            <p className="mt-5 max-w-lg text-muted-foreground">
              From Harrow, Earthlink supports university admissions, study-abroad applications,
              non-UK visa preparation, and jobseekers worldwide. Stonebridge alone handles every UK
              immigration route and application.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnet padding={60} magnetStrength={4}>
                <Link
                  to="/contact"
                  className="btn-primary group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium"
                >
                  Book free consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnet>
              <Magnet padding={60} magnetStrength={5}>
                <a
                  href={whatsappLink({}, "Home hero")}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm text-foreground transition hover:border-gold hover:text-gold"
                >
                  WhatsApp an adviser
                </a>
              </Magnet>
              <a
                href={callLink()}
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm text-foreground transition hover:border-gold hover:text-gold sm:hidden"
              >
                Call our Harrow office
              </a>
            </div>

            {/* mini interactive process strip */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                ["01", "Assess", "var(--gold-glow)"],
                ["02", "Apply", "var(--gold)"],
                ["03", "Arrive", "#ffffff"],
              ].map(([n, label, c]) => (
                <div key={n as string} className="group text-left">
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full w-0 transition-all duration-700 group-hover:w-full"
                      style={{ background: c as string, boxShadow: `0 0 10px ${c}` }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                    {n} · {label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedContent>

          {/* Reviews tile */}
          <div className="bento-tile p-6 lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Published rating
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-5xl text-foreground">
                <CountUp to={COMPANY.rating.score} decimals={2} />
              </span>
              <span className="text-sm text-muted-foreground">/ 5</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-amber">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber" />
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              <CountUp to={COMPANY.rating.reviews} suffix="+ published reviews" />
            </p>
            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
              Earthlink-approved published figure; individual outcomes are never guaranteed.
            </p>
          </div>

          {/* Years tile */}
          <div className="bento-tile p-6 lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Operating since
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-5xl text-gold-glow">
                <CountUp to={COMPANY.operatingYears} />
              </span>
              <span className="text-sm text-muted-foreground">years</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              UK-registered. Harrow office. Real advisers.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-gold">
              <ShieldCheck className="h-3.5 w-3.5" /> UK visa service partner: Stonebridge
            </div>
          </div>
        </div>
      </section>

      {/* ============== KPI / TRUST STRIP (animated) ============== */}
      <section className="border-y hairline bg-paper">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Successful files",
              value: 2400,
              suffix: "+",
              color: "var(--brand)",
              info: "Total education, recruitment-support, and visa files across Earthlink's worldwide work and Stonebridge-managed UK immigration matters. Each matter has a clearly named owner.",
              cta: { label: "See our services", href: "/services" },
            },
            {
              label: "Visa success rate",
              value: 97,
              suffix: "%",
              color: "var(--gold-glow)",
              info: "Rolling 12-month approval rate across supported visa matters. Earthlink handles non-UK preparation within scope; Stonebridge alone advises on and submits UK immigration applications.",
              cta: { label: "Visa services", href: "/service/student-visa" },
            },
            {
              label: "Universities supported",
              value: UNIVERSITY_DIRECTORY_TOTAL,
              suffix: "",
              color: "var(--navy)",
              info: "Universities and pathway colleges we help applicants research and apply to.",
              cta: { label: "Explore destinations", href: "/destinations" },
            },
            {
              label: "Countries served",
              value: 120,
              suffix: "+",
              color: "var(--brand)",
              info: "We serve applicants in 120+ countries worldwide. The UK, USA, Canada, Australia, Ireland, Malta, New Zealand, Europe, and UAE are featured study destinations, not the limit of our coverage.",
              cta: { label: "See all destinations", href: "/destinations" },
            },
          ].map((k) => (
            <div key={k.label} className="bento-tile-light p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {k.label}
              </p>
              <div className="mt-3 font-serif text-4xl text-navy">
                <CountUp to={k.value} suffix={k.suffix} />
              </div>
              <div className="mt-4">
                <ProgressBar
                  value={Math.min(100, k.value > 100 ? 92 : k.value)}
                  color={k.color}
                  trackClass="bg-border"
                />
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">{k.info}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== VALUES — INTERACTIVE LIST ============== */}
      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-brand">What we stand for</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">
              Five things we won't compromise on.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Most consultancies optimise for commission. We optimise for the call we'll get in your
              second year, from your new city, saying it worked.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-xl border hairline bg-card p-4">
              <Activity className="h-5 w-5 text-brand" />
              <div className="text-xs text-muted-foreground">
                Hover any value to expand the principle.
              </div>
            </div>
          </div>
          <ul className="grid gap-3 lg:col-span-8">
            {VALUES.map((v, i) => (
              <li
                key={v.title}
                className="group cursor-pointer rounded-xl border hairline bg-card p-5 transition-all hover:border-brand/40 hover:bg-secondary"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border hairline font-serif text-sm text-brand transition-colors group-hover:bg-brand group-hover:text-foreground">
                    0{i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg text-navy">{v.title}</h3>
                    <div className="mt-1 h-[2px] w-0 bg-gold-glow transition-all duration-500 group-hover:w-full" />
                    <p className="mt-3 text-sm text-muted-foreground">{v.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============== BEFORE YOU MOVE — DASHBOARD CARDS ============== */}
      <section className="relative overflow-hidden bg-secondary text-foreground">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.12]" />
        <div className="container-page relative py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                Before you move abroad
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-4xl text-balance">
                The questions everyone delays asking. We start there.
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <LiveBars color="var(--gold)" /> Real adviser response · &lt; 2 hrs
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                q: "Am I actually eligible?",
                a: "We read your transcripts, English score, finances, and gaps — then tell you what countries open up and which ones don't.",
                score: 92,
                detail: `We benchmark your academic profile against published entry requirements across ${UNIVERSITY_DIRECTORY_TOTAL} universities we support and give you a country-by-country education verdict. Stonebridge alone assesses UK immigration eligibility.`,
                href: "/service/profile-evaluation",
                label: "Profile evaluation",
              },
              {
                q: "What will this really cost?",
                a: "Tuition is the obvious bit. We forecast living costs, deposits, visa fees, IHS, GIC, blocked accounts, and forex spread.",
                score: 88,
                detail:
                  "Our 18-line cost sheet covers tuition, IHS, application fees, GIC / blocked account, OSHC, biometrics, courier, accommodation deposit, forex spread, and the often-missed first-month settling cost. Every line is sourced and dated.",
                href: "/service/financial-planning",
                label: "Financial planning",
              },
              {
                q: "Will I get the visa?",
                a: "Refusal rates differ by country, university tier, profile, and embassy. We brief you before, not after.",
                score: 97,
                detail:
                  "Earthlink prepares supported non-UK files against published requirements. Stonebridge alone provides UK immigration advice, reviews UK evidence, and handles every UK application.",
                href: "/service/student-visa",
                label: "Student visa filing",
              },
              {
                q: "What about jobs after?",
                a: "Graduate Route, OPT, PGWP, 485, Stay Back — we map your route to a real job, not just a degree.",
                score: 84,
                detail:
                  "We help jobseekers identify suitable employers, strengthen their CV, organise applications, and prepare for interviews. We do not procure sponsorship, arrange sponsor licences, sell jobs, or guarantee offers.",
                href: "/service/recruitment",
                label: "Recruitment & jobs",
              },
              {
                q: "What if my profile is unusual?",
                a: "Gap years, low marks, career switchers, dependants — we've placed all of them. Bring the awkward case.",
                score: 80,
                detail:
                  "We specialise in the cases big agencies refuse: 3+ year gaps, sub-50% academics, refused-visa histories, dependants, mid-career switchers, and non-traditional finance sources. Bring the file no one else would look at.",
                href: "/contact",
                label: "Talk to an adviser",
              },
              {
                q: "Who handles the paperwork?",
                a: "We do. Document collection, formatting, portal submissions, embassy uploads. You review and sign.",
                score: 100,
                detail:
                  "Our documentation team helps prepare academic records, SOPs, LOR guidance, and university application packs. Where a university requires direct submission, you submit personally. Stonebridge alone handles UK immigration forms and uploads.",
                href: "/service/documentation",
                label: "Documentation",
              },
            ].map((item, i) => (
              <article key={item.q} className="bento-tile p-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-gold-glow">0{i + 1}</span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Q · A
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>Coverage</span>
                    <span className="text-gold">
                      <CountUp to={item.score} suffix="%" />
                    </span>
                  </div>
                  <ProgressBar value={item.score} color="var(--gold)" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== JOURNEY — STEP DASHBOARD ============== */}
      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-brand">The Earthlink journey</p>
            <h2 className="mt-3 font-serif text-4xl text-navy text-balance">
              Eight steps. One adviser. Zero handoffs.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From the first call to your first week abroad, one named adviser owns your file.
            </p>

            <div className="relative mt-8 rounded-xl border hairline bg-secondary p-6 text-foreground">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Active pipeline
                </p>
                <LiveBars color="var(--gold)" />
              </div>
              <RadialGauge value={97} label="On-time visa filings" color="var(--gold)" />
            </div>
          </div>

          <ol className="grid gap-3 lg:col-span-8 sm:grid-cols-2">
            {JOURNEY.map((j, i) => (
              <AnimatedContent
                as="li"
                key={j.step}
                distance={30}
                direction="vertical"
                duration={0.7}
                delay={i * 0.05}
              >
                <SpotlightCard
                  className="group relative h-full !rounded-xl !border-[color:color-mix(in_oklab,var(--navy)_10%,transparent)] !bg-card !p-5 transition-transform duration-200 hover:!border-[color:color-mix(in_oklab,var(--brand)_40%,transparent)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                  spotlightColor="rgba(47, 163, 214, 0.22)"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-3xl text-brand transition-transform duration-300 group-hover:scale-110 group-[.is-pressed]:scale-110">
                      0{j.step}
                    </span>
                    <span className="rounded-full border hairline px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      Step {i + 1} / {JOURNEY.length}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg text-navy">{j.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{j.body}</p>
                  <div
                    className="mt-4 h-1 w-full overflow-hidden rounded-full bg-border"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-gold-glow transition-all duration-700 group-hover:w-full group-focus-visible:w-full group-[.is-pressed]:w-full"
                      style={{ width: `${((i + 1) / JOURNEY.length) * 100}%` }}
                    />
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </ol>
        </div>
      </section>

      {/* ============== SERVICES — BENTO MOSAIC ============== */}
      <section className="bg-secondary/60">
        <div className="container-page py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-brand">Services</p>
              <h2 className="mt-3 font-serif text-4xl text-navy">
                Ten services. One end-to-end file.
              </h2>
            </div>
            <Link to="/services" className="text-sm text-navy hover:text-brand">
              See all services →
            </Link>
          </div>

          <div className="mt-10 grid auto-rows-[170px] grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICON_MAP[s.icon];
              const featured = i === 0 || i === 5; // span larger
              return (
                <TiltedCard
                  key={s.slug}
                  max={6}
                  scale={1.02}
                  className={featured ? "row-span-2" : ""}
                >
                  <Link
                    to="/service/$slug"
                    params={{ slug: s.slug }}
                    className="group relative block h-full overflow-hidden rounded-xl border hairline bg-card p-5 transition hover:border-brand/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-base text-navy">{s.title}</h3>
                    {featured && <p className="mt-2 text-xs text-muted-foreground">{s.blurb}</p>}
                    <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-brand" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] w-0 bg-gold-glow transition-all duration-500 group-hover:w-full" />
                  </Link>
                </TiltedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== PARTNERS / UNIVERSITY MARQUEE ============== */}
      <section className="border-y hairline bg-paper py-8">
        <div className="container-page mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Universities we help applicants apply to
          </p>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {UNIVERSITY_DIRECTORY_TOTAL} institutions
          </span>
        </div>
        <Marquee speed={40}>
          {[
            "University of Oxford",
            "Imperial College London",
            "King's College",
            "UCL",
            "LSE",
            "Edinburgh",
            "Manchester",
            "Warwick",
            "Bristol",
            "Toronto",
            "McGill",
            "UBC",
            "Melbourne",
            "Sydney",
            "Auckland",
            "Trinity College Dublin",
            "TU Munich",
            "ETH Zürich",
          ].map((name) => (
            <span
              key={name}
              className="font-serif text-xl text-navy/60 transition-colors hover:text-brand whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ============== DESTINATIONS — FLIP CARDS ============== */}
      <section className="relative overflow-hidden bg-muted text-foreground">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.14]" />
        <div className="container-page relative py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Destinations</p>
              <h2 className="mt-3 font-serif text-4xl text-foreground">
                Featured study destinations, within worldwide support.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                Hover or tap any card to flip and see the inside view.
              </p>
            </div>
            <Link to="/destinations" className="text-sm text-gold hover:underline">
              All destinations →
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map((d) => {
              const weight = DEST_WEIGHTS[d.slug] ?? 60;
              return (
                <FlipCard
                  key={d.slug}
                  minHeight="min-h-72"
                  front={
                    <div className="relative h-full w-full">
                      <img
                        src={d.heroImage}
                        alt={`Study in ${d.name}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/10" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gold-glow">
                          Destination
                        </p>
                        <h3 className="mt-1 font-serif text-2xl text-white drop-shadow-sm">
                          {d.name}
                        </h3>
                        <div className="mt-3 flex items-center gap-2 text-xs text-white/85">
                          <Globe2 className="h-3.5 w-3.5 text-gold-glow" />
                          <span>
                            Demand <CountUp to={weight} suffix="%" />
                          </span>
                        </div>
                      </div>
                      <span className="absolute top-3 right-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white backdrop-blur">
                        Flip
                      </span>
                    </div>
                  }
                  back={
                    <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-navy via-navy-deep to-navy p-5 text-white">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                          {d.name}
                        </p>
                        <p className="mt-2 text-sm text-white/85">{d.short}</p>
                        <ul className="mt-4 space-y-1.5 text-xs text-white/75">
                          <li className="flex items-start gap-2">
                            <Plane className="mt-0.5 h-3 w-3 text-gold-glow" /> Intakes:{" "}
                            {d.intakes.join(", ")}
                          </li>
                          <li className="flex items-start gap-2">
                            <Activity className="mt-0.5 h-3 w-3 text-gold-glow" />{" "}
                            {d.workRights.split(".")[0]}
                          </li>
                          <li className="flex items-start gap-2">
                            <ShieldCheck className="mt-0.5 h-3 w-3 text-gold-glow" /> Earthlink
                            intake index {weight}%
                          </li>
                        </ul>
                      </div>
                      <Link
                        to="/destination/$slug"
                        params={{ slug: d.slug }}
                        className="mt-4 inline-flex items-center justify-between rounded-md border border-gold/40 px-3 py-2 text-xs font-medium text-gold transition hover:bg-gold hover:text-navy-deep"
                      >
                        Explore {d.name} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  }
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS — CAROUSEL ============== */}
      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand">Student voices</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">
              What students say once they've landed.
            </h2>
          </div>
          <Link to="/testimonials" className="text-sm text-navy hover:text-brand">
            All testimonials →
          </Link>
        </div>
        <div className="mt-12">
          <Carousel
            perView={3}
            interval={6000}
            items={FEATURED_GOOGLE_REVIEWS.map((review) => (
              <figure key={review.id} className="bento-tile-light flex h-full flex-col p-6">
                <div className="flex items-center gap-2 text-amber">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-amber" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-lg leading-snug text-navy">
                  "{review.text}"
                </blockquote>
                <figcaption className="mt-6 border-t hairline pt-4 text-xs text-muted-foreground">
                  <span className="font-medium text-navy">{review.reviewerName}</span> · Google
                  review
                  <span className="mt-1 flex items-center gap-1 text-brand">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(`${review.publishedAt}T00:00:00Z`).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </span>
                </figcaption>
              </figure>
            ))}
          />
          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-muted-foreground">
            {GOOGLE_REVIEW_CONTEXT}
          </p>
        </div>
      </section>

      <PhasesOfDoubt />
      <HonestPledge />
      <ForParents />

      {/* ============== FINAL CTA ============== */}
      <section className="relative overflow-hidden bg-secondary text-foreground">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-gold-glow/20 blur-[120px]" />
        <div className="container-page relative grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> 30-minute free consultation
            </p>
            <h2 className="mt-3 font-serif text-4xl text-balance">Talk to an adviser this week.</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Phone, video, or in person at our Harrow office. No commission games.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Magnet padding={60} magnetStrength={4}>
              <Link to="/contact" className="btn-accent rounded-md px-6 py-3 text-sm font-medium">
                Book consultation
              </Link>
            </Magnet>
            <Magnet padding={60} magnetStrength={5}>
              <a
                href={whatsappLink({}, "Home footer CTA")}
                target="_blank"
                rel="noopener"
                className="rounded-md border border-border px-6 py-3 text-sm text-foreground transition hover:border-gold hover:text-gold"
              >
                WhatsApp us
              </a>
            </Magnet>
            <Magnet padding={60} magnetStrength={5}>
              <a
                href={mailtoLink()}
                className="rounded-md border border-border px-6 py-3 text-sm text-foreground transition hover:border-gold hover:text-gold"
              >
                Email us
              </a>
            </Magnet>
          </div>
        </div>
      </section>
    </div>
  );
}
