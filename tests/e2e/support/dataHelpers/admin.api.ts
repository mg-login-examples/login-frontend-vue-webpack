import axios from "axios";

import { LoginResponseModel } from "../models/login-response.model";
import { UserModel } from "../models/user.model";

export default class AdminAPI {
  static admin_api_base_url = Cypress.env("ADMIN_API_URL");
  static adminLoginUrl = `${this.admin_api_base_url}/login/`;
  static admin_api_login_user = Cypress.env("ADMIN_API_LOGIN_USERNAME");
  static admin_api_login_password = Cypress.env("ADMIN_API_LOGIN_PASSWORD");
  static admin_api_access_token_header = "";

  static getQuotesUrl = `${this.admin_api_base_url}/resource/quotes/`;
  static createUserUrl = `${this.admin_api_base_url}/resource/users/`;
  static createQuoteUrl = `${this.admin_api_base_url}/resource/quotes/`;

  static getUserByIdUrl(userId: number) {
    return `${this.admin_api_base_url}/resource/users/${userId}/`;
  }

  static updateUserById(userId: number) {
    return `${this.admin_api_base_url}/resource/users/${userId}/`;
  }

  static deleteUserByIdUrl(userId: number) {
    return `${this.admin_api_base_url}/resource/users/${userId}/`;
  }

  static async setAdminAPIAccessToken() {
    if (!this.admin_api_access_token_header) {
      const formData = new FormData();
      formData.append("username", this.admin_api_login_user);
      formData.append("password", this.admin_api_login_password);
      const response = <LoginResponseModel>(
        await axios({
          method: "POST",
          url: this.adminLoginUrl,
          data: formData,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
      ).data;
      this.admin_api_access_token_header = `${response.token_type} ${response.access_token}`;
    }
  }

  static async createUser(email: string, password: string) {
    await this.setAdminAPIAccessToken();
    return <UserModel>(
      await axios({
        method: "POST",
        url: this.createUserUrl,
        data: {
          email: email,
          password: password,
        },
        headers: {
          "Admin-Authorization": `${this.admin_api_access_token_header}`,
        },
      })
    ).data;
  }

  static async getUser(userId: number) {
    await this.setAdminAPIAccessToken();
    return <UserModel>(
      await axios({
        method: "GET",
        url: this.getUserByIdUrl(userId),
        headers: {
          "Admin-Authorization": `${this.admin_api_access_token_header}`,
        },
      })
    ).data;
  }

  static async updateUser(user: UserModel) {
    await this.setAdminAPIAccessToken();
    await axios({
      method: "PUT",
      url: this.updateUserById(user.id),
      data: user,
      headers: {
        "Admin-Authorization": `${this.admin_api_access_token_header}`,
      },
    });
  }

  static async deleteUser(userId: number) {
    await this.setAdminAPIAccessToken();
    await axios({
      method: "DELETE",
      url: this.deleteUserByIdUrl(userId),
      headers: {
        "Admin-Authorization": `${this.admin_api_access_token_header}`,
      },
    });
  }

  static async getQuotes() {
    await this.setAdminAPIAccessToken();
    return <[]>(
      await axios({
        method: "GET",
        url: this.getQuotesUrl,
        headers: {
          "Admin-Authorization": `${this.admin_api_access_token_header}`,
        },
      })
    ).data;
  }

  static async createQuote(quoteText: string, author: UserModel) {
    await this.setAdminAPIAccessToken();
    return (
      await axios({
        method: "POST",
        url: this.createQuoteUrl,
        data: {
          text: quoteText,
          author: author,
        },
        headers: {
          "Admin-Authorization": `${this.admin_api_access_token_header}`,
        },
      })
    ).data;
  }
}
