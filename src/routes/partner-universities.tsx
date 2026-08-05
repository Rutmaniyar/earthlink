import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import FlipCard from "@/components/reactbits/FlipCard";
import {
  UNIVERSITY_PARTNERS,
  type University,
  type UniversityCountry,
} from "@/content/universities";
import { whatsappLink } from "@/lib/lead";
import { getCachedLogo, setCachedLogo } from "@/lib/logo-cache";
import { fetchUniversityCountriesResult } from "@/lib/sanity-queries";
import { checkSanityHealth, type SanityHealth } from "@/lib/sanity";
import { SanityImage } from "@/components/sanity-image";
import { CmsStatus, UniversityCardSkeleton } from "@/components/cms-status";

export const Route = createFileRoute("/partner-universities")({
  head: () => ({
    meta: [
      { title: "Partnered Universities" },
      {
        name: "description",
        content: "Explore Earthlink Consultants' partnered universities by featured destination.",
      },
      { property: "og:title", content: "Partnered Universities" },
      {
        property: "og:description",
        content: "Partnered universities grouped by featured destination.",
      },
      { property: "og:url", content: absUrl("/partner-universities") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Partnered Universities" },
      {
        name: "twitter:description",
        content: "Partnered universities grouped by featured destination.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/partner-universities") }],
  }),
  component: PartnerUniversitiesPage,
});

