# Praetorium.tech Website

A clean, minimal static website for praetorium.tech with Google Analytics 4 tracking.

## 🚀 **Quick Start**

1. **Clone and install:**
   ```bash
   git clone https://github.com/9qdbds6xqc-png/Praetorium.git
   cd Praetorium
   npm install
   ```

2. **Development:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📊 **Google Analytics 4 Tracking**

GA4 tracking is automatically configured and active:
- ✅ Page views
- ✅ Contact email clicks
- ✅ Navigation link clicks
- ✅ Scroll engagement
- ✅ User engagement metrics

**GA4 Measurement ID:** `G-KR84C797S0`

## 🏗️ **Tech Stack**

- **Vite** - Build tool for static HTML
- **Pure HTML/CSS/JavaScript** - No frameworks
- **Google Analytics 4** - Analytics and tracking

## 📁 **Project Structure**

```
├── index.html              # Main homepage
├── privacy.html            # Privacy Policy page
├── terms.html              # Terms of Service page
├── vite.config.ts          # Vite build configuration
├── vercel.json             # Vercel deployment configuration
├── public/
│   └── favicon.png         # Site favicon
└── dist/                   # Built files (generated)
```

## 🚀 **Deployment**

This project is configured for **Vercel** deployment:

- **Domain:** praetorium.tech (and www.praetorium.tech)
- **Auto-deploy:** Every push to `main` branch via Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **GA4 Active:** Tracking starts immediately

### Deploying to Vercel

1. **Via Vercel CLI:**
   ```bash
   vercel login
   vercel --prod
   ```

2. **Via Vercel Dashboard:**
   - Import your GitHub repository at [vercel.com](https://vercel.com)
   - Vercel will auto-detect the `vercel.json` configuration
   - Connect your domain in Vercel project settings

## 📈 **Analytics Dashboard**

View your analytics data in [Google Analytics](https://analytics.google.com):
- **Property ID:** G-KR84C797S0
- **Real-time reports** for immediate data
- **Audience insights** and user behavior

---

**Built for praetorium.tech** 🎯

