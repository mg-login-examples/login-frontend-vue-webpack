export default class SignupPage {
  static readonly urlPath = "signup";

  static readonly signupUserEmailInput =
    "[data-test='signup--user-email-input']";
  static readonly signupUserPasswordInput =
    "[data-test='signup--user-password-input']";
  static readonly signupUserConfirmPasswordInput =
    "[data-test='signup--user-confirm-password-input']";
  static readonly signupSubmitButton = "[data-test='signup--submit-button']";
  // static readonly loginShowPasswordButton =
  //   "[data-test='login--show-password-button']";
  // static readonly loginShowPasswordButtonIcon =
  //   "[data-test='login--show-password-button'] svg";

  static open() {
    cy.visit(`/${this.urlPath}`);
  }

  static assertIsOpen() {
    cy.url().should("eq", Cypress.config().baseUrl + this.urlPath);
  }

  static goToSignupPage() {
    this.open();
    this.assertIsOpen();
  }

  static enterUserEmail(email: string) {
    cy.get(this.signupUserEmailInput)
      .clear()
      .should("have.value", "")
      .type(email)
      .should("have.value", email);
  }

  static enterUserPassword(password: string) {
    cy.get(this.signupUserPasswordInput)
      .clear()
      .should("have.value", "")
      .type(password)
      .should("have.value", password);
  }

  static enterUserConfirmPassword(password: string) {
    cy.get(this.signupUserConfirmPasswordInput)
      .clear()
      .should("have.value", "")
      .type(password)
      .should("have.value", password);
  }

  static clickOnSignupButton() {
    cy.get(this.signupSubmitButton).click();
  }
}
