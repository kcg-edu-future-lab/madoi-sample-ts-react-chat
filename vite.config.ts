import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  plugins: [react({ tsDecorators: true })],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
  },
  server: { open: true },
});
