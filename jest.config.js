module.exports = {
  preset: 'ts-jest',
  testTimeout: 1000000,
  testEnvironment: 'node',
  testMatch: ["**/?(*.test.ts)"],
  moduleFileExtensions: ["js", "ts", "json", "node"],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    "global": {
      "branches": 50,
      "functions": 50,
      "lines": 50,
    }
  },
};
