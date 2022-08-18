import { Given, When } from "cypress-cucumber-preprocessor/steps";

import { getValueFromStore } from "../testDataStore/store";
import MailslurpHelpers from "../dataHelpers/mailslurp.helpers";

// Sets external value
Given(
  "a real email address {string} exists on Mailslurp with account id {string}",
  function (emailAddress: string, accountId: string) {
    MailslurpHelpers.createInbox(emailAddress, accountId);
  }
);

// Sets external value
// Uses external value
When(
  "I retrieve the verification code {string} from my email account {string}",
  function (verificationCode: string, accountId: string) {
    accountId = getValueFromStore(accountId);
    MailslurpHelpers.retrieveVerificationCodeFromEmail(
      accountId,
      verificationCode
    );
  }
);
