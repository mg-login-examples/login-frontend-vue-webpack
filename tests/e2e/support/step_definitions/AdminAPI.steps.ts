import { Given } from "cypress-cucumber-preprocessor/steps";

import AdminAPIHelpers from "../dataHelpers/admin-api.helpers";

Given("a user with userId {int} exists", (userId: number) => {
  AdminAPIHelpers.createUserIfNoUserExists(userId);
});

Given("an invalid userId {int} for which no user exists", (userId: number) => {
  AdminAPIHelpers.assertUserDoesNotExist(userId);
});

Given("a quote exists", () => {
  // TODO Improve step - reduce complexity by splitting or when user can be created with email
  AdminAPIHelpers.checkIfAtLeast1QuoteExists().then((atLeast1QuoteExists) => {
    if (!atLeast1QuoteExists) {
      AdminAPIHelpers.createUserIfNoUserExists(1);
      cy.then(() => {
        AdminAPIHelpers.createUserQuoteIfNoQuoteExists(1);
        cy.then(() => {
          AdminAPIHelpers.assertAtLeast1QuoteExists();
        });
      });
    } else {
      AdminAPIHelpers.assertAtLeast1QuoteExists();
    }
  });
});

Given("user with userid {int} has written a quote", (userId: number) => {
  AdminAPIHelpers.createUserIfNoUserExists(userId);
  cy.then(() => {
    AdminAPIHelpers.createUserQuoteIfNoQuoteExists(userId);
  });
});
