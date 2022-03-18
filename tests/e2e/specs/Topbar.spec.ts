import { User } from "../features/user.feature";

describe("Topbar Feature", () => {
  it("opens login", () => {
    const user = new User();
    user.allQuotesView.open();
    user.allQuotesView.assertOpen();
    user.topbar.clickOnLoginButton();
    user.loginView.assertOpen();
  });

  it("hides logout button when user not logged in", () => {
    const user = new User();
    user.allQuotesView.open();
    user.topbar.assertLogoutButtonHidden();
  });

  it("logs out user when logged in", () => {
    const user = new User();
    user.login(1);
    user.allQuotesView.assertOpen();
    user.topbar.assertLoginButtonHidden();
    user.topbar.clickOnLogoutButton();
    user.allQuotesView.assertOpen();
    user.topbar.assertLoginButtonVisible();
  });

  it("displays logged in user & hides login button when user logged in", () => {
    const user = new User();
    user.login(1);
    user.allQuotesView.assertOpen();
    user.topbar.assertLogoutButtonVisible();
    user.topbar.assertUserVisible();
  });

  it("opens all quotes", () => {
    const user = new User();
    user.loginView.open();
    user.loginView.assertOpen();
    user.topbar.clickOnAllQuotesLink();
    user.allQuotesView.assertOpen();
  });

  it("opens my quotes", () => {
    const user = new User();
    user.login(1);
    user.allQuotesView.assertOpen();
    user.topbar.clickOnMyQuotesLink();
    user.myQuotesView.assertOpen();
  });
});
