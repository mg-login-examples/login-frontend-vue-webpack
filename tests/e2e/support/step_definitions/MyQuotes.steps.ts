import { Then, When } from "cypress-cucumber-preprocessor/steps";

import MyQuotesPage from "../pageObjects/my-quotes.page";
import TopbarPage from "../pageObjects/topbar.page";

When("I open my quotes view", () => {
  MyQuotesPage.goToMyQuotesPage();
});

When("I try to open my quotes view", () => {
  MyQuotesPage.open();
});

When("I click on my quotes button in topbar", () => {
  TopbarPage.clickOnMyQuotesLink();
});

Then("I am redirected to My Quotes page", () => {
  MyQuotesPage.assertIsOpen();
});

Then("a quote {string} is visible in my quotes", (quoteText: string) => {
  MyQuotesPage.assertQuoteWithTextIsVisible(quoteText);
});

When("I hover on the quote with text {string}", (quoteText: string) => {
  MyQuotesPage.hoverOnQuoteTileWithText(quoteText);
});

Then(
  "the edit button for the quote with text {string} is visible",
  (quoteText: string) => {
    MyQuotesPage.assertEditQuoteButtonIsVisibleOnQuoteTileWithText(quoteText);
  }
);

Then(
  "the delete button for the quote with text {string} is visible",
  (quoteText: string) => {
    MyQuotesPage.assertDeleteQuoteButtonIsVisibleOnQuoteTileWithText(quoteText);
  }
);
