import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import MyQuotesPage from "../pageObjects/my-quotes.page";
import CreateEditQuotePage from "../pageObjects/create-edit-quote.page";

Given("I have created a quote {string}", (quoteText: string) => {
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

When(
  "I click on edit button for the quote with text {string}",
  (quoteText: string) => {
    MyQuotesPage.clickOnEditButtonOfQuoteTileWithText(quoteText);
  }
);

When("I enter some quote {string}", (quoteText: string) => {
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

Then("quote input has text {string}", (quoteTextInputValue: string) => {
  CreateEditQuotePage.assertQuoteTextInputHasValue(quoteTextInputValue);
});

Then("save button is disabled", () => {
  CreateEditQuotePage.assertSaveButtonIsDisabled();
});
