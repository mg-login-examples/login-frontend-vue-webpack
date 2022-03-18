export class LoginView {
  urlPath = "login";
  loginUserIdInput = "[data-test='login--user-id-input']";
  loginSubmitButton = "[data-test='login--submit-button']";

  open() {
    cy.visit(`/${this.urlPath}`);
  }
  assertOpen() {
    cy.url().should("eq", Cypress.config().baseUrl + this.urlPath);
  }
  enterUserId(userId: number) {
    cy.get(this.loginUserIdInput)
      .clear()
      .should("have.value", "")
      .type(userId.toString())
      .should("have.value", userId);
  }
  clickOnLoginButton() {
    cy.get(this.loginSubmitButton).click();
  }
}
