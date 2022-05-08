import { Given } from "cypress-cucumber-preprocessor/steps";

import CyDataSetterHelpers from "../dataHelpers/cy-data-setter.helpers";

Given(
  "a user with email {string} and password {string} exists",
  (email: string, password: string) => {
    CyDataSetterHelpers.createUserIfNoUserExists(email, password);
  }
);

Given(
  "an invalid user login with email {string} and password {string}",
  (email: string, password: string) => {
    CyDataSetterHelpers.assertLoginInvalid(email, password);
  }
);

Given("a quote exists", () => {
  CyDataSetterHelpers.createAQuoteIfNoQuoteExists();
});

Given(
  "user with email {string} and password {string} has written a quote",
  (email: string, password: string) => {
    CyDataSetterHelpers.createUserQuoteIfNoQuoteExists(email, password);
  }
);
