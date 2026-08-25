import reviewSnapshot from "@/content/google-reviews.json";

export type GoogleReview = {
  id: string;
  reviewerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text?: string;
  publishedAt: string;
};

export const GOOGLE_REVIEWS = reviewSnapshot as GoogleReview[];

export const WRITTEN_GOOGLE_REVIEWS = GOOGLE_REVIEWS.filter(
  (review): review is GoogleReview & { text: string } => Boolean(review.text),
);
