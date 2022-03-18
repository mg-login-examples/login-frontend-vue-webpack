export class AllQuotesView {
  open() {
    cy.visit("/");
  }
  assertOpen() {
    cy.url().should("eq", Cypress.config().baseUrl);
  }
}
