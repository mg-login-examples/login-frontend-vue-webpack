export default class VerifyEmailPage {
  static readonly urlPath = "verify-email";

  static readonly verificationCodeInput =
    "[data-test='email-verification--code-input']";
  static readonly submitButton =
    "[data-test='email-verification--submit-button']";

  static open() {
    cy.visit(`/${this.urlPath}`);
  }

  static assertIsOpen() {
    cy.url().should("eq", Cypress.config().baseUrl + this.urlPath);
  }

  static enterVerificationCode(verificationCode: string) {
    cy.get(this.verificationCodeInput)
      .clear()
      .should("have.value", "")
      .type(verificationCode)
      .should("have.value", verificationCode);
  }

  static clickOnSendVerificationCode() {
    cy.get(this.submitButton).click();
  }
}
