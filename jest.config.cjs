module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.cjs",
  },
  setupFiles: ["<rootDir>/jest.setup.polyfill.cjs"],
};
