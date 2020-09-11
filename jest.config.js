module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ["jest-localstorage-mock", "./test/setupJest.ts"],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/index.tsx',
    'src/Store/store.ts',
  ]
};