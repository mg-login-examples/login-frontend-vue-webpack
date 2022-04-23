export default class AdminAPIHelpers {
  static admin_api_base_url = Cypress.env("ADMIN_API_URL");
  static getQuotesUrl = `${this.admin_api_base_url}/resource/quotes/`;
  static createUserUrl = `${this.admin_api_base_url}/resource/users/`;
  static createQuoteUrl = `${this.admin_api_base_url}/resource/quotes/`;

  static getUserByIdUrl(userId: number) {
    return `${this.admin_api_base_url}/resource/users/${userId}/`;
  }

  static createUserIfNoUserExists(userId: number) {
    cy.request({
      url: this.getUserByIdUrl(userId),
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status !== 200) {
        if (
          response.status === 404 &&
          response.body.detail === "Item not found"
        ) {
          cy.request({
            method: "POST",
            url: this.createUserUrl,
            body: {
              email: "a@a.a",
              password: "12345678",
            },
          });
        } else {
          throw new Error(
            `Unknown error in Admin API for GET user by id.
            Response status: ${response.status}.
            Response body: ${response.body}`
          );
        }
      }
    });
  }

  static assertUserDoesNotExist(userId: number) {
    cy.request({
      url: this.getUserByIdUrl(userId),
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        throw new Error(`Error: User with id ${userId} exists`);
      }
      if (
        response.status !== 404 ||
        response.body.detail !== "Item not found"
      ) {
        throw new Error(
          `Unknown error in Admin API for GET user by id.
          Response status: ${response.status}.
          Response body: ${response.body}`
        );
      }
    });
  }

  static checkIfAtLeast1QuoteExists() {
    return cy.request(this.getQuotesUrl).then((response) => {
      if (response.body.length == 0) {
        return false;
      }
      return true;
    });
  }

  static assertAtLeast1QuoteExists() {
    cy.request(this.getQuotesUrl).then((response) => {
      if (response.body.length == 0) {
        throw new Error("No quotes exist");
      }
    });
  }

  static createUserQuoteIfNoQuoteExists(userId: number) {
    cy.request({
      url: this.getUserByIdUrl(userId),
    }).then((response) => {
      if (response.body.quotes.length === 0) {
        cy.request({
          method: "POST",
          url: this.createQuoteUrl,
          body: {
            text: `quote by user ${userId}`,
            author: response.body,
          },
        });
      }
    });
  }
}
