module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: [
    "jest-allure/dist/setup",
    "<rootDir>/tests/unit/allure.setup.js",
  ],
  testRunner: "jest-jasmine2",
};
