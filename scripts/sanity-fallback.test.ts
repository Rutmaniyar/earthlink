import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOGS } from "@/content/blogs";
import { UNIVERSITY_PARTNERS } from "@/content/universities";
import { SanityImage } from "@/components/sanity-image";
import { mergeBlogsWithFallback, mergeUniversityCountriesWithFallback } from "@/lib/sanity-queries";

describe("Sanity fallbacks", () => {
  test("keeps bundled blogs missing from a CMS response", () => {
    const cmsBlog = { ...BLOGS[0], title: "CMS title" };
    const merged = mergeBlogsWithFallback([cmsBlog]);

    expect(merged).toHaveLength(BLOGS.length);
    expect(merged[0].title).toBe("CMS title");
    expect(merged.some((blog) => blog.slug === BLOGS[1].slug)).toBe(true);
  });

  test("keeps bundled universities and countries missing from a CMS response", () => {
    const localCountry = UNIVERSITY_PARTNERS[0];
    const cmsCountry = {
      ...localCountry,
      universities: [{ ...localCountry.universities[0], speciality: "CMS speciality" }],
    };
    const merged = mergeUniversityCountriesWithFallback([cmsCountry]);
    const mergedCountry = merged.find((country) => country.slug === localCountry.slug);

    expect(merged).toHaveLength(UNIVERSITY_PARTNERS.length);
    expect(mergedCountry?.universities).toHaveLength(localCountry.universities.length);
    expect(mergedCountry?.universities[0].speciality).toBe("CMS speciality");
  });

  test("adds a newly published CMS country without replacing bundled countries", () => {
    const cmsCountry = {
      country: "Japan",
      slug: "japan",
      flag: "🇯🇵",
      blurb: "Study in Japan.",
      universities: [],
    };
    const merged = mergeUniversityCountriesWithFallback([cmsCountry]);

    expect(merged).toHaveLength(UNIVERSITY_PARTNERS.length + 1);
    expect(merged.map((country) => country.slug)).toEqual([
      ...UNIVERSITY_PARTNERS.map((country) => country.slug),
      "japan",
    ]);
  });

  test("renders CMS image references through the Sanity image CDN", () => {
    const html = renderToStaticMarkup(
      createElement(SanityImage, {
        image: {
          _type: "image",
          asset: { _ref: "image-abc123-1200x800-jpg", _type: "reference" },
        },
        src: "https://fallback.example/image.jpg",
        alt: "CMS image",
        widths: [320, 640],
      }),
    );

    expect(html).toContain("cdn.sanity.io/images/");
    expect(html).toContain("320w");
    expect(html).toContain("640w");
  });
});
