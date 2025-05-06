import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Map "@" to the "src" directory
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000",
      '/auth': 'http://localhost:5000', //, // Proxy API requests to the Express server
    },
  },
});
