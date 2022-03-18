import { User } from "../features/user.feature";

describe("My Quotes Feature", () => {
  it("redirects to Login if user not logged in", () => {
    const user = new User();
    user.myQuotesView.open();
    user.loginView.assertOpen();

    user.topbar.clickOnMyQuotesLink();
    user.loginView.assertOpen();
  });

  it("opens My Quotes if user logged in", () => {
    const user = new User();
    user.login(1);
    user.allQuotesView.assertOpen();
    user.topbar.clickOnMyQuotesLink();
    user.myQuotesView.assertOpen();
  });
});
