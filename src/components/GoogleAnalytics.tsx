import { useEffect } from 'react';
import { getGA4MeasurementId, trackPageView } from '../lib/analytics';

/**
 * Google Analytics 4 component for Vite + React
 * Injects GA4 script and tracks page views
 */
export function GoogleAnalytics() {
  useEffect(() => {
    // Use the environment variable directly for Vite
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-KR84C797S0';

    console.log('GA4 Measurement ID:', measurementId);

    if (!measurementId) {
      console.warn('Google Analytics: Measurement ID not found');
      return;
    }

    // Inject GA4 script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(script2);

    // Track initial page view
    const handleLoad = () => {
      trackPageView(window.location.pathname);
    };

    // Track page views on navigation
    const handlePopState = () => {
      trackPageView(window.location.pathname);
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}
