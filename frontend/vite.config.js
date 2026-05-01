import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/diplom_api/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
  server: {
    proxy: {
      "/academy": "http://127.0.0.1:8000",
      "/auth": "http://127.0.0.1:8000",
    },
  },
});
