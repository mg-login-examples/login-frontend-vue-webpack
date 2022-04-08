import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import AllQuotesPage from "../pageObjects/all-quotes.page";

Given("I am on all quotes view", () => {
  AllQuotesPage.open();
});

When("I open all quotes view", () => {
  AllQuotesPage.goToAllQuotesPage();
});

Then("I am redirected to All Quotes page", () => {
  AllQuotesPage.assertIsOpen();
});

Then("I see a quote", () => {
  AllQuotesPage.assertSomeQuoteIsVisible();
});
