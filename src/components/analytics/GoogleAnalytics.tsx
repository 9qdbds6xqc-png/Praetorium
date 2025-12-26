"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

/**
 * Google Analytics 4 component
 * Uses @next/third-parties for optimized GA4 integration
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't render if measurement ID is not configured
  if (!measurementId) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID is not set"
      );
    }
    return null;
  }

  return <NextGoogleAnalytics gaId={measurementId} />;
}

