export class MyQuotesView {
  urlPath = "my-quotes";

  open() {
    cy.visit(`/${this.urlPath}`);
  }
  assertOpen() {
    cy.url().should("eq", Cypress.config().baseUrl + this.urlPath);
  }
}
