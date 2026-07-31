/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit/**/*.test.cjs"],
  collectCoverageFrom: [],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "json-summary"],
  clearMocks: true,
};
