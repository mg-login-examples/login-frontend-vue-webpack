import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";

import TopbarPage from "../pageObjects/topbar.page";

Given("my login session is cleared", () => {
  cy.clearCookies();
});

When("I click on logout button", () => {
  TopbarPage.clickOnLogoutButton();
});

Then("logout button is displayed on topbar", () => {
  TopbarPage.assertLogoutButtonIsVisible();
});

Then("logout button is not displayed on topbar", () => {
  TopbarPage.assertLogoutButtonIsNotVisible();
});
