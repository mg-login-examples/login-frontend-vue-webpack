import axios, { AxiosResponse } from "axios";

import { LoginResponseModel } from "../models/login-response.model";
import { UserModel } from "../models/user.model";

export default class APIHelpers {
  static admin_api_base_url = Cypress.env("ADMIN_API_URL");
  static api_base_url = Cypress.env("API_URL");

  static getQuotesUrl = `${this.admin_api_base_url}/resource/quotes/`;
  static createUserUrl = `${this.admin_api_base_url}/resource/users/`;
  static createQuoteUrl = `${this.admin_api_base_url}/resource/quotes/`;

  static loginUrl = `${this.api_base_url}/api/login/`;

  static getUserByIdUrl(userId: number) {
    return `${this.admin_api_base_url}/resource/users/${userId}/`;
  }

  static async createUser(email: string, password: string) {
    return <UserModel>(
      await axios({
        method: "POST",
        url: this.createUserUrl,
        data: {
          email: email,
          password: password,
        },
      })
    ).data;
  }

  static async getUser(userId: number) {
    return <UserModel>(
      (await axios({ method: "GET", url: this.getUserByIdUrl(userId) })).data
    );
  }

  static async login(email: string, password: string) {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    return <LoginResponseModel>(
      await axios({
        method: "POST",
        url: this.loginUrl,
        data: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    ).data;
  }

  static async assertLoginInvalid(email: string, password: string) {
    try {
      await this.login(email, password);
      throw new Error(
        `Error. User with email ${email} and ${password} exists. Please provide an invalid user.`
      );
    } catch (error) {
      const response = <AxiosResponse>error.response;
      if (response.status !== 401) {
        throw new Error(
          `Unknown error in Admin API for GET user by id.
          Response status: ${response.status}.
          Response body: ${response.data}`
        );
      }
    }
  }

  static async createUserIfNoUserExists(email: string, password: string) {
    try {
      const userId = (await this.login(email, password)).id;
      return this.getUser(userId);
    } catch (error) {
      const response = <AxiosResponse>error.response;
      if (response.status === 401) {
        return this.createUser(email, password);
      } else {
        throw error;
      }
    }
  }

  static async getQuotes() {
    return <[]>(await axios({ method: "GET", url: this.getQuotesUrl })).data;
  }

  static async getUserQuotes(userId: number) {
    return (await this.getUser(userId)).quotes;
  }

  static async createQuote(quoteText: string, author: UserModel) {
    return (
      await axios({
        method: "POST",
        url: this.createQuoteUrl,
        data: {
          text: quoteText,
          author: author,
        },
      })
    ).data;
  }

  static async createAQuoteIfNoQuoteExists() {
    if ((await this.getQuotes()).length === 0) {
      const user = await this.createUserIfNoUserExists(
        "quote_creator@fakemail.com",
        "12345678"
      );
      await this.createQuote("E2E generated fake quote", user);
    }
  }

  static async createUserQuoteIfNoQuoteExists(email: string, password: string) {
    const user = await this.createUserIfNoUserExists(email, password);
    if ((await this.getUserQuotes(user.id)).length === 0) {
      await this.createQuote("E2E generated fake quote", user);
    }
  }
}
