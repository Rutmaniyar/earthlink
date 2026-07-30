"use client";
import { lazy, Suspense, useEffect, useState } from "react";

const LandmarkScene = lazy(() => import("./landmark-scene"));

export function LandmarkLazy({ variant, className = "" }: { variant: string; className?: string }) {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setMount(true), 250);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <div className={className}>
      {mount ? (
        <Suspense fallback={<div className="h-full w-full animate-pulse rounded-md bg-navy/20" />}>
          {/* @ts-expect-error variant validated at use sites */}
          <LandmarkScene variant={variant} />
        </Suspense>
      ) : (
        <div className="h-full w-full rounded-md bg-navy/15" />
      )}
    </div>
  );
}
