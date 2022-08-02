export default class CreateQuotePage {
  static readonly quoteText =
    "[data-test='user-quote--delete-quote--quote-text']";
  static readonly cancelButton =
    "[data-test='user-quote--delete-quote--cancel-button']";
  static readonly deleteQuoteButton =
    "[data-test='user-quote--delete-quote--delete-quote-button']";

  static assertDeleteQuoteModalIsOpen() {
    cy.get(this.quoteText).should("be.visible");
  }

  static assertDeleteQuoteModalIsClosed() {
    cy.get(this.quoteText).should("not.exist");
  }

  static assertQuoteToDeleteTextIsVisible(quoteText: string) {
    cy.get(this.quoteText).contains(quoteText).should("be.visible");
  }

  static clickOnDeleteButton() {
    cy.get(this.deleteQuoteButton).click();
  }
}
