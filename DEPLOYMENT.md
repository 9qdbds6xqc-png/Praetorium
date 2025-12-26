# Production Deployment Commands

## Option 1: Vercel (Recommended for Next.js)
npm install -g vercel
vercel login
vercel --prod

## Option 2: Manual Build & Deploy
npm run build
npm run start

## Environment Variables for Production:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-KR84C797S0
