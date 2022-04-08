export default class MyQuotesPage {
  static readonly urlPath = "my-quotes";

  static readonly quoteTile = "[data-test='quote-tile']";

  static open() {
    cy.visit(`/${this.urlPath}`);
  }
  static assertIsOpen() {
    cy.url().should("eq", Cypress.config().baseUrl + this.urlPath);
  }
  static goToMyQuotesPage() {
    this.open();
    this.assertIsOpen();
  }
  static assertSomeQuoteIsVisible() {
    cy.get(this.quoteTile).should("be.visible");
  }
}
