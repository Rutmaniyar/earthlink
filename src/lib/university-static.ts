import { UNIVERSITY_PARTNERS } from "@/content/universities";

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
  applicationSupportNote?: boolean;
  description?: unknown;
  applyLink?: string;
  logo?: unknown;
  coverImage?: unknown;
  admissions?: UniversityAdmissions;
  seo?: { title?: string; description?: string; ogImage?: unknown; noIndex?: boolean };
  country?: { _id?: string; country: string; slug: string; flag?: string; blurb?: string };
};

export type RelatedUniversity = {
  slug: string;
  name: string;
  city?: string;
  speciality?: string;
  ranking?: string;
  tuitionRange?: string;
  logo?: unknown;
  coverImage?: unknown;
  applicationSupportNote?: boolean;
  country?: { country: string; slug: string; flag?: string };
};

export function slugifyUniversityName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findStaticRelatedUniversities(
  slug: string,
  countrySlug: string | undefined,
  limit = 3,
): RelatedUniversity[] {
  if (!countrySlug) return [];
  const country = UNIVERSITY_PARTNERS.find((candidate) => candidate.slug === countrySlug);
  if (!country) return [];
  return country.universities
    .filter((university) => slugifyUniversityName(university.name) !== slug)
    .slice(0, limit)
    .map((university) => ({
      slug: slugifyUniversityName(university.name),
      name: university.name,
      city: university.city,
      speciality: university.speciality,
      applicationSupportNote: university.applicationSupportNote,
      country: { country: country.country, slug: country.slug, flag: country.flag },
    }));
}

export function findStaticUniversityBySlug(slug: string): UniversityDetail | null {
  for (const country of UNIVERSITY_PARTNERS) {
    for (const university of country.universities) {
      if (slugifyUniversityName(university.name) === slug) {
        return {
          slug,
          name: university.name,
          city: university.city,
          domain: university.domain,
          website: university.website,
          speciality: university.speciality,
          highlights: university.highlights,
          applicationSupportNote: university.applicationSupportNote,
          country: {
            country: country.country,
            slug: country.slug,
            flag: country.flag,
            blurb: country.blurb,
          },
        };
      }
    }
  }
  return null;
}

/**
 * Small head-only Sanity image helper. Building a CDN URL directly keeps the
 * full Sanity client and image builder out of every route's critical bundle.
 */
export function sanityHeadImageUrl(source: unknown, width = 1200): string | undefined {
  if (!source) return undefined;
  if (typeof source === "string") return source;

  const value = source as { _ref?: string; asset?: { _ref?: string } };
  const ref = value.asset?._ref ?? value._ref;
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
  const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";
  const match = ref?.match(/^image-(.+)-(\d+x\d+)-([a-z0-9]+)$/i);
  if (!projectId || !match) return undefined;

  const [, assetId, dimensions, format] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}?w=${width}&auto=format`;
}
