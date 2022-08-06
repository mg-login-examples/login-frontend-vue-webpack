export default class MyQuotesPage {
  static readonly urlPath = "my-quotes";

  static readonly quoteTile = "[data-test='quote-tile']";
  static readonly openCreateQuoteModalButton =
    "[data-test='user-quote--open-create-quote-modal-button']";
  static readonly editQuoteButton =
    "[data-test='quote-tile--edit-quote-button']";
  static readonly deleteQuoteButton =
    "[data-test='quote-tile--delete-quote-button']";

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

  static clickOnCreateQuoteButton() {
    cy.get(this.openCreateQuoteModalButton).click();
  }

  static assertQuoteWithTextIsVisible(quoteText: string) {
    cy.get(this.quoteTile).contains(quoteText).should("be.visible");
  }

  static assertQuoteWithTextIsNotVisible(quoteText: string) {
    cy.get(this.quoteTile).contains(quoteText).should("not.exist");
  }

  static hoverOnQuoteTileWithText(quoteText: string) {
    cy.get(this.quoteTile).contains(quoteText).trigger("mouseover");
  }

  static clickOnEditButtonOfQuoteTileWithText(quoteText: string) {
    cy.contains(this.quoteTile, quoteText).find(this.editQuoteButton).click();
  }

  static clickOnDeleteButtonOfQuoteTileWithText(quoteText: string) {
    cy.contains(this.quoteTile, quoteText).find(this.deleteQuoteButton).click();
  }

  static assertEditQuoteButtonIsVisibleOnQuoteTileWithText(quoteText: string) {
    cy.contains(this.quoteTile, quoteText).find(this.editQuoteButton);
  }

  static assertDeleteQuoteButtonIsVisibleOnQuoteTileWithText(
    quoteText: string
  ) {
    cy.contains(this.quoteTile, quoteText).find(this.deleteQuoteButton);
  }
}
