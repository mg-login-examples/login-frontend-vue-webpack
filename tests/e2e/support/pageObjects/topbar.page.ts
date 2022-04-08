export default class TopbarPage {
  static readonly allQuotesLink = "[data-test='topbar--all-quotes-link']";
  static readonly myQuotesLink = "[data-test='topbar--user-quotes-link']";
  static readonly loginLink = "[data-test='topbar--login-link']";
  static readonly logoutButton = "[data-test='topbar--logout-button']";
  static readonly userNameLabel = "[data-test='topbar--user-name']";

  static clickOnAllQuotesLink() {
    cy.get(this.allQuotesLink).click();
  }
  static clickOnMyQuotesLink() {
    cy.get(this.myQuotesLink).click();
  }
  static clickOnLoginButton() {
    cy.get(this.loginLink).click();
  }
  static assertLoginButtonIsVisible() {
    cy.get(this.loginLink).should("be.visible");
  }
  static assertLoginButtonIsNotVisible() {
    cy.get(this.loginLink).should("not.exist");
  }
  static clickOnLogoutButton() {
    cy.get(this.logoutButton).click();
  }
  static assertLogoutButtonIsVisible() {
    cy.get(this.logoutButton).should("be.visible");
  }
  static assertLogoutButtonIsNotVisible() {
    cy.get(this.logoutButton).should("not.exist");
  }
  static assertUserIsVisible() {
    cy.get(this.userNameLabel).should("be.visible");
  }
}
