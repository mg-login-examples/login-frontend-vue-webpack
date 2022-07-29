export default class CreateQuotePage {
  static readonly quoteTextInput =
    "[data-test='user-quote--create-quote--quote-text']";
  static readonly cancelButton =
    "[data-test='user-quote--create-quote--cancel-button']";
  static readonly saveQuoteButton =
    "[data-test='user-quote--create-quote--save-quote-button']";

  static assertCreateQuoteModalIsOpen() {
    cy.get(this.quoteTextInput).should("be.visible");
  }

  static assertCreateQuoteModalIsClosed() {
    cy.get(this.quoteTextInput).should("not.exist");
  }

  static assertQuoteTextInputIsVisible() {
    cy.get(this.quoteTextInput).should("be.visible");
  }

  static enterQuoteText(quoteText: string) {
    cy.get(this.quoteTextInput)
      .clear()
      .should("have.value", "")
      .type(quoteText)
      .should("have.value", quoteText);
  }

  static assertQuoteTextInputHasValue(expectedQuoteTextInputValue: string) {
    cy.get(this.quoteTextInput).should(
      "have.value",
      expectedQuoteTextInputValue
    );
  }

  static assertSaveButtonIsDisabled() {
    cy.get(this.saveQuoteButton).should("be.disabled");
  }

  static clickOnSaveButton() {
    cy.get(this.saveQuoteButton).click();
  }
}
