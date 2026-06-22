import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"

export default defineConfig({
  plugins: [
    babel({
      presets: [{
        preset: () => ({ plugins: [["@babel/plugin-proposal-decorators", { version: "legacy" }]] }),
        rolldown: { filter: { code: "@" } },
      }],
    }),
    react()],
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
