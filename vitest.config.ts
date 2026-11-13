import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/**/*.test.ts", "jobs/**/*.test.ts", "scripts/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["packages/engine/src/**"],
      thresholds: { lines: 95, branches: 95 },
    },
  },
});
