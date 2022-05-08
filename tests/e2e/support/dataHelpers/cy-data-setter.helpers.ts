import DataSetterHelpers from "./data-setter.helpers";

export default class CyDataSetterHelpers {
  static createUserIfNoUserExists(email: string, password: string) {
    return cy.wrap(DataSetterHelpers.createUserIfNoUserExists(email, password));
  }

  static assertLoginInvalid(email: string, password: string) {
    return cy.wrap(DataSetterHelpers.assertLoginInvalid(email, password));
  }

  static createAQuoteIfNoQuoteExists() {
    cy.wrap(DataSetterHelpers.createAQuoteIfNoQuoteExists());
  }

  static createUserQuoteIfNoQuoteExists(email: string, password: string) {
    cy.wrap(DataSetterHelpers.createUserQuoteIfNoQuoteExists(email, password));
  }
}
