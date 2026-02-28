import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/mock/**/*.test.ts"],
    globals: true,
    environment: "node",
    setupFiles: ["tests/mock/setup.ts"]
  }
});
