export default class CreateEditQuotePage {
  static readonly createEditQuoteTitle =
    "[data-test='user-quote--create-edit-quote--title']";
  static readonly quoteTextInput =
    "[data-test='user-quote--create-edit-quote--quote-text']";
  static readonly cancelButton =
    "[data-test='user-quote--create-edit-quote--cancel-button']";
  static readonly saveQuoteButton =
    "[data-test='user-quote--create-edit-quote--save-quote-button']";

  static assertCreateQuoteModalIsOpen() {
    cy.get(this.createEditQuoteTitle).contains("Write A Quote");
  }

  static assertCreateQuoteModalIsClosed() {
    cy.contains(this.createEditQuoteTitle, "Write A Quote").should("not.exist");
  }

  static assertEditQuoteModalIsOpen() {
    cy.get(this.createEditQuoteTitle).contains("Edit Quote");
  }

  static assertEditQuoteModalIsClosed() {
    cy.contains(this.createEditQuoteTitle, "Edit Quote").should("not.exist");
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
