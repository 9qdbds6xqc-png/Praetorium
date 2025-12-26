"use client";

import { usePageView } from "@/hooks/usePageView";

/**
 * Component to automatically track page views on route changes
 * Add this to your root layout
 */
export function PageViewTracker() {
  usePageView();
  return null;
}

