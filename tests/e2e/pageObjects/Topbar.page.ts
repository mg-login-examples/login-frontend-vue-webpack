export class Topbar {
  allQuotesLink = "[data-test='topbar--all-quotes-link']";
  myQuotesLink = "[data-test='topbar--user-quotes-link']";
  loginLink = "[data-test='topbar--login-link']";
  logoutButton = "[data-test='topbar--logout-button']";
  userNameLabel = "[data-test='topbar--user-name']";

  clickOnAllQuotesLink() {
    cy.get(this.allQuotesLink).click();
  }
  clickOnMyQuotesLink() {
    cy.get(this.myQuotesLink).click();
  }
  clickOnLoginButton() {
    cy.get(this.loginLink).click();
  }
  assertLoginButtonVisible() {
    cy.get(this.loginLink).should("be.visible");
  }
  assertLoginButtonHidden() {
    cy.get(this.loginLink).should("not.exist");
  }
  clickOnLogoutButton() {
    cy.get(this.logoutButton).click();
  }
  assertLogoutButtonVisible() {
    cy.get(this.logoutButton).should("be.visible");
  }
  assertLogoutButtonHidden() {
    cy.get(this.logoutButton).should("not.exist");
  }
  assertUserVisible() {
    cy.get(this.userNameLabel).should("be.visible");
  }
}
