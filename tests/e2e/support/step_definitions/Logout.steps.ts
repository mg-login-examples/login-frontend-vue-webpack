import { When, Then } from "cypress-cucumber-preprocessor/steps";

import TopbarPage from "../pageObjects/topbar.page";

When("I click on logout button", () => {
  TopbarPage.clickOnLogoutButton();
});

Then("logout button is displayed on topbar", () => {
  TopbarPage.assertLogoutButtonIsVisible();
});

Then("logout button is not displayed on topbar", () => {
  TopbarPage.assertLogoutButtonIsNotVisible();
});
