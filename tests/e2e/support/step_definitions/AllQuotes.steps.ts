import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import { getValueFromStore, WebpageValueStore } from "../testDataStore/store";
import AllQuotesPage from "../pageObjects/all-quotes.page";
import MyQuotesPage from "../pageObjects/my-quotes.page";

Given("I am on all quotes view", () => {
  AllQuotesPage.open();
});

Given(
  "I have liked an unliked quote with text {string} and author with username different from {string}",
  (quoteTextStoreKey: string, username: string) => {
    AllQuotesPage.setInStoreTextOfQuoteNotCreatedOrLikedByUser(
      quoteTextStoreKey,
      username
    );
    // cy.then wrapper required as quoteText set in store by previous cypress step
    cy.then(() => {
      const quoteText = getValueFromStore(quoteTextStoreKey);
      MyQuotesPage.hoverOnQuoteTileWithText(quoteText);
      AllQuotesPage.assertLikeQuoteButtonIsVisibleOnQuoteTileWithText(
        quoteText
      );
      AllQuotesPage.clickOnLikeButtonOfQuoteTileWithText(quoteText);
      AllQuotesPage.assertUnlikeQuoteButtonIsVisibleOnQuoteTileWithText(
        quoteText
      );
    });
  }
);

// Extracts value from webpage
Given(
  "an unliked quote exists with text {string} and author with username different from {string}",
  (quoteTextStoreKey: string, username: string) => {
    AllQuotesPage.setInStoreTextOfQuoteNotCreatedOrLikedByUser(
      quoteTextStoreKey,
      username
    );
  }
);

When("I open all quotes view", () => {
  AllQuotesPage.goToAllQuotesPage();
});

// Uses webpage extracted value
When(
  "I click on like button for the quote with text {string}",
  (quoteText: string) => {
    quoteText = getValueFromStore(quoteText);
    AllQuotesPage.clickOnLikeButtonOfQuoteTileWithText(quoteText);
  }
);

// Uses webpage extracted value
When(
  "I click on unlike button for the quote with text {string}",
  (quoteText: string) => {
    quoteText = getValueFromStore(quoteText);
    AllQuotesPage.clickOnUnlikeButtonOfQuoteTileWithText(quoteText);
  }
);

Then("I am redirected to All Quotes page", () => {
  AllQuotesPage.assertIsOpen();
});

Then("I see a quote", () => {
  AllQuotesPage.assertSomeQuoteIsVisible();
});

Then(
  "I see a quote with text {string} by author {string}",
  (quoteText: string, authorUsername: string) => {
    AllQuotesPage.assertQuoteWithTextAndAuthorIsVisible(
      quoteText,
      authorUsername
    );
  }
);

// Uses webpage extracted value
Then(
  "the like button for the quote with text {string} is visible",
  (quoteText: string) => {
    quoteText = getValueFromStore(quoteText);
    AllQuotesPage.assertLikeQuoteButtonIsVisibleOnQuoteTileWithText(quoteText);
  }
);

// Uses webpage extracted value
Then("the quote with text {string} is liked", (quoteText: string) => {
  quoteText = getValueFromStore(quoteText);
  AllQuotesPage.assertUnlikeQuoteButtonIsVisibleOnQuoteTileWithText(quoteText);
});

// Uses webpage extracted value
Then("the quote with text {string} is not liked", (quoteText: string) => {
  quoteText = getValueFromStore(quoteText);
  AllQuotesPage.assertLikeQuoteButtonIsVisibleOnQuoteTileWithText(quoteText);
});

// // Uses randomized value
// Then("a quote {string} is visible in my quotes", (quoteText: string) => {
//   quoteText = getValueFromStore(quoteText);
//   MyQuotesPage.assertQuoteWithTextIsVisible(quoteText);
// });

// // Uses randomized value
// When("I hover on the quote with text {string}", (quoteText: string) => {
//   quoteText = getValueFromStore(quoteText);
//   MyQuotesPage.hoverOnQuoteTileWithText(quoteText);
// });
