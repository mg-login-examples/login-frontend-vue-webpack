/// <reference types="cypress-mailslurp" />
import { setValueInStore } from "../testDataStore/store";

export default class MailslurpHelpers {
  // sets external value
  static async createInbox(email: string, accountId: string) {
    cy.mailslurp().then((mailslurp) => {
      mailslurp.createInbox().then((inbox) => {
        setValueInStore(email, inbox.emailAddress);
        setValueInStore(accountId, inbox.id);
      });
    });
  }

  // sets external value
  static async retrieveVerificationCodeFromEmail(
    accountId: string,
    verificationCode: string
  ) {
    cy.mailslurp()
      .then((mailslurp) => {
        return mailslurp.waitForLatestEmail(accountId, 1000);
      })
      .then((email) => {
        let codeValue = email.body.split("\n")[1];
        codeValue = parseInt(codeValue, 10).toString();
        setValueInStore(verificationCode, codeValue);
      });
  }
}
