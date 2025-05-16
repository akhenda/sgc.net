/// <reference types="vitest/config" />

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), !process.env.VITEST && reactRouter(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    /* use global to avoid globals imports (describe, test, expect): */
    globals: true, // this enables auto cleanup
    setupFiles: ['./app/test/setup.ts'], // Add setup file for testing-library/jest-dom matchers
    coverage: { enabled: true, provider: 'v8', reporter: ['text-summary'] },
    reporters: ['default'],
    typecheck: {
      enabled: false, // Slows down test server. Still experimental
    },
  },
} as UserConfig);
