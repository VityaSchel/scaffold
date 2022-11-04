/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      // tsconfig: 'test/tsconfig.json',
      useESM: true,
    },
  },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules', 'src/database', 'src/test', 'src/types'],
  // testPathIgnorePatterns: ['<rootDir>/node_modules/node-fetch', '<rootDir>/node_modules/(?!chalk/.*)', '<rootDir>/dist/'],
  transformIgnorePatterns: ['node_modules/(?!chalk)/.+\\.js', 'node_modules/(?!#ansi-styles)/'],
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
    ],
    // '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '#(.*)': '<rootDir>/node_modules/$1'
  }
}
