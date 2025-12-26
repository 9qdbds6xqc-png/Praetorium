"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * Hook to track page views on route changes
 * Use this in your root layout or a client component
 */
export function usePageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      // Track page view with current pathname
      // Query parameters are included automatically by GA4
      trackPageView(pathname);
    }
  }, [pathname]);
}

