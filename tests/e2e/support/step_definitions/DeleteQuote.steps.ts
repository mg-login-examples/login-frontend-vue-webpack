import { When, Then } from "cypress-cucumber-preprocessor/steps";

import MyQuotesPage from "../pageObjects/my-quotes.page";
import DeleteQuotePage from "../pageObjects/delete-quote.page";

When(
  "I click on delete button for the quote with text {string}",
  (quoteText: string) => {
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

Then(
  "the quote to delete with text {string} is visible",
  (quoteText: string) => {
    DeleteQuotePage.assertQuoteToDeleteTextIsVisible(quoteText);
  }
);

Then("the quote with text {string} is not visible", (quoteText: string) => {
  MyQuotesPage.assertQuoteWithTextIsNotVisible(quoteText);
});
