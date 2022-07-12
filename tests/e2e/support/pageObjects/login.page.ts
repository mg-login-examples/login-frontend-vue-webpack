export default class LoginPage {
  static readonly urlPath = "login";

  static readonly loginUserEmailInput = "[data-test='login--user-email-input']";
  static readonly loginUserPasswordInput =
    "[data-test='login--user-password-input']";
  static readonly loginSubmitButton = "[data-test='login--submit-button']";
  static readonly loginRememberMeCheckbox =
    "[data-test='login--remember-me-checkbox']";
  static readonly loginShowPasswordButton =
    "[data-test='login--show-password-button']";
  static readonly loginShowPasswordButtonIcon =
    "[data-test='login--show-password-button'] svg";

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

  static clickOnRememberMeCheckbox() {
    cy.get(this.loginRememberMeCheckbox)
      .should("not.be.checked")
      .click()
      .should("be.checked");
  }

  static clickOnLoginButton() {
    cy.get(this.loginSubmitButton).click();
  }

  static clickOnShowPassword() {
    cy.get(this.loginShowPasswordButton).click();
  }

  static assertPasswordInputIsOfTypePassword() {
    cy.get(this.loginUserPasswordInput).should("have.attr", "type", "password");
    cy.get(this.loginShowPasswordButtonIcon).should(
      "have.attr",
      "data-icon",
      "eye"
    );
  }

  static assertPasswordInputIsOfTypeText() {
    cy.get(this.loginUserPasswordInput).should("have.attr", "type", "text");
    cy.get(this.loginShowPasswordButtonIcon).should(
      "have.attr",
      "data-icon",
      "eye-slash"
    );
  }
}
