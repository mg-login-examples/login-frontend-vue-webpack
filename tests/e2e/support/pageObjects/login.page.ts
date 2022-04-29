export default class LoginPage {
  static readonly urlPath = "login";

  static readonly loginUserEmailInput = "[data-test='login--user-email-input']";
  static readonly loginUserPasswordInput =
    "[data-test='login--user-password-input']";
  static readonly loginSubmitButton = "[data-test='login--submit-button']";

  static open() {
    cy.visit(`/${this.urlPath}`);
  }

  static assertIsOpen() {
    cy.url().should("eq", Cypress.config().baseUrl + this.urlPath);
  }

  static goToLoginPage() {
    this.open();
    this.assertIsOpen();
  }

  static enterUserEmail(email: string) {
    cy.get(this.loginUserEmailInput)
      .clear()
      .should("have.value", "")
      .type(email)
      .should("have.value", email);
  }

  static enterUserPassword(password: string) {
    cy.get(this.loginUserPasswordInput)
      .clear()
      .should("have.value", "")
      .type(password)
      .should("have.value", password);
  }

  static clickOnLoginButton() {
    cy.get(this.loginSubmitButton).click();
  }
}
