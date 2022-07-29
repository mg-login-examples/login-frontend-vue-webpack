import { When, Then } from "cypress-cucumber-preprocessor/steps";

import MyQuotesPage from "../pageObjects/my-quotes.page";
import CreateQuotePage from "../pageObjects/create-quote.page";

When("I click on create new quote button", () => {
  MyQuotesPage.clickOnCreateQuoteButton();
});

When("I enter some quote {string}", (quoteText: string) => {
  CreateQuotePage.enterQuoteText(quoteText);
});

When("I click on save button", () => {
  CreateQuotePage.clickOnSaveButton();
});

Then("create new quote modal is visible", () => {
  CreateQuotePage.assertCreateQuoteModalIsOpen();
});

Then("create new quote modal is not visible", () => {
  CreateQuotePage.assertCreateQuoteModalIsClosed();
});

Then("quote input has text {string}", (quoteTextInputValue: string) => {
  CreateQuotePage.assertQuoteTextInputHasValue(quoteTextInputValue);
});

Then("save button is disabled", () => {
  CreateQuotePage.assertSaveButtonIsDisabled();
});
