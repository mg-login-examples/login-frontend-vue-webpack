import { User } from "../features/user.feature";

describe("Login Feature", () => {
  it("logs in valid user and redirects to All Quotes", () => {
    const user = new User();
    user.loginView.open();
    user.loginView.enterUserId(1);
    user.loginView.clickOnLoginButton();
    user.allQuotesView.assertOpen();
  });

  it("does not allow login for invalid users", () => {
    const user = new User();
    user.loginView.open();
    user.loginView.enterUserId(0);
    user.loginView.clickOnLoginButton();
    user.loginView.assertOpen();
  });
});
