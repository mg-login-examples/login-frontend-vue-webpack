import { When, Then } from "cypress-cucumber-preprocessor/steps";

import { getValueFromStore } from "../testDataStore/store";
import MyQuotesPage from "../pageObjects/my-quotes.page";
import DeleteQuotePage from "../pageObjects/delete-quote.page";

// Uses randomized value
When(
  "I click on delete button for the quote with text {string}",
  (quoteText: string) => {
    quoteText = getValueFromStore(quoteText);
    MyQuotesPage.clickOnDeleteButtonOfQuoteTileWithText(quoteText);
  }
);

When("I click on delete button in the delete quote modal", () => {
  DeleteQuotePage.clickOnDeleteButton();
});

Then("the delete quote modal is open", () => {
  DeleteQuotePage.assertDeleteQuoteModalIsOpen();
});

Then("the delete quote modal is closed", () => {
  DeleteQuotePage.assertDeleteQuoteModalIsClosed();
});

// Uses randomized value
Then(
  "the quote to delete with text {string} is visible",
  (quoteText: string) => {
    quoteText = getValueFromStore(quoteText);
    DeleteQuotePage.assertQuoteToDeleteTextIsVisible(quoteText);
  }
);

// Uses randomized value
Then("the quote with text {string} is not visible", (quoteText: string) => {
  quoteText = getValueFromStore(quoteText);
  MyQuotesPage.assertQuoteWithTextIsNotVisible(quoteText);
});
