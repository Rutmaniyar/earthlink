import { describe, expect, test } from "bun:test";
import { COMPANY } from "@/content/company";
import { FEATURED_GOOGLE_REVIEWS } from "@/content/featured-google-reviews";
import { GOOGLE_REVIEWS, WRITTEN_GOOGLE_REVIEWS } from "@/content/google-reviews";

const expectedFeaturedReviews = [
  ["Patel Dhairya", "2026-04-29"],
  ["Kajal Kharb", "2026-04-30"],
  ["Darshit R Asodariya", "2026-06-11"],
  ["Manpreet Kaur", "2025-12-30"],
  ["Sukh Dhillon", "2026-05-09"],
  ["Amal Shil", "2026-03-30"],
  ["Krupa Barot", "2026-08-20"],
  ["Neel Vashi", "2025-09-30"],
  ["Malay MK", "2026-04-29"],
  ["Zeel Patel", "2025-04-07"],
  ["nishi delada", "2026-04-29"],
  ["Smruti Malvi", "2025-02-27"],
  ["Rahul Singh", "2023-06-14"],
  ["Pruthviraj Thakor", "2023-03-08"],
  ["Manan Desai", "2025-02-24"],
];

describe("Google review snapshot", () => {
  test("matches the exported totals and aggregate", () => {
    const ratingCounts = GOOGLE_REVIEWS.reduce<Record<number, number>>((counts, review) => {
      counts[review.rating] = (counts[review.rating] ?? 0) + 1;
      return counts;
    }, {});
    const average =
      GOOGLE_REVIEWS.reduce((total, review) => total + review.rating, 0) / GOOGLE_REVIEWS.length;

    expect(GOOGLE_REVIEWS).toHaveLength(412);
    expect(new Set(GOOGLE_REVIEWS.map((review) => review.id)).size).toBe(412);
    expect(WRITTEN_GOOGLE_REVIEWS).toHaveLength(370);
    expect(GOOGLE_REVIEWS.length - WRITTEN_GOOGLE_REVIEWS.length).toBe(42);
    expect(ratingCounts).toEqual({ 1: 1, 4: 7, 5: 404 });
    expect(Number(average.toFixed(2))).toBe(4.97);
    expect(COMPANY.rating).toEqual({ score: 4.97, reviews: 412 });
  });

  test("contains only sanitized public review fields", () => {
    const allowedKeys = new Set(["id", "reviewerName", "rating", "text", "publishedAt"]);

    for (const review of GOOGLE_REVIEWS) {
      expect(Object.keys(review).every((key) => allowedKeys.has(key))).toBe(true);
      expect(review.id).not.toContain("/");
      expect(review.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(review.reviewerName.trim().length).toBeGreaterThan(0);
    }

    const snapshot = JSON.stringify(GOOGLE_REVIEWS);
    expect(snapshot).not.toContain("accounts/");
    expect(snapshot).not.toContain("locations/");
    expect(snapshot).not.toContain("reviewReply");
  });

  test("keeps the approved featured set in its editorial order", () => {
    expect(FEATURED_GOOGLE_REVIEWS).toHaveLength(15);
    expect(
      FEATURED_GOOGLE_REVIEWS.map((review) => [review.reviewerName, review.publishedAt]),
    ).toEqual(expectedFeaturedReviews);
    expect(new Set(FEATURED_GOOGLE_REVIEWS.map((review) => review.id)).size).toBe(15);

    for (const featuredReview of FEATURED_GOOGLE_REVIEWS) {
      expect(featuredReview.rating).toBe(5);
      expect(featuredReview.text.trim().length).toBeGreaterThan(0);
      expect(
        GOOGLE_REVIEWS.some(
          (review) =>
            review.id === featuredReview.id &&
            review.reviewerName === featuredReview.reviewerName &&
            review.text === featuredReview.text,
        ),
      ).toBe(true);
    }
  });

  test("sorts the full written catalogue newest first", () => {
    const dates = WRITTEN_GOOGLE_REVIEWS.map((review) => review.publishedAt);
    expect(dates).toEqual([...dates].sort((left, right) => right.localeCompare(left)));
  });
});
