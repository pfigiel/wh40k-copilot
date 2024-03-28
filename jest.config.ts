import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/components$": "<rootDir>/src/app/components",
    "^@/components/(.*)$": "<rootDir>/src/app/components/$1",
    "^@/dtos/(.*)$": "<rootDir>/src/app/dtos/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/app/hooks/$1",
    "^@/test/(.*)$": "<rootDir>/src/app/test/$1",
    "^@/types/(.*)$": "<rootDir>/src/app/types/$1",
  },
  modulePaths: ["<rootDir>", "<rootDir>/src"],
  roots: ["<rootDir>", "<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/app/test/setup-tests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};

export default config;
