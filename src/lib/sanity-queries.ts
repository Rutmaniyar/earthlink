// GROQ queries + typed fetch helpers for Sanity content.
// All helpers return null / empty arrays when Sanity is not configured,
// so callers can safely fall back to local static content.

import { sanityClient, sanityConfigured, imgUrl } from "./sanity";
import type { Blog } from "@/content/blogs";
import { UNIVERSITY_PARTNERS, type University, type UniversityCountry } from "@/content/universities";

// ---------- Blog ----------

const BLOG_LIST_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    category,
    "author": coalesce(author->name, "Earthlink Editorial"),
    "date": publishedAt,
    readMinutes,
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
    readMinutes,
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
  readMinutes: number;
  coverImage: unknown;
  coverCaption?: string;
  tags: string[];
};

type SanityBlogDetail = SanityBlogListItem & { body: unknown };

function mapBlogList(item: SanityBlogListItem): Blog {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? "",
    category: item.category,
    author: item.author,
    date: item.date,
    readMinutes: item.readMinutes ?? 5,
    cover: imgUrl(item.coverImage as never, 1200) ?? "",
    coverCaption: item.coverCaption,
    tags: item.tags ?? [],
    body: [], // filled on detail
    // Non-typed passthrough: raw Sanity image ref for responsive rendering.
    ...(item.coverImage ? { coverRef: item.coverImage } : {}),
  } as Blog;
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
    return { status: "ok", data: rows.map(mapBlogList) };
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
      description
    }
  }
`;

type SanityUniversityCountry = {
  country: string;
  slug: string;
  flag: string;
  blurb: string;
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

export async function fetchUniversityCountries(): Promise<UniversityCountry[] | null> {
  const res = await fetchUniversityCountriesResult();
  return res.status === "ok" ? res.data : null;
}

export async function fetchUniversityCountriesResult(): Promise<SanityResult<UniversityCountry[]>> {
  if (!sanityConfigured || !sanityClient) return { status: "skipped" };
  try {
    const rows = await sanityClient.fetch<SanityUniversityCountry[]>(UNIVERSITIES_QUERY);
    if (!rows?.length) return { status: "skipped" };
    const data = rows.map((c) => ({
      country: c.country,
      slug: c.slug,
      flag: c.flag,
      blurb: c.blurb,
      universities: c.universities.map((u) => ({
        name: u.name,
        domain: u.domain,
        city: u.city,
        speciality: u.speciality,
        highlights: u.highlights ?? [],
        website: u.website,
        // Passthrough (not part of the static type) — enables detail links + responsive images.
        ...(u.slug ? { slug: u.slug } : {}),
        ...(u.logo ? { logoRef: u.logo } : {}),
        ...(u.coverImage ? { coverRef: u.coverImage } : {}),
      })) as University[],
    }));
    return { status: "ok", data };
  } catch (err) {
    console.error("[sanity] fetchUniversityCountries failed", err);
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

export type UniversityAdmissions = {
  ielts?: string;
  toefl?: string;
  pte?: string;
  duolingo?: string;
  gpa?: string;
  gre?: string;
  gmat?: string;
  sat?: string;
  applicationFee?: string;
  deadlineFall?: string;
  deadlineSpring?: string;
  requiredDocuments?: string[];
  notes?: string;
};

export type UniversityDetail = {
  slug: string;
  name: string;
  city?: string;
  domain?: string;
  website?: string;
  speciality?: string;
  highlights?: string[];
  ranking?: string;
  tuitionRange?: string;
  programs?: string[];
  intakes?: string[];
  scholarshipsAvailable?: boolean;
  description?: unknown; // Portable Text
  applyLink?: string;
  logo?: unknown;
  coverImage?: unknown;
  admissions?: UniversityAdmissions;
  seo?: { title?: string; description?: string; ogImage?: unknown; noIndex?: boolean };
  country?: { _id?: string; country: string; slug: string; flag?: string; blurb?: string };
};

export async function fetchUniversityBySlug(slug: string): Promise<UniversityDetail | null> {
  const res = await fetchUniversityBySlugResult(slug);
  return res.status === "ok" ? res.data : null;
}

export async function fetchUniversityBySlugResult(
  slug: string,
): Promise<SanityResult<UniversityDetail>> {
  if (!sanityConfigured || !sanityClient) return { status: "skipped" };
  try {
    const row = await sanityClient.fetch<UniversityDetail | null>(UNIVERSITY_DETAIL_QUERY, { slug });
    if (!row) return { status: "skipped" };
    return { status: "ok", data: row };
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
    "country": country->{
      country,
      "slug": slug.current,
      flag
    }
  }
`;

export type RelatedUniversity = {
  slug: string;
  name: string;
  city?: string;
  speciality?: string;
  ranking?: string;
  tuitionRange?: string;
  logo?: unknown;
  coverImage?: unknown;
  country?: { country: string; slug: string; flag?: string };
};

export async function fetchRelatedUniversitiesResult(args: {
  slug: string;
  countryId?: string | null;
  ranking?: string | null;
  limit?: number;
}): Promise<SanityResult<RelatedUniversity[]>> {
  if (!sanityConfigured || !sanityClient) return { status: "skipped" };
  if (!args.countryId && !args.ranking) return { status: "ok", data: [] };
  try {
    const rows = await sanityClient.fetch<RelatedUniversity[]>(
      RELATED_UNIVERSITIES_QUERY,
      {
        slug: args.slug,
        countryId: args.countryId ?? "",
        ranking: args.ranking ?? null,
        limit: args.limit ?? 3,
      },
    );
    return { status: "ok", data: rows ?? [] };
  } catch (err) {
    console.error("[sanity] fetchRelatedUniversities failed", err);
    return { status: "error", error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// Static fallback: same-country universities from the seeded partner list.
export function findStaticRelatedUniversities(
  slug: string,
  countrySlug: string | undefined,
  limit = 3,
): RelatedUniversity[] {
  if (!countrySlug) return [];
  const country = UNIVERSITY_PARTNERS.find((c) => c.slug === countrySlug);
  if (!country) return [];
  return country.universities
    .filter((u) => slugifyUniversityName(u.name) !== slug)
    .slice(0, limit)
    .map((u) => ({
      slug: slugifyUniversityName(u.name),
      name: u.name,
      city: u.city,
      speciality: u.speciality,
      country: { country: country.country, slug: country.slug, flag: country.flag },
    }));
}



// Deterministic slug used across static + Sanity content. Matches Sanity's
// default `slugify` behaviour closely enough for our seeded dataset.
export function slugifyUniversityName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Build a minimal UniversityDetail from the static partner list so the
// detail page has something meaningful to render when Sanity is unreachable.
export function findStaticUniversityBySlug(slug: string): UniversityDetail | null {
  for (const c of UNIVERSITY_PARTNERS) {
    for (const u of c.universities) {
      if (slugifyUniversityName(u.name) === slug) {
        return {
          slug,
          name: u.name,
          city: u.city,
          domain: u.domain,
          website: u.website,
          speciality: u.speciality,
          highlights: u.highlights,
          country: {
            country: c.country,
            slug: c.slug,
            flag: c.flag,
            blurb: c.blurb,
          },
        };
      }
    }
  }
  return null;
}

