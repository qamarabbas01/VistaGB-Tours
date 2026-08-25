process.env.NEXT_IGNORE_INCORRECT_LOCKFILE = "1";

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/e2e/",
    "/playwright-report/",
    "/test-results/",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(config);
