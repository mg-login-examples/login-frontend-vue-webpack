/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");
const dotenvPlugin = require("cypress-dotenv");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
// const cypressLogToOutput = require("cypress-log-to-output");

module.exports = (on, config) => {
  // on('file:preprocessor', webpack({
  //  webpackOptions: require('@vue/cli-service/webpack.config'),
  //  watchOptions: {}
  // }))
  const options = {
    ...browserify.defaultOptions,
    typescript: require.resolve("typescript"),
  };
  on("file:preprocessor", cucumber(options));

  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.family === "chromium") {
      launchOptions.args.push(
        "--disable-features=CookiesWithoutSameSiteMustBeSecure"
      );
    }
    return launchOptions;
  });

  const configOptions = process.env.CYPRESS_ENV_FILE
    ? { path: process.env.CYPRESS_ENV_FILE }
    : { path: ".env_cypress" };
  config = dotenvPlugin(config, configOptions);

  // cypressLogToOutput.install(on);

  allureWriter(on, config); // Generate allure results from cypress results

  return Object.assign({}, config, {
    fixturesFolder: "tests/e2e/fixtures",
    integrationFolder: "tests/e2e/specs",
    screenshotsFolder: "tests/e2e/screenshots",
    videosFolder: "tests/e2e/videos",
    supportFile: "tests/e2e/support/index.js",
  });
};
