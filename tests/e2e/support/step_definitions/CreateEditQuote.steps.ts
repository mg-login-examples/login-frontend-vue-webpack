import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import { overwriteIfKeyInStore } from "../randomTestDataUtil/store";
import MyQuotesPage from "../pageObjects/my-quotes.page";
import CreateEditQuotePage from "../pageObjects/create-edit-quote.page";

// Uses randomized value
Given("I have created a quote {string}", (quoteText: string) => {
  quoteText = overwriteIfKeyInStore(quoteText);
  MyQuotesPage.goToMyQuotesPage();
  MyQuotesPage.clickOnCreateQuoteButton();
  CreateEditQuotePage.assertCreateQuoteModalIsOpen();
  CreateEditQuotePage.enterQuoteText(quoteText);
  CreateEditQuotePage.clickOnSaveButton();
  CreateEditQuotePage.assertCreateQuoteModalIsClosed();
  MyQuotesPage.assertQuoteWithTextIsVisible(quoteText);
});

When("I click on create new quote button", () => {
  MyQuotesPage.clickOnCreateQuoteButton();
});

// Uses randomized value
When(
  "I click on edit button for the quote with text {string}",
  (quoteText: string) => {
    quoteText = overwriteIfKeyInStore(quoteText);
    MyQuotesPage.clickOnEditButtonOfQuoteTileWithText(quoteText);
  }
);

// Uses randomized value
When("I enter some quote {string}", (quoteText: string) => {
  quoteText = overwriteIfKeyInStore(quoteText);
  CreateEditQuotePage.enterQuoteText(quoteText);
});

When("I click on save button", () => {
  CreateEditQuotePage.clickOnSaveButton();
});

Then("create new quote modal is open", () => {
  CreateEditQuotePage.assertCreateQuoteModalIsOpen();
});

Then("create new quote modal is closed", () => {
  CreateEditQuotePage.assertCreateQuoteModalIsClosed();
});

Then("edit quote modal is open", () => {
  CreateEditQuotePage.assertEditQuoteModalIsOpen();
});

Then("edit quote modal is closed", () => {
  CreateEditQuotePage.assertEditQuoteModalIsClosed();
});

// Uses randomized value
Then("quote input has text {string}", (quoteTextInputValue: string) => {
  quoteTextInputValue = overwriteIfKeyInStore(quoteTextInputValue);
  CreateEditQuotePage.assertQuoteTextInputHasValue(quoteTextInputValue);
});

Then("save button is disabled", () => {
  CreateEditQuotePage.assertSaveButtonIsDisabled();
});
