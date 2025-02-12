import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
require("dotenv").config();

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.PORT}`,
        changeOrigin: true,
      },
      "/public": {
        target: `http://localhost:${process.env.PORT}`,
        changeOrigin: true,
      },
    },
  },
  plugins: [TanStackRouterVite(), react()],
});
