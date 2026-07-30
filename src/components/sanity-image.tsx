import { imgSrcSet, imgUrl, type SanityImageSource } from "@/lib/sanity";

type Props = {
  // Raw Sanity image reference (preferred — enables responsive srcSet).
  image?: SanityImageSource | null;
  // Fallback URL when no Sanity image ref is available (or Sanity not configured).
  src?: string | null;
  alt: string;
  className?: string;
  // Responsive widths to generate. Choose based on the largest rendered size.
  widths?: number[];
  // Native `sizes` attribute driving which srcSet entry the browser picks.
  sizes?: string;
  // Aspect crop ratio (width / height). When set, srcSet includes matching heights.
  aspectRatio?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
};

const DEFAULT_WIDTHS = [320, 480, 640, 800, 1024, 1280, 1600];

export function SanityImage({
  image,
  src,
  alt,
  className,
  widths = DEFAULT_WIDTHS,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  aspectRatio,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
  referrerPolicy,
  onLoad,
  onError,
}: Props) {
  const hasRef = image && typeof image === "object";
  const cropOpts = aspectRatio
    ? { fit: "crop" as const, height: (w: number) => Math.round(w / aspectRatio) }
    : {};
  const srcSet = hasRef ? imgSrcSet(image, widths, cropOpts) : undefined;
  const fallbackWidth = widths[Math.floor(widths.length / 2)] ?? 1024;
  const resolvedSrc =
    (hasRef ? imgUrl(image, fallbackWidth) : undefined) ?? src ?? undefined;

  if (!resolvedSrc) return null;

  return (
    <img
      src={resolvedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      referrerPolicy={referrerPolicy}
      onLoad={onLoad}
      onError={onError}
    />
  );
}
