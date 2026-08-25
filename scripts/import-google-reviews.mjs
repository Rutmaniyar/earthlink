import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sourceDirectory = process.argv[2];

if (!sourceDirectory) {
  throw new Error(
    "Usage: node scripts/import-google-reviews.mjs <google-takeout-location-directory>",
  );
}

const ratingValues = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

const excludedReviewIds = new Set([
  "Ci9DQUlRQUNvZENodHljRjlvT2tSNmRFUlpkeTFtZEdKb1RIWTNaRWhMWW5kRFNGRRAB",
]);

const sourceFiles = readdirSync(sourceDirectory)
  .filter((file) => /^reviews.*\.json$/i.test(file))
  .sort();

const sourceReviews = sourceFiles.flatMap((file) => {
  const payload = JSON.parse(readFileSync(join(sourceDirectory, file), "utf8"));
  return payload.reviews ?? [];
});

const reviews = sourceReviews
  .map((review) => ({
    id: review.name.split("/").at(-1),
    reviewerName: review.reviewer.displayName,
    rating: ratingValues[review.starRating],
    ...(review.comment ? { text: review.comment.replace(/\s+/gu, " ").trim() } : {}),
    publishedAt: review.createTime.slice(0, 10),
  }))
  .filter((review) => !excludedReviewIds.has(review.id))
  .sort(
    (left, right) =>
      right.publishedAt.localeCompare(left.publishedAt) || left.id.localeCompare(right.id),
  );

if (sourceFiles.length !== 21 || sourceReviews.length !== 412 || reviews.length !== 411) {
  throw new Error(
    `Expected 21 files, 412 source reviews, and 411 published reviews; found ${sourceFiles.length}, ${sourceReviews.length}, and ${reviews.length}`,
  );
}

if (new Set(reviews.map((review) => review.id)).size !== reviews.length) {
  throw new Error("Duplicate Google review IDs found");
}

const featuredSelection = [
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

const featuredReviews = featuredSelection.map(([reviewerName, publishedAt]) => {
  const matches = reviews.filter(
    (review) => review.reviewerName === reviewerName && review.publishedAt === publishedAt,
  );

  if (matches.length !== 1) {
    throw new Error(
      `Expected one featured review for ${reviewerName} on ${publishedAt}, found ${matches.length}`,
    );
  }

  return matches[0];
});

writeFileSync("src/content/google-reviews.json", `${JSON.stringify(reviews, null, 2)}\n`, "utf8");

writeFileSync(
  "src/content/featured-google-reviews.ts",
  `import type { GoogleReview } from "@/content/google-reviews";\n\nexport const FEATURED_GOOGLE_REVIEWS = ${JSON.stringify(featuredReviews, null, 2)} as const satisfies readonly GoogleReview[];\n`,
  "utf8",
);

console.log(
  `Imported ${reviews.length} reviews from ${sourceFiles.length} files; selected ${featuredReviews.length} featured reviews.`,
);
