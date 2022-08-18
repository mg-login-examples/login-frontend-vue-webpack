import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import { getValueFromStore } from "../testDataStore/store";
import SignupPage from "../pageObjects/signup.page";
import VerifyEmailPage from "../pageObjects/verify-email.page";

Given("I go to signup page", () => {
  SignupPage.goToSignupPage();
});

// Uses external value
When("I enter the signup user email {string}", (email: string) => {
  email = getValueFromStore(email);
  SignupPage.enterUserEmail(email);
});

When("I enter the signup user password {string}", (password: string) => {
  SignupPage.enterUserPassword(password);
});

When(
  "I enter the signup user confirm password {string}",
  (password: string) => {
    SignupPage.enterUserConfirmPassword(password);
  }
);

When("I click on signup button", () => {
  SignupPage.clickOnSignupButton();
});

When("I enter the email verification code {string}", (code: string) => {
  code = getValueFromStore(code);
  VerifyEmailPage.enterVerificationCode(code);
});

When("I click on send verification code button", () => {
  VerifyEmailPage.clickOnSendVerificationCode();
});

Then("I am redirected to Verify Email page", () => {
  VerifyEmailPage.assertIsOpen();
});
