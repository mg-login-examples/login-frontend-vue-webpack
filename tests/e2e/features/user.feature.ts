import { LoginView } from "../pageObjects/LoginView.page";
import { MyQuotesView } from "../pageObjects/MyQuotesView.page";
import { AllQuotesView } from "../pageObjects/AllQuotesView.page";
import { Topbar } from "../pageObjects/Topbar.page";

export class User {
  loginView = new LoginView();
  topbar = new Topbar();
  allQuotesView = new AllQuotesView();
  myQuotesView = new MyQuotesView();

  login(userId: number) {
    this.loginView.open();
    this.loginView.enterUserId(userId);
    this.loginView.clickOnLoginButton();
  }

  logout() {
    this.topbar.clickOnLogoutButton();
  }
}
