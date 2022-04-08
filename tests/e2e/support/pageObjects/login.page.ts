export default class LoginPage {
  static readonly urlPath = "login";

  static readonly loginUserIdInput = "[data-test='login--user-id-input']";
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

  static enterUserId(userId: number) {
    cy.get(this.loginUserIdInput)
      .clear()
      .should("have.value", "")
      .type(userId.toString())
      .should("have.value", userId);
  }

  static clickOnLoginButton() {
    cy.get(this.loginSubmitButton).click();
  }
}
