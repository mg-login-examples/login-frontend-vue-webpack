import { setValueInStore } from "../testDataStore/store";

export default class AllQuotesPage {
  static readonly quoteTile = "[data-test='quote-tile']";
  static readonly quoteText = "[data-test='quote-tile--text']";
  static readonly likeQuoteButton =
    "[data-test='quote-tile--like-quote-button']";
  static readonly unlikeQuoteButton =
    "[data-test='quote-tile--unlike-quote-button']";

  static open() {
    cy.visit("/");
  }

  static assertIsOpen() {
    cy.url().should("eq", Cypress.config().baseUrl);
  }

  static goToAllQuotesPage() {
    this.open();
    this.assertIsOpen();
  }

  static assertSomeQuoteIsVisible() {
    cy.get(this.quoteTile).should("be.visible");
  }

  static assertQuoteWithTextAndAuthorIsVisible(
    quoteText: string,
    authorUsername: string
  ) {
    cy.contains(this.quoteTile, quoteText)
      .contains(authorUsername)
      .should("be.visible");
  }

  static setInStoreTextOfQuoteNotCreatedOrLikedByUser(
    storeKey: string,
    username: string
  ) {
    cy.get(this.quoteTile)
      .not(`:contains(${username})`)
      .filter(`:not(:has(${this.unlikeQuoteButton}))`)
      .find(this.quoteText)
      .then((jqueryEl) => {
        cy.log("1231231231232");
        cy.log(storeKey, jqueryEl[0].innerText);
        cy.log("1231231231232");
        setValueInStore(storeKey, jqueryEl[0].innerText);
      });
  }

  static assertLikeQuoteButtonIsVisibleOnQuoteTileWithText(quoteText: string) {
    cy.contains(this.quoteTile, quoteText).find(this.likeQuoteButton);
  }

  static assertUnlikeQuoteButtonIsVisibleOnQuoteTileWithText(
    quoteText: string
  ) {
    cy.contains(this.quoteTile, quoteText)
      .find(this.unlikeQuoteButton)
      .should("be.visible");
  }

  static clickOnLikeButtonOfQuoteTileWithText(quoteText: string) {
    cy.contains(this.quoteTile, quoteText).find(this.likeQuoteButton).click();
  }

  static clickOnUnlikeButtonOfQuoteTileWithText(quoteText: string) {
    cy.contains(this.quoteTile, quoteText).find(this.unlikeQuoteButton).click();
  }
}
