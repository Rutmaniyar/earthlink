import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { BLOGS } from "@/content/blogs";
import { DESTINATIONS } from "@/content/destinations";
import { SCHOLARSHIPS, SERVICE_DETAILS } from "@/content/faqs";
import { UNIVERSITY_PARTNERS } from "@/content/universities";

const PRIORITY_DESTINATIONS = [
  "uk",
  "usa",
  "malta",
  "europe",
  "germany",
  "france",
  "spain",
  "portugal",
];
const PRIORITY_GUIDES = [
  "cost-of-living-uk-cities",
  "top-mba-programs-europe",
  "part-time-work-uk-students",
  "uk-graduate-route-2026",
  "study-in-usa-complete-guide",
  "study-in-germany-free-tuition",
  "germany-student-visa-blocked-account",
  "france-university-application-routes",
  "spain-university-application-student-visa",
  "portugal-university-application-residence",
  "verify-malta-university-course",
  "germany-vs-france-vs-spain-vs-portugal",
];

function collectStrings(value: unknown, output: string[] = []): string[] {
  if (typeof value === "string") output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => collectStrings(item, output));
  }
  return output;
}

describe("study-abroad content authority policy", () => {
  test("does not publish exact monetary amounts in bundled editorial content", () => {
    const publicCopy = collectStrings([
      BLOGS,
      DESTINATIONS,
      SCHOLARSHIPS,
      SERVICE_DETAILS,
      UNIVERSITY_PARTNERS,
    ]).join("\n");
    const forbidden = [
      /[£€¥₹]/,
      /\$\s*\d/,
      /\b(?:GBP|USD|EUR|CAD|AUD|NZD|AED)\s*\d/i,
      /\b\d[\d,.]*\s*(?:pounds?|euros?|dollars?)\b/i,
    ];

    forbidden.forEach((pattern) => expect(publicCopy).not.toMatch(pattern));
  });

  test("ships every priority destination and guide with structured authority content", () => {
    const destinationSlugs = new Set(DESTINATIONS.map((destination) => destination.slug));
    const blogSlugs = new Set(BLOGS.map((blog) => blog.slug));

    PRIORITY_DESTINATIONS.forEach((slug) => {
      const destination = DESTINATIONS.find((item) => item.slug === slug);
      expect(destinationSlugs.has(slug)).toBe(true);
      expect(destination?.directAnswer).toBeTruthy();
      expect(destination?.budget.length).toBeGreaterThan(0);
      expect(destination?.sources?.length).toBeGreaterThan(0);
      expect(destination?.faqs.length).toBeGreaterThan(0);
    });
    PRIORITY_GUIDES.forEach((slug) => {
      const blog = BLOGS.find((item) => item.slug === slug);
      expect(blogSlugs.has(slug)).toBe(true);
      expect(blog?.questionSections?.length).toBeGreaterThan(0);
      expect(blog?.sources?.length).toBeGreaterThan(0);
      expect(blog?.updateNotice).toBeTruthy();
    });
  });

  test("keeps internal relationships and source URLs valid", () => {
    const destinationSlugs = new Set(DESTINATIONS.map((destination) => destination.slug));
    const blogSlugs = new Set(BLOGS.map((blog) => blog.slug));

    DESTINATIONS.forEach((destination) => {
      destination.relatedDestinations?.forEach((slug) =>
        expect(destinationSlugs.has(slug)).toBe(true),
      );
      destination.relatedGuides?.forEach((slug) => expect(blogSlugs.has(slug)).toBe(true));
      destination.sources?.forEach((source) => expect(source.href).toMatch(/^https:\/\//));
    });
    BLOGS.forEach((blog) => {
      blog.relatedDestinations?.forEach((slug) => expect(destinationSlugs.has(slug)).toBe(true));
      blog.sources?.forEach((source) => expect(source.href).toMatch(/^https:\/\//));
    });
  });

  test("redirects the legacy Germany URL to the Germany hub", () => {
    const redirects = readFileSync("public/_redirects", "utf8");
    expect(redirects).toContain("/study-in-germany/ /destination/germany 301");
  });
});
