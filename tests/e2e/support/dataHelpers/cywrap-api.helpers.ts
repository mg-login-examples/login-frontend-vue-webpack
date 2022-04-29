import APIHelpers from "./api.helpers";

export default class CyWrapAPIHelpers {
  static createUserIfNoUserExists(email: string, password: string) {
    return cy.wrap(APIHelpers.createUserIfNoUserExists(email, password));
  }

  static assertLoginInvalid(email: string, password: string) {
    return cy.wrap(APIHelpers.assertLoginInvalid(email, password));
  }

  static createAQuoteIfNoQuoteExists() {
    cy.wrap(APIHelpers.createAQuoteIfNoQuoteExists());
  }

  static createUserQuoteIfNoQuoteExists(email: string, password: string) {
    cy.wrap(APIHelpers.createUserQuoteIfNoQuoteExists(email, password));
  }
}
