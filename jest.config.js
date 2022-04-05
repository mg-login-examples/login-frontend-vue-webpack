module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: ["jest-allure/dist/setup", "./tests/unit/jest.setup.js"],
  testRunner: "jest-jasmine2",
};
