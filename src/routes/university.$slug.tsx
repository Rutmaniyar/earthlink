import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  ExternalLink,
  FileText,
  GraduationCap,
  MapPin,
  Sparkles,
  Trophy,
  Wallet,
} from "lucide-react";
import {
  findStaticUniversityBySlug,
  fetchUniversityBySlugResult,
  fetchRelatedUniversitiesResult,
  findStaticRelatedUniversities,
  type RelatedUniversity,
  type UniversityDetail,
} from "@/lib/sanity-queries";
import { imgUrl, checkSanityHealth, type SanityHealth } from "@/lib/sanity";
import { SITE_NAME, absUrl } from "@/lib/site-config";
import { SanityImage } from "@/components/sanity-image";
import { PortableBody } from "@/components/portable-text";
import { CmsStatus } from "@/components/cms-status";
import { Skeleton } from "@/components/ui/skeleton";
import { whatsappLink } from "@/lib/lead";

export const Route = createFileRoute("/university/$slug")({
  loader: async ({ params }) => {
    // Static fallback always available. Best-effort Sanity fetch enriches
    // the page after first render, so a slow CMS cannot block local content.
    const fallback = findStaticUniversityBySlug(params.slug);
    if (fallback) return { fallback, cms: null };
    const cms = await fetchUniversityBySlugResult(params.slug);
    const cmsData = cms.status === "ok" ? cms.data : null;
    return { fallback, cms: cmsData };
  },
  head: ({ params, loaderData }) => {
    const u = loaderData?.cms ?? loaderData?.fallback;
    const path = `/university/${params.slug}`;
    const canonical = absUrl(path);

    if (!u) {
      // Unknown slug — noindex so search engines don't attribute the generic
      // placeholder title/description to a page that may 404.
      return {
        meta: [
          { title: `University — ${SITE_NAME}` },
          { name: "description", content: "Explore partner universities, admissions requirements and application deadlines." },
          { name: "robots", content: "noindex, follow" },
          { property: "og:title", content: `University — ${SITE_NAME}` },
          { property: "og:url", content: canonical },
        ],
        links: [{ rel: "canonical", href: canonical }],
      };
    }

    const countryLabel = u.country?.country ? ` — ${u.country.country}` : "";
    const fallbackTitle = `${u.name}${countryLabel} | ${SITE_NAME}`;
    const fallbackDesc = [
      `${u.name}${u.city ? `, ${u.city}` : ""}`,
      u.speciality ? `Known for ${u.speciality}.` : null,
      "Programs, admissions requirements (IELTS/TOEFL/GPA), intakes and application deadlines.",
    ]
      .filter(Boolean)
      .join(" — ")
      .slice(0, 300);

    // Prefer CMS-defined SEO overrides when present.
    const title = u.seo?.title?.trim() || fallbackTitle;
    const desc = u.seo?.description?.trim() || fallbackDesc;
    const ogImage =
      imgUrl(u.seo?.ogImage as never, 1200) ||
      imgUrl((u as UniversityDetail).coverImage as never, 1200) ||
      imgUrl((u as UniversityDetail).logo as never, 1200) ||
      null;

    // Robots: honour CMS override; also noindex when only the static
    // fallback is showing (no CMS record for this slug) so we don't index
    // pages missing rich content.
    const hasCmsRecord = Boolean(loaderData?.cms);
    const robots = u.seo?.noIndex || !hasCmsRecord
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1";

    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: desc },
      { name: "robots", content: robots },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "article" },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
    ];
    if (ogImage) {
      meta.push(
        { property: "og:image", content: ogImage },
        { property: "og:image:alt", content: u.name },
        { name: "twitter:image", content: ogImage },
      );
    }
    return {
      meta,
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  errorComponent: ({ error }) => (
    <div className="container-page py-24 text-center">
      <p className="text-sm text-muted-foreground">
        We couldn't load this university right now. {error.message}
      </p>
      <Link to="/partner-universities" className="mt-4 inline-block text-sm text-brand hover:text-gold">
        ← Back to partner universities
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-serif text-3xl text-navy">University not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The university you're looking for isn't in our directory yet.
      </p>
      <Link to="/partner-universities" className="mt-6 inline-flex items-center gap-1 text-sm text-brand hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Browse partner universities
      </Link>
    </div>
  ),
  component: UniversityDetailPage,
});

