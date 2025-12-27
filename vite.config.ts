import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        privacy: './privacy.html',
        terms: './terms.html',
        impressum: './impressum.html',
        media: './media.html'
      }
    }
  }
})
