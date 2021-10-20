module.exports = {
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      preset: 'ts-jest',
      setupFilesAfterEnv: ['./jest.setup.ts'],
      setupFiles: ['dotenv/config'],
      modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
      globals: {
        'ts-jest': {
          tsconfig: './tsconfig.jest.json',
        },
      },
      testMatch: ['<rootDir>/api/**/*.test.*', '<rootDir>/backend/**/*.test.*'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      preset: 'ts-jest',
      setupFilesAfterEnv: ['./jest.setup.ts'],
      setupFiles: ['dotenv/config'],
      testMatch: ['<rootDir>/client/**/*.test.*', '<rootDir>/client/**/*.test.*'],
      modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
    },
    {
      displayName: 'utils',
      testEnvironment: 'node',
      preset: 'ts-jest',
      setupFilesAfterEnv: ['./jest.setup.ts'],
      setupFiles: ['dotenv/config'],
      testMatch: ['<rootDir>/utils/**/*.test.*'],
      modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
    },
  ],
  testPathIgnorePatterns: ['/node_modules/'],
};
