// GROQ queries + typed fetch helpers for Sanity content.
// All helpers return null / empty arrays when Sanity is not configured,
// so callers can safely fall back to local static content.

import { sanityClient, sanityConfigured, imgUrl } from "./sanity";
import { BLOGS, getBlog, type Blog } from "@/content/blogs";
import {
  UNIVERSITY_PARTNERS,
  type University,
  type UniversityCountry,
} from "@/content/universities";
import {
  findStaticUniversityBySlug,
  slugifyUniversityName,
  type RelatedUniversity,
  type UniversityDetail,
} from "./university-static";

export {
  findStaticRelatedUniversities,
  findStaticUniversityBySlug,
  slugifyUniversityName,
} from "./university-static";
export type {
  RelatedUniversity,
  UniversityAdmissions,
  UniversityDetail,
} from "./university-static";

// ---------- Blog ----------

const BLOG_LIST_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    category,
    "author": coalesce(author->name, "Earthlink Editorial"),
    "date": publishedAt,
    "bodyText": pt::text(body),
    coverImage,
    coverCaption,
    tags
  }
`;

const BLOG_DETAIL_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    excerpt,
    category,
    "author": coalesce(author->name, "Earthlink Editorial"),
    "date": publishedAt,
    "bodyText": pt::text(body),
    coverImage,
    coverCaption,
    tags,
    body
  }
`;

type SanityBlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: Blog["category"];
  author: string;
  date: string;
  bodyText?: string;
  coverImage: unknown;
  coverCaption?: string;
  tags: string[];
};

type SanityBlogDetail = SanityBlogListItem & { body: unknown };

function mapBlogList(item: SanityBlogListItem): Blog {
  const fallback = getBlog(item.slug);
  const bodyText = item.bodyText?.trim() || fallback?.body.join(" ").trim() || "";
  return {
    slug: item.slug,
    title: item.title ?? fallback?.title ?? item.slug,
    excerpt: item.excerpt ?? fallback?.excerpt ?? "",
    category: item.category ?? fallback?.category ?? "Guides",
    author: item.author ?? fallback?.author ?? "Earthlink Editorial",
    date: item.date ?? fallback?.date ?? "",
    readMinutes: Math.max(1, Math.ceil(bodyText.split(/\s+/).filter(Boolean).length / 200)),
    cover: imgUrl(item.coverImage as never, 1200) ?? fallback?.cover ?? "",
    coverCaption: item.coverCaption ?? fallback?.coverCaption,
    tags: item.tags ?? fallback?.tags ?? [],
    body: fallback?.body ?? [],
    // Non-typed passthrough: raw Sanity image ref for responsive rendering.
    ...(item.coverImage ? { coverRef: item.coverImage } : {}),
  } as Blog;
}

export function mergeBlogsWithFallback(cmsBlogs: Blog[]): Blog[] {
  const cmsSlugs = new Set(cmsBlogs.map((blog) => blog.slug));
  return [...cmsBlogs, ...BLOGS.filter((blog) => !cmsSlugs.has(blog.slug))];
}

export type SanityResult<T> =
  | { status: "skipped" } // Sanity not configured
  | { status: "ok"; data: T }
  | { status: "error"; error: string };

export async function fetchBlogList(): Promise<Blog[] | null> {
  const res = await fetchBlogListResult();
  return res.status === "ok" ? res.data : null;
}

