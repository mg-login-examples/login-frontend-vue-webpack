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

Then("a quote {string} is visible in my quotes", (myQuoteText: string) => {
  MyQuotesPage.assertQuoteWithTextIsVisible(myQuoteText);
});