function buildSources(domain: string) {
  return [
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icon.horse/icon/${domain}`,
  ];
}

function LogoImg({ uni }: { uni: University }) {
  const sanityLogo = (uni as unknown as { logoRef?: unknown }).logoRef;
  const [sanityFailed, setSanityFailed] = useState(false);

  const initials = uni.name
    .replace(/^(The |University of |University College )/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join("")
    .toUpperCase();

  // Prefer Sanity logo when available — deterministic, responsive, cacheable.
  if (sanityLogo && !sanityFailed) {
    return (
      <SanityImage
        image={sanityLogo as never}
        alt={`${uni.name} logo`}
        widths={[80, 128, 160, 240]}
        sizes="80px"
        aspectRatio={1}
        className="h-20 w-20 rounded-xl bg-white object-contain p-2 shadow-sm ring-1 ring-black/5"
        onError={() => setSanityFailed(true)}
      />
    );
  }

  // Fallback: probe favicon services and cache the first that loads.
  return <FaviconLogo uni={uni} initials={initials} />;
}

function FaviconLogo({ uni, initials }: { uni: University; initials: string }) {
  const [state, setState] = useState<{ idx: number; failed: boolean; src: string | null }>(() => {
    const cached = getCachedLogo(uni.domain);
    if (cached) {
      if (cached.src === null) return { idx: -1, failed: true, src: null };
      return { idx: -1, failed: false, src: cached.src };
    }
    const sources = buildSources(uni.domain);
    return { idx: 0, failed: false, src: sources[0] };
  });

  useEffect(() => {
    if (state.idx === -1) return;
  }, [state.idx]);

  if (state.failed || !state.src) {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-secondary text-xl font-serif text-foreground shadow-sm ring-1 ring-black/5">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={state.src}
      alt={`${uni.name} logo`}
      loading="lazy"
      decoding="async"
      width={80}
      height={80}
      referrerPolicy="no-referrer"
      onLoad={() => {
        if (state.idx >= 0) setCachedLogo(uni.domain, state.src!);
      }}
      onError={() => {
        const sources = buildSources(uni.domain);
        const nextIdx = state.idx + 1;
        if (state.idx >= 0 && nextIdx < sources.length) {
          setState({ idx: nextIdx, failed: false, src: sources[nextIdx] });
        } else {
          setCachedLogo(uni.domain, null);
          setState({ idx: -1, failed: true, src: null });
        }
      }}
      className="h-20 w-20 rounded-xl bg-white object-contain p-2 shadow-sm ring-1 ring-black/5"
    />
  );
}

function UniversityCard({ uni }: { uni: University }) {
  return (
    <FlipCard
      height="h-72"
      front={
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-paper to-secondary/40 p-6 text-center hairline border">
          {uni.applicationSupportNote && (
            <span className="absolute right-3 top-3 rounded-full border border-brand/30 bg-paper/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-brand shadow-sm">
              Application Support Only
            </span>
          )}
          <LogoImg uni={uni} />
          <div>
            <h3 className="font-serif text-lg leading-tight text-navy">{uni.name}</h3>
            <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {uni.city}
            </p>
          </div>
          <span className="mt-auto text-[11px] uppercase tracking-widest text-brand">
            Hover / tap to flip
          </span>
        </div>
      }
      back={
        <div className="flex h-full w-full flex-col justify-between bg-muted p-6 text-foreground hairline border border-brand/30">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="h-4 w-4" />
              <p className="text-[11px] uppercase tracking-widest">Speciality</p>
            </div>
            <h4 className="mt-2 font-serif text-lg leading-snug">{uni.speciality}</h4>
            <ul className="mt-4 space-y-2 text-sm text-foreground/85">
              {uni.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            {(uni as unknown as { slug?: string }).slug ? (
              <Link
                to="/university/$slug"
                params={{ slug: (uni as unknown as { slug: string }).slug }}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:text-gold"
              >
                View details <ArrowRight className="h-3 w-3" />
              </Link>
            ) : (
              <span />
            )}
            <a
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand"
            >
              Website <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      }
    />
  );
}

function PartnerUniversitiesPage() {
  const [countries, setCountries] = useState<UniversityCountry[]>(UNIVERSITY_PARTNERS);
  const [cmsState, setCmsState] = useState<"loading" | "error" | "idle">("loading");
  const [reloadKey, setReloadKey] = useState(0);
  const [cmsHealth, setCmsHealth] = useState<SanityHealth | null>(null);
  const [cmsError, setCmsError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    setCmsState("loading");
    setCmsError(null);
    fetchUniversityCountriesResult().then(async (res) => {
      if (cancelled) return;
      if (res.status === "ok" && res.data.length > 0) {
        setCountries(res.data);
        setCmsHealth({ status: "ok" });
        setCmsError(null);
        setCmsState("idle");
      } else if (res.status === "error") {
        setCmsError(res.error);
        console.error("[cms] partner universities fetch failed:", res.error);
        const health = await checkSanityHealth();
        if (cancelled) return;
        console.error("[cms] health probe result:", health);
        setCmsHealth(health);
        setCmsState(health.status === "ok" ? "idle" : "error");
      } else {
        setCmsState("idle");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const totals = useMemo(() => {
    const unis = countries.reduce((n, c) => n + c.universities.length, 0);
    return { unis, countries: countries.length };
  }, [countries]);

  const [activeSlug, setActiveSlug] = useState<string>("all");
  const visible = activeSlug === "all" ? countries : countries.filter((c) => c.slug === activeSlug);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted text-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,_color-mix(in_oklab,_var(--color-brand)_40%,_transparent),_transparent_50%),radial-gradient(circle_at_80%_70%,_color-mix(in_oklab,_var(--color-gold)_30%,_transparent),_transparent_45%)]" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">University network</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-balance md:text-6xl">
            Partnered Universities
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/85">
            {totals.unis}+ institutions across {totals.countries} featured destinations. Hover any
            card to see what that university is known for.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSlug("all")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeSlug === "all"
                  ? "bg-brand text-navy-deep"
                  : "border border-border text-foreground/85 hover:bg-background/50"
              }`}
            >
              All countries
            </button>
            {countries.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveSlug(c.slug)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeSlug === c.slug
                    ? "bg-brand text-navy-deep"
                    : "border border-border text-foreground/85 hover:bg-background/50"
                }`}
              >
                <span className="mr-1">{c.flag}</span> {c.country}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CMS status strip (non-blocking; static content stays visible below) */}
      {(cmsState === "loading" || cmsState === "error") && (
        <div className="container-page pt-8">
          <CmsStatus
            state={cmsState}
            loadingLabel="Refreshing partner universities from the CMS…"
            health={cmsHealth}
            errorDetail={cmsError}
            onRetry={() => setReloadKey((k) => k + 1)}
          />

          {cmsState === "loading" && countries === UNIVERSITY_PARTNERS && (
            <div
              className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              aria-hidden
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <UniversityCardSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Country blocks */}
      {visible.map((c) => (
        <section key={c.slug} id={c.slug} className="border-b bg-paper py-16 md:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-brand">
                  {c.universities.length} universities
                </p>
                <h2 className="mt-2 font-serif text-3xl text-navy md:text-4xl">
                  <span className="mr-3">{c.flag}</span> {c.country}
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">{c.blurb}</p>
              </div>
              <Link
                to="/destination/$slug"
                params={{ slug: c.slug }}
                className="inline-flex items-center gap-1 text-sm text-brand hover:text-gold"
              >
                Explore {c.country} destination page <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {c.universities.map((u) => (
                <UniversityCard key={u.name} uni={u} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-md bg-secondary p-10 text-center text-foreground md:p-16">
          <h2 className="font-serif text-3xl md:text-4xl">Don't see your dream university?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our network extends beyond this page. Tell us your target course and country and we'll
            confirm how Earthlink can help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(
                { message: "I'd like to check if you partner with a specific university." },
                "Partner universities page",
              )}
              className="btn-primary rounded-sm px-6 py-3 text-sm font-medium"
            >
              Ask on WhatsApp
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