export async function fetchBlogListResult(): Promise<SanityResult<Blog[]>> {
  if (!sanityConfigured || !sanityClient) return { status: "skipped" };
  try {
    const rows = await sanityClient.fetch<SanityBlogListItem[]>(BLOG_LIST_QUERY);
    return { status: "ok", data: mergeBlogsWithFallback(rows.map(mapBlogList)) };
  } catch (err) {
    console.error("[sanity] fetchBlogList failed", err);
    return { status: "error", error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export type BlogWithPortableText = Blog & { portableBody?: unknown };

export async function fetchBlogBySlug(slug: string): Promise<BlogWithPortableText | null> {
  if (!sanityConfigured || !sanityClient) return null;
  try {
    const row = await sanityClient.fetch<SanityBlogDetail | null>(BLOG_DETAIL_QUERY, { slug });
    if (!row) return null;
    const base = mapBlogList(row);
    return { ...base, portableBody: row.body };
  } catch (err) {
    console.error("[sanity] fetchBlogBySlug failed", err);
    return null;
  }
}

// ---------- Universities ----------

const UNIVERSITIES_QUERY = /* groq */ `
  *[_type == "country"] | order(order asc, country asc) {
    country,
    "slug": slug.current,
    flag,
    blurb,
    "universities": *[_type == "university" && references(^._id)] | order(order asc, name asc) {
      name,
      domain,
      city,
      speciality,
      highlights,
      website,
      logo,
      coverImage,
      "slug": slug.current,
      programs,
      ranking,
      tuitionRange,
      description,
      applicationSupportNote
    }
  }
`;

const UNIVERSITY_BATCH_MAX_SIZE = 50;

function universityCountriesBatchQuery(offset: number, end: number): string {
  // GROQ slice bounds are emitted as validated integer literals. Keeping the
  // slice inside each country projection returns the same page for every
  // country in one request instead of downloading the entire directory.
  return /* groq */ `
    *[_type == "country"] | order(order asc, country asc) {
      country,
      "slug": slug.current,
      flag,
      blurb,
      "totalUniversities": count(*[_type == "university" && references(^._id)]),
      "universities": *[_type == "university" && references(^._id)]
        | order(order asc, name asc)
        [${offset}...${end}] {
          name,
          domain,
          city,
          speciality,
          highlights,
          website,
          logo,
          coverImage,
          "slug": slug.current,
          programs,
          ranking,
          tuitionRange,
          description,
          applicationSupportNote
        }
    }
  `;
}

type SanityUniversityCountry = {
  country: string;
  slug: string;
  flag: string;
  blurb: string;
  totalUniversities?: number;
  universities: Array<
    University & {
      logo?: unknown;
      coverImage?: unknown;
      slug?: string;
      programs?: string[];
      ranking?: string;
      tuitionRange?: string;
      description?: unknown;
    }
  >;
};

export type UniversityCountriesBatch = {
  countries: UniversityCountry[];
  hasMore: boolean;
  nextOffset: number | null;
};

function universityKey(university: University): string {
  return (
    (university as University & { slug?: string }).slug ?? slugifyUniversityName(university.name)
  );
}

function mapUniversityCountry(country: SanityUniversityCountry): UniversityCountry {
  return {
    country: country.country,
    slug: country.slug,
    flag: country.flag,
    blurb: country.blurb,
    universities: country.universities.map((university) => {
      const fallbackUniversity = UNIVERSITY_PARTNERS.find(
        (candidate) => candidate.slug === country.slug,
      )?.universities.find((candidate) => universityKey(candidate) === universityKey(university));
      return {
        name: university.name,
        domain: university.domain,
        city: university.city,
        speciality: university.speciality,
        highlights: university.highlights ?? [],
        website: university.website,
        applicationSupportNote:
          university.applicationSupportNote ?? fallbackUniversity?.applicationSupportNote,
        // Passthrough (not part of the static type) — enables detail links + responsive images.
        ...(university.slug ? { slug: university.slug } : {}),
        ...(university.logo ? { logoRef: university.logo } : {}),
        ...(university.coverImage ? { coverRef: university.coverImage } : {}),
      };
    }) as University[],
  };
}

export function mergeUniversityCountriesWithFallback(
  cmsCountries: UniversityCountry[],
): UniversityCountry[] {
  const cmsBySlug = new Map(cmsCountries.map((country) => [country.slug, country]));
  const localSlugs = new Set(UNIVERSITY_PARTNERS.map((country) => country.slug));
  const merged = UNIVERSITY_PARTNERS.map((localCountry) => {
    const cmsCountry = cmsBySlug.get(localCountry.slug);
    if (!cmsCountry) return localCountry;
    const cmsUniversities = new Set(cmsCountry.universities.map(universityKey));
    return {
      ...localCountry,
      ...cmsCountry,
      universities: [
        ...cmsCountry.universities,
        ...localCountry.universities.filter(
          (university) => !cmsUniversities.has(universityKey(university)),
        ),
      ],
    };
  });
  return [...merged, ...cmsCountries.filter((country) => !localSlugs.has(country.slug))];
}

export async function fetchUniversityCountries(): Promise<UniversityCountry[] | null> {
  const res = await fetchUniversityCountriesResult();
  return res.status === "ok" ? res.data : null;
}

export async function fetchUniversityCountriesResult(): Promise<SanityResult<UniversityCountry[]>> {
  if (!sanityConfigured || !sanityClient) return { status: "skipped" };
  try {
    const rows = await sanityClient.fetch<SanityUniversityCountry[]>(
      UNIVERSITIES_QUERY,
      {},
      { timeout: 8_000 },
    );
    if (!rows?.length) return { status: "skipped" };
    const data = rows.map(mapUniversityCountry);
    return { status: "ok", data: mergeUniversityCountriesWithFallback(data) };
  } catch (err) {
    console.error("[sanity] fetchUniversityCountries failed", err);
    return { status: "error", error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function fetchUniversityCountriesBatchResult(
  offset: number,
  limit = 10,
): Promise<SanityResult<UniversityCountriesBatch>> {
  if (!sanityConfigured || !sanityClient) return { status: "skipped" };

  const safeOffset = Math.max(0, Math.floor(offset));
  const safeLimit = Math.min(UNIVERSITY_BATCH_MAX_SIZE, Math.max(1, Math.floor(limit)));
  const end = safeOffset + safeLimit;

  try {
    const rows = await sanityClient.fetch<SanityUniversityCountry[]>(
      universityCountriesBatchQuery(safeOffset, end),
      {},
      { timeout: 8_000 },
    );
    if (!rows?.length) return { status: "skipped" };

    const hasMore = rows.some((country) => (country.totalUniversities ?? 0) > end);
    return {
      status: "ok",
      data: {
        countries: rows.map(mapUniversityCountry),
        hasMore,
        nextOffset: hasMore ? end : null,
      },
    };
  } catch (err) {
    console.error("[sanity] fetchUniversityCountriesBatch failed", err);
    return { status: "error", error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// ---------- University detail ----------

const UNIVERSITY_DETAIL_QUERY = /* groq */ `
  *[_type == "university" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    city,
    domain,
    website,
    speciality,
    highlights,
    ranking,
    tuitionRange,
    programs,
    intakes,
    scholarshipsAvailable,
    applicationSupportNote,
    description,
    applyLink,
    logo,
    coverImage,
    admissions,
    seo,
    "country": country->{
      "_id": _id,
      country,
      "slug": slug.current,
      flag,
      blurb
    }
  }
`;

export async function fetchUniversityBySlug(slug: string): Promise<UniversityDetail | null> {
  const res = await fetchUniversityBySlugResult(slug);
  return res.status === "ok" ? res.data : null;
}

export async function fetchUniversityBySlugResult(
  slug: string,
): Promise<SanityResult<UniversityDetail>> {
  if (!sanityConfigured || !sanityClient) return { status: "skipped" };
  try {
    const row = await sanityClient.fetch<UniversityDetail | null>(
      UNIVERSITY_DETAIL_QUERY,
      { slug },
      { timeout: 8_000 },
    );
    if (!row) return { status: "skipped" };
    const fallback = findStaticUniversityBySlug(slug);
    return {
      status: "ok",
      data: fallback
        ? {
            ...fallback,
            ...row,
            applicationSupportNote: row.applicationSupportNote ?? fallback.applicationSupportNote,
            country: row.country ? { ...fallback.country, ...row.country } : fallback.country,
          }
        : row,
    };
  } catch (err) {
    console.error("[sanity] fetchUniversityBySlug failed", err);
    return { status: "error", error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// ---------- Related universities ----------

const RELATED_UNIVERSITIES_QUERY = /* groq */ `
  *[
    _type == "university"
    && slug.current != $slug
    && (
      country._ref == $countryId
      || (defined($ranking) && defined(ranking) && ranking == $ranking)
    )
  ]
  | order(
      select(country._ref == $countryId => 0, 1),
      order asc,
      name asc
    )
  [0...$limit] {
    "slug": slug.current,
    name,
    city,
    speciality,
    ranking,
    tuitionRange,
    logo,
    coverImage,
    applicationSupportNote,
    "country": country->{
      country,
      "slug": slug.current,
      flag
    }
  }
`;

export async function fetchRelatedUniversitiesResult(args: {
  slug: string;
  countryId?: string | null;
  ranking?: string | null;
  limit?: number;
}): Promise<SanityResult<RelatedUniversity[]>> {
  if (!sanityConfigured || !sanityClient) return { status: "skipped" };
  if (!args.countryId && !args.ranking) return { status: "ok", data: [] };
  try {
    const rows = await sanityClient.fetch<RelatedUniversity[]>(RELATED_UNIVERSITIES_QUERY, {
      slug: args.slug,
      countryId: args.countryId ?? "",
      ranking: args.ranking ?? null,
      limit: args.limit ?? 3,
    });
    return { status: "ok", data: rows ?? [] };
  } catch (err) {
    console.error("[sanity] fetchRelatedUniversities failed", err);
    return { status: "error", error: err instanceof Error ? err.message : "Unknown error" };
  }
}
