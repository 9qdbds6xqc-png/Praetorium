# Praetorium.tech Website

A clean Vite + React website with Google Analytics 4 tracking for praetorium.tech.

## 🚀 **Quick Start**

1. **Clone and install:**
   ```bash
   git clone https://github.com/9qdbds6xqc-png/Praetorium.git
   cd Praetorium
   npm install
   ```

2. **Configure GA4:**
   Create a `.env` file:
   ```
   VITE_GA_MEASUREMENT_ID=G-KR84C797S0
   ```

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📊 **Google Analytics 4 Tracking**

### Automatic Tracking
- ✅ Page views
- ✅ User engagement (scroll depth, time on page)
- ✅ User demographics and device info

### Custom Events
```javascript
import { trackButtonClick, trackEvent } from './lib/analytics';

// Track button clicks
trackButtonClick('notify_me', 'hero-cta');

// Track custom events
trackEvent('user_interaction', {
  category: 'engagement',
  action: 'hover',
  label: 'feature_card'
});
```

### Available Functions
- `trackPageView(url)` - Manual page view tracking
- `trackEvent(name, params)` - Custom events
- `trackButtonClick(name, id, location)` - Button interactions
- `trackFormSubmission(name, id)` - Form completions
- `trackDownload(filename, type)` - File downloads
- `trackError(message, type)` - Error tracking
- `trackEngagement(type, value)` - User engagement

## 🏗️ **Tech Stack**

- **Vite** - Fast build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Google Analytics 4** - Analytics and tracking

## 📁 **Project Structure**

```
src/
├── components/
│   ├── GoogleAnalytics.tsx    # GA4 script injection
│   └── ...
├── lib/
│   └── analytics.ts           # GA4 utility functions
├── App.tsx                    # Main app component
├── main.tsx                   # React entry point
└── index.css                  # Global styles

public/
├── CNAME                      # GitHub Pages custom domain
└── favicon.png               # Site favicon
```

## 🚀 **Deployment**

This project is configured for **GitHub Pages** deployment:

- **Domain:** www.praetorium.tech
- **Auto-deploy:** Every push to `main` branch
- **GA4 Active:** Tracking starts immediately

## 🔧 **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GA_MEASUREMENT_ID` | Your GA4 measurement ID | ✅ |

## 📈 **Analytics Dashboard**

View your analytics data in [Google Analytics](https://analytics.google.com):
- **Property ID:** G-KR84C797S0
- **Real-time reports** for immediate data
- **Audience insights** and user behavior
- **Conversion tracking** ready to configure

---

**Built for praetorium.tech** 🎯

