import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    commonjsOptions: {
      include: [/lib/, /node_modules/]
    }
  },
  plugins: [react()],
  publicDir: '../public',
  root: './src',
  server: {
    open: true,
  },
  optimizeDeps: {
    include: ['lib']
  },
})
