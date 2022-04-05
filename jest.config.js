module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: ["jest-allure/dist/setup"],
  testRunner: "jest-jasmine2",
};
