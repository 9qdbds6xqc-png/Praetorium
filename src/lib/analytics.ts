/**
 * Google Analytics 4 utility functions
 * Provides type-safe event tracking and GA4 initialization
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Check if GA4 is available
 */
export const isGA4Available = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

/**
 * Get the GA4 measurement ID from environment variables
 */
export const getGA4MeasurementId = (): string | null => {
  if (typeof window === "undefined") return null;
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null;
};

/**
 * Track a page view
 */
export const trackPageView = (url: string): void => {
  if (!isGA4Available()) return;

  const measurementId = getGA4MeasurementId();
  if (!measurementId) return;

  window.gtag?.("config", measurementId, {
    page_path: url,
  });
};

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!isGA4Available()) return;

  const measurementId = getGA4MeasurementId();
  if (!measurementId) return;

  window.gtag?.("event", eventName, {
    ...eventParams,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string, formId?: string): void => {
  trackEvent("form_submit", {
    form_name: formName,
    form_id: formId,
  });
};

/**
 * Track button click
 */
export const trackButtonClick = (
  buttonName: string,
  buttonId?: string,
  location?: string
): void => {
  trackEvent("button_click", {
    button_name: buttonName,
    button_id: buttonId,
    location: location || window.location.pathname,
  });
};

/**
 * Track file download
 */
export const trackDownload = (fileName: string, fileType?: string): void => {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
  });
};

/**
 * Track error
 */
export const trackError = (errorMessage: string, errorType?: string): void => {
  trackEvent("exception", {
    description: errorMessage,
    fatal: false,
    error_type: errorType,
  });
};

/**
 * Track user engagement (scroll depth, time on page, etc.)
 */
export const trackEngagement = (
  engagementType: "scroll" | "time_on_page",
  value: number
): void => {
  trackEvent("user_engagement", {
    engagement_type: engagementType,
    value: value,
  });
};

/**
 * Track ecommerce purchase (if applicable)
 */
export const trackPurchase = (
  transactionId: string,
  value: number,
  currency: string = "USD",
  items?: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>
): void => {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items,
  });
};

