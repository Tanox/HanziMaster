/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

module.exports = config;
