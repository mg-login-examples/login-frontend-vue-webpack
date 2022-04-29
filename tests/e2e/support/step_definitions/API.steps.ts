import { Given } from "cypress-cucumber-preprocessor/steps";

import CyWrapAPIHelpers from "../dataHelpers/cywrap-api.helpers";

Given(
  "a user with email {string} and password {string} exists",
  (email: string, password: string) => {
    CyWrapAPIHelpers.createUserIfNoUserExists(email, password);
  }
);

Given(
  "an invalid user login with email {string} and password {string}",
  (email: string, password: string) => {
    CyWrapAPIHelpers.assertLoginInvalid(email, password);
  }
);

Given("a quote exists", () => {
  CyWrapAPIHelpers.createAQuoteIfNoQuoteExists();
});

Given(
  "user with email {string} and password {string} has written a quote",
  (email: string, password: string) => {
    CyWrapAPIHelpers.createUserQuoteIfNoQuoteExists(email, password);
  }
);
