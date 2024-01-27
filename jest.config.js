/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '\\.[j]sx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        'react-markdown': '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
        '\\.(css|less)$': '<rootDir>/src/__tests__/__mocks__/styleMock.js',
    },
    reporters: ["jest-junit"]
};