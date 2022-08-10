import { Then, When } from "cypress-cucumber-preprocessor/steps";

import { getValueFromStore } from "../testDataStore/store";
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

// Uses randomized value
Then("a quote {string} is visible in my quotes", (quoteText: string) => {
  quoteText = getValueFromStore(quoteText);
  MyQuotesPage.assertQuoteWithTextIsVisible(quoteText);
});

// Uses randomized value
When("I hover on the quote with text {string}", (quoteText: string) => {
  quoteText = getValueFromStore(quoteText);
  MyQuotesPage.hoverOnQuoteTileWithText(quoteText);
});

// Uses randomized value
When("I do not hover on the quote with text {string}", (quoteText: string) => {
  quoteText = getValueFromStore(quoteText);
  MyQuotesPage.stopHoverOnQuoteTileWithText(quoteText);
});

// Uses randomized value
Then(
  "the edit button for the quote with text {string} is visible",
  (quoteText: string) => {
    quoteText = getValueFromStore(quoteText);
    MyQuotesPage.assertEditQuoteButtonIsVisibleOnQuoteTileWithText(quoteText);
  }
);

// Uses randomized value
Then(
  "the delete button for the quote with text {string} is visible",
  (quoteText: string) => {
    quoteText = getValueFromStore(quoteText);
    MyQuotesPage.assertDeleteQuoteButtonIsVisibleOnQuoteTileWithText(quoteText);
  }
);