function Field({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | null;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  if (!value) return null;
  return (
    <div className="rounded-md border hairline bg-paper p-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5 text-brand" />}
        {label}
      </div>
      <div className="mt-1 text-sm text-navy">{value}</div>
    </div>
  );
}

function UniversitySkeleton() {
  return (
    <article className="bg-paper" aria-hidden>
      <div className="container-page pt-8">
        <Skeleton className="h-4 w-64" />
      </div>
      <header className="container-page grid gap-8 pt-6 md:grid-cols-[auto_1fr] md:items-start">
        <Skeleton className="h-24 w-24 rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-9 w-3/4 md:h-12" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-2/3" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </header>
      <div className="container-page mt-10">
        <Skeleton className="aspect-[16/7] w-full rounded-lg" />
      </div>
      <div className="container-page grid gap-10 py-12 md:grid-cols-3 md:py-16">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>
        <aside className="space-y-3">
          <Skeleton className="h-6 w-40" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </aside>
      </div>
    </article>
  );
}

function UniversityDetailPage() {
  const { slug } = Route.useParams();
  const { fallback, cms } = Route.useLoaderData() as {
    fallback: UniversityDetail | null;
    cms: UniversityDetail | null;
  };

  const initialUni = cms ?? fallback;
  const [remoteUni, setRemoteUni] = useState<{ slug: string; data: UniversityDetail } | null>(null);
  const uni = remoteUni?.slug === slug ? remoteUni.data : initialUni;
  const [cmsState, setCmsState] = useState<"loading" | "error" | "idle">(cms ? "idle" : "loading");
  const [reloadKey, setReloadKey] = useState(0);
  const [cmsHealth, setCmsHealth] = useState<SanityHealth | null>(null);
  const [cmsError, setCmsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setCmsState("loading");
    setCmsError(null);
    fetchUniversityBySlugResult(slug).then(async (res) => {
      if (cancelled) return;
      if (res.status === "ok") {
        setRemoteUni({ slug, data: res.data });
        setCmsHealth({ status: "ok" });
        setCmsError(null);
        setCmsState("idle");
      } else if (res.status === "error") {
        setCmsError(res.error);
        console.error(`[cms] university "${slug}" fetch failed:`, res.error);
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
  }, [slug, reloadKey]);

  // Related universities — Sanity by country/ranking with static fallback.
  const fallbackRelated = findStaticRelatedUniversities(slug, fallback?.country?.slug, 3);
  const [remoteRelated, setRemoteRelated] = useState<{
    slug: string;
    data: RelatedUniversity[];
  } | null>(null);
  const related =
    remoteRelated?.slug === slug
      ? [
          ...remoteRelated.data,
          ...fallbackRelated.filter(
            (fallbackUniversity) =>
              !remoteRelated.data.some(
                (remoteUniversity) => remoteUniversity.slug === fallbackUniversity.slug,
              ),
          ),
        ].slice(0, 3)
      : fallbackRelated;

  useEffect(() => {
    let cancelled = false;
    const countryId = uni?.country?._id ?? null;
    const ranking = uni?.ranking ?? null;
    if (!countryId && !ranking) return;
    fetchRelatedUniversitiesResult({ slug, countryId, ranking, limit: 3 }).then((res) => {
      if (cancelled) return;
      if (res.status === "ok" && res.data.length > 0) {
        setRemoteRelated({ slug, data: res.data });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [slug, uni?.country?._id, uni?.ranking]);

  // Nothing to show at all — no static match and CMS still loading first time.
  if (!uni && cmsState === "loading") return <UniversitySkeleton />;

  // Nothing to show and CMS came back empty / errored — trigger 404 UI.
  if (!uni) throw notFound();

  const a = uni.admissions ?? {};
  const anyAdmissions =
    a.ielts || a.toefl || a.pte || a.duolingo || a.gpa || a.gre || a.gmat || a.sat ||
    a.applicationFee || a.deadlineFall || a.deadlineSpring ||
    (a.requiredDocuments && a.requiredDocuments.length) || a.notes;

  return (
    <article className="bg-paper">
      {/* Breadcrumb */}
      <div className="container-page pt-8 text-sm text-muted-foreground">
        <Link to="/partner-universities" className="hover:text-brand">Partner universities</Link>
        {uni.country && (
          <>
            <span className="mx-2">/</span>
            <Link
              to="/destination/$slug"
              params={{ slug: uni.country.slug }}
              className="hover:text-brand"
            >
              {uni.country.flag} {uni.country.country}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-navy">{uni.name}</span>
      </div>

      {/* CMS status — non-blocking, existing content stays visible */}
      <div className="container-page pt-4">
        <CmsStatus
          state={cmsState}
          loadingLabel="Fetching the latest details from the CMS…"
          health={cmsHealth}
          errorDetail={cmsError}
          onRetry={() => setReloadKey((k) => k + 1)}
        />

      </div>

      {/* Header */}
      <header className="container-page grid gap-8 pt-2 md:grid-cols-[auto_1fr] md:items-start">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          {uni.logo ? (
            <SanityImage
              image={uni.logo as never}
              alt={`${uni.name} logo`}
              widths={[96, 160, 240]}
              sizes="96px"
              aspectRatio={1}
              loading="eager"
              className="h-24 w-24 object-contain p-3"
            />
          ) : (
            <span className="font-serif text-2xl text-navy">{uni.name.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div>
          {uni.country && (
            <p className="text-xs uppercase tracking-[0.25em] text-brand">
              {uni.country.flag} {uni.country.country}
            </p>
          )}
          <h1 className="mt-2 font-serif text-3xl leading-tight text-navy md:text-5xl">{uni.name}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {uni.city && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {uni.city}
              </span>
            )}
            {uni.ranking && (
              <span className="inline-flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5 text-gold" /> {uni.ranking}
              </span>
            )}
            {uni.tuitionRange && (
              <span className="inline-flex items-center gap-1">
                <Wallet className="h-3.5 w-3.5" /> {uni.tuitionRange}
              </span>
            )}
            {uni.scholarshipsAvailable && (
              <span className="inline-flex items-center gap-1 text-brand">
                <BadgeCheck className="h-3.5 w-3.5" /> Scholarships available
              </span>
            )}
          </p>
          {uni.speciality && (
            <p className="mt-4 max-w-2xl text-base text-foreground/85 md:text-lg">
              <span className="text-gold">Known for: </span>
              {uni.speciality}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {uni.applyLink && (
              <a
                href={uni.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rounded-sm px-5 py-2.5 text-sm font-medium"
              >
                Apply through us
              </a>
            )}
            {uni.website && (
              <a
                href={uni.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-sm border border-border px-5 py-2.5 text-sm font-medium hover:bg-background/50"
              >
                Visit website <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <a
              href={whatsappLink(
                { message: `Hi Earthlink — I'd like to apply to ${uni.name}. Can you share the next steps?` },
                `University detail: ${uni.name}`,
              )}
              className="inline-flex items-center rounded-sm border border-border px-5 py-2.5 text-sm font-medium hover:bg-background/50"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Cover */}
      {uni.coverImage ? (
        <div className="container-page mt-10">
          <div className="aspect-[16/7] w-full overflow-hidden rounded-lg bg-secondary">
            <SanityImage
              image={uni.coverImage as never}
              alt={uni.name}
              aspectRatio={16 / 7}
              widths={[640, 800, 1024, 1280, 1600, 1920]}
              sizes="(min-width: 1280px) 1200px, 100vw"
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      {/* Content grid */}
      <div className="container-page grid gap-10 py-12 md:grid-cols-3 md:py-16">
        <div className="md:col-span-2 space-y-10">
          {/* Description */}
          {uni.description ? (
            <section>
              <h2 className="font-serif text-2xl text-navy">About {uni.name}</h2>
              <div className="prose mt-4 max-w-none text-base leading-relaxed text-navy/90">
                <PortableBody value={uni.description} />
              </div>
            </section>
          ) : null}

          {/* Highlights */}
          {uni.highlights && uni.highlights.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 font-serif text-2xl text-navy">
                <Sparkles className="h-5 w-5 text-gold" /> Highlights
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {uni.highlights.map((h) => (
                  <li key={h} className="rounded-md border hairline bg-paper p-3 text-sm text-foreground/85">
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Programs */}
          {uni.programs && uni.programs.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 font-serif text-2xl text-navy">
                <GraduationCap className="h-5 w-5 text-brand" /> Programs offered
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {uni.programs.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border hairline bg-secondary/40 px-3 py-1 text-xs text-navy"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar — Admissions */}
        <aside className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            {anyAdmissions ? (
              <section aria-labelledby="admissions-heading">
                <h2 id="admissions-heading" className="flex items-center gap-2 font-serif text-xl text-navy">
                  <FileText className="h-5 w-5 text-brand" /> Admissions requirements
                </h2>

                <div className="mt-4 grid gap-3">
                  <Field label="IELTS" value={a.ielts} />
                  <Field label="TOEFL iBT" value={a.toefl} />
                  <Field label="PTE Academic" value={a.pte} />
                  <Field label="Duolingo" value={a.duolingo} />
                  <Field label="GPA / grades" value={a.gpa} />
                  <Field label="GRE" value={a.gre} />
                  <Field label="GMAT" value={a.gmat} />
                  <Field label="SAT" value={a.sat} />
                  <Field label="Application fee" value={a.applicationFee} icon={Wallet} />
                  <Field label="Fall / Autumn deadline" value={a.deadlineFall} icon={CalendarClock} />
                  <Field label="Spring deadline" value={a.deadlineSpring} icon={CalendarClock} />
                </div>

                {a.requiredDocuments && a.requiredDocuments.length > 0 && (
                  <div className="mt-4 rounded-md border hairline bg-paper p-4">
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      Required documents
                    </div>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {a.requiredDocuments.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border hairline bg-secondary/50 px-2.5 py-0.5 text-xs text-navy"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {a.notes && (
                  <p className="mt-4 rounded-md bg-secondary/40 p-4 text-sm text-foreground/85">
                    {a.notes}
                  </p>
                )}

                {uni.intakes && uni.intakes.length > 0 && (
                  <div className="mt-4 rounded-md border hairline bg-paper p-4">
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Intakes</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {uni.intakes.map((i) => (
                        <span
                          key={i}
                          className="rounded-full border hairline bg-secondary/40 px-2.5 py-0.5 text-xs text-navy"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ) : (
              <p className="text-sm text-muted-foreground">
                Admissions requirements will be published soon. In the meantime,{" "}
                <a
                  href={whatsappLink(
                    { message: `Please share the admissions requirements for ${uni.name}.` },
                    `University detail: ${uni.name}`,
                  )}
                  className="text-brand hover:text-gold"
                >
                  ask us on WhatsApp
                </a>
                .
              </p>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t hairline bg-secondary/20">
          <div className="container-page py-12 md:py-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-brand">Explore more</p>
                <h2 id="related-heading" className="mt-2 font-serif text-2xl text-navy md:text-3xl">
                  {uni.country?.country
                    ? `More universities in ${uni.country.country}`
                    : "Related universities"}
                </h2>
              </div>
              <Link
                to="/partner-universities"
                className="hidden text-sm text-brand hover:text-gold md:inline"
              >
                View all →
              </Link>
            </div>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to="/university/$slug"
                    params={{ slug: r.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border hairline bg-paper transition hover:shadow-md"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden bg-secondary">
                      {r.coverImage ? (
                        <SanityImage
                          image={r.coverImage as never}
                          alt={r.name}
                          aspectRatio={16 / 9}
                          widths={[320, 480, 640, 800]}
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-serif text-3xl text-navy/40">
                          {r.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      {r.country && (
                        <p className="text-[11px] uppercase tracking-widest text-brand">
                          {r.country.flag} {r.country.country}
                        </p>
                      )}
                      <h3 className="font-serif text-lg leading-snug text-navy group-hover:text-brand">
                        {r.name}
                      </h3>
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        {r.city && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {r.city}
                          </span>
                        )}
                        {r.ranking && (
                          <span className="inline-flex items-center gap-1">
                            <Trophy className="h-3 w-3 text-gold" /> {r.ranking}
                          </span>
                        )}
                      </p>
                      {r.speciality && (
                        <p className="mt-1 line-clamp-2 text-sm text-foreground/80">
                          {r.speciality}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
