import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import AdminAPIHelpers from "../dataHelpers/admin-api.helpers";
import AllQuotesPage from "../pageObjects/all-quotes.page";

import LoginPage from "../pageObjects/login.page";
import TopbarPage from "../pageObjects/topbar.page";

Given("I go to login page", () => {
  LoginPage.goToLoginPage();
});

Given("I am logged in as a user with userId {int}", (userId: number) => {
  AdminAPIHelpers.createUserIfNoUserExists(userId);
  LoginPage.goToLoginPage();
  LoginPage.enterUserId(userId);
  LoginPage.clickOnLoginButton();
  TopbarPage.assertLogoutButtonIsVisible();
  AllQuotesPage.assertIsOpen();
});

Given("I am not logged in", () => {
  TopbarPage.assertLoginButtonIsVisible();
  TopbarPage.assertLogoutButtonIsNotVisible();
});

When("I enter my userId {int}", (userId: number) => {
  LoginPage.enterUserId(userId);
});

When("I click on login button", () => {
  LoginPage.clickOnLoginButton();
});

Then("login button is displayed on topbar", () => {
  TopbarPage.assertLoginButtonIsVisible();
});

Then("login button is not displayed on topbar", () => {
  TopbarPage.assertLoginButtonIsNotVisible();
});

Then("I am redirected to login page", () => {
  LoginPage.assertIsOpen();
});
