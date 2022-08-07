export default class AllQuotesPage {
  static readonly quoteTile = "[data-test='quote-tile']";

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
}
