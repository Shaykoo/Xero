module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', 
      '^.+\\.(js|jsx)$': 'babel-jest', 
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)',
    ],
  };
  