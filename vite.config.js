import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  base: '/Wallet/',
  plugins: [
    tailwind(),
    react({
      jsxRuntime: 'automatic'
    })
  ],
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data:;
        font-src 'self' data: https:;
      `.replace(/\s+/g, ' ').trim()
    }
  }
})
