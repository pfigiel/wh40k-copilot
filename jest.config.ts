import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/app/components/$1",
    "^@/test/(.*)$": "<rootDir>/src/app/test/$1",
  },
  modulePaths: ["<rootDir>", "<rootDir>/src"],
  roots: ["<rootDir>", "<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/app/test/setup-tests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
