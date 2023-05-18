export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageReporters: ['text', 'cobertura'],
  collectCoverageFrom: [
    '**/config/**/*.(t|j)s',
    '**/src/**/*.(t|j)s',
    '!**/dist/**',
    '!**/node_modules/**',
  ],
  testEnvironment: 'node',
};
