const { defineConfig } = require("cypress");
const secrets = require("docker-secret").secrets;

module.exports = defineConfig({
  pluginsFile: "tests/e2e/plugins/index.js",
  env: {
    allure: true,
    allureResultsPath: "tests/e2e/allure-results",
    MAILSLURP_API_KEY: secrets.mailslurp_api_key,
  },
});
