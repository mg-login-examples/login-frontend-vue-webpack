import { Given } from "cypress-cucumber-preprocessor/steps";

import AdminAPIHelpers from "../dataHelpers/admin-api.helpers";

Given("a user with userId {int} exists", (userId: number) => {
  AdminAPIHelpers.createUserIfNoUserExists(userId);
});

Given("an invalid userId {int} for which no user exists", (userId: number) => {
  AdminAPIHelpers.assertUserDoesNotExist(userId);
});

Given("a quote exists", () => {
  AdminAPIHelpers.assertAtLeast1QuoteExists();
});

Given("user with userid {int} has written a quote", (userId: number) => {
  AdminAPIHelpers.createUserIfNoUserExists(userId);
  AdminAPIHelpers.createUserQuoteIfNoQuoteExists(userId);
});
