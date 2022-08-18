import DataSetterHelpers from "./data-setter.helpers";

export default class CyDataSetterHelpers {
  static createUserIfNoUserExists(email: string, password: string) {
    return cy.wrap(
      DataSetterHelpers.createUserIfNoUserExists(email, password),
      { timeout: 10000 }
    );
  }

  static assertLoginInvalid(email: string, password: string) {
    return cy.wrap(DataSetterHelpers.assertLoginInvalid(email, password), {
      timeout: 10000,
    });
  }

  static deleteUserIfUserExists(email: string, password: string) {
    return cy.wrap(DataSetterHelpers.deleteUserIfUserExists(email, password), {
      timeout: 10000,
    });
  }

  static createAQuoteIfNoQuoteExists() {
    cy.wrap(DataSetterHelpers.createAQuoteIfNoQuoteExists(), {
      timeout: 10000,
    });
  }

  static createUserQuoteIfNoQuoteExists(email: string, password: string) {
    cy.wrap(DataSetterHelpers.createUserQuoteIfNoQuoteExists(email, password), {
      timeout: 10000,
    });
  }
}
