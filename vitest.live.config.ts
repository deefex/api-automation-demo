import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/live/**/*.test.ts"],
    globals: true,
    environment: "node",
    setupFiles: ["tests/live/setup.ts"],
    hookTimeout: 30000,
    testTimeout: 30000
  }
});
