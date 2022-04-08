import { When } from "cypress-cucumber-preprocessor/steps";

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
