import { Given, When } from "cypress-cucumber-preprocessor/steps";

import CommonHelpers from "../dataHelpers/common.helpers";

// Sets external value
Given("I wait for {string} seconds", (waitTimeInSeconds: string) => {
  CommonHelpers.waitForSeconds(waitTimeInSeconds);
});
