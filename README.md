# Praetorium.tech Website

Google Analytics 4 implementation for praetorium.tech.

## Setup

1. **Install dependencies** (if using @next/third-parties - optional):

   ```bash
   npm install @next/third-parties
   ```

   Note: The current implementation uses Next.js built-in `Script` component, so this is optional. However, `@next/third-parties` provides additional optimizations.

2. **Configure environment variables**:

   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-KR84C797S0
   ```

   Your GA4 Measurement ID is: **G-KR84C797S0**

## Usage

### Automatic Page View Tracking

Page views are automatically tracked when using the `PageViewTracker` component in your layout (already included).

### Custom Event Tracking

Import and use the analytics functions anywhere in your app:

```typescript
import { trackEvent, trackFormSubmission, trackButtonClick } from "@/lib/analytics";

// Track a custom event
trackEvent("custom_event", {
  category: "engagement",
  label: "video_play",
});

// Track form submission
trackFormSubmission("contact_form", "contact-form-1");

// Track button click
trackButtonClick("cta_button", "hero-cta", "/home");
```

### Available Tracking Functions

- `trackPageView(url)` - Track page views
- `trackEvent(eventName, eventParams)` - Track custom events
- `trackFormSubmission(formName, formId?)` - Track form submissions
- `trackButtonClick(buttonName, buttonId?, location?)` - Track button clicks
- `trackDownload(fileName, fileType?)` - Track file downloads
- `trackError(errorMessage, errorType?)` - Track errors
- `trackEngagement(engagementType, value)` - Track user engagement
- `trackPurchase(...)` - Track ecommerce purchases

## Testing

1. **Development**: Check browser console for warnings if GA4 is not configured
2. **GA4 DebugView**: Use Google Analytics DebugView to see real-time events
3. **Production**: Verify events appear in GA4 dashboard after deployment

## Files Structure

```
src/
  lib/
    analytics.ts              # Analytics utility functions
  components/
    analytics/
      GoogleAnalytics.tsx    # GA4 script injection component
      PageViewTracker.tsx    # Automatic page view tracking
  hooks/
    usePageView.ts           # Hook for page view tracking
  app/
    layout.tsx               # Root layout with GA4 integration
```

## Next Steps

1. Set up GA4 property in Google Analytics
2. Configure GA4 goals and conversions
3. Set up custom events for key user actions
4. Monitor analytics data in GA4 dashboard

