/// <reference types="vitest/config" />

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  test: {
    /* use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    coverage: { enabled: true, provider: 'v8', reporter: ['text-summary'] },
    reporters: ['default'],
    typecheck: {
      enabled: false, // Slows down test server. Still experimental
    },
  },
});
