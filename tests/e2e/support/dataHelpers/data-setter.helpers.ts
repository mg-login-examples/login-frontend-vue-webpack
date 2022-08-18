import { AxiosResponse } from "axios";
import UserAPI from "./user.api";
import AdminAPI from "./admin.api";

export default class DataSetterHelpers {
  static async createUserIfNoUserExists(email: string, password: string) {
    try {
      const userId = (await UserAPI.login(email, password)).user.id;
      return AdminAPI.getUser(userId);
    } catch (error) {
      const response = <AxiosResponse>error.response;
      if (response.status === 401) {
        const user = await AdminAPI.createUser(email, password);
        user.is_verified = true;
        await AdminAPI.updateUser(user);
        return user;
      } else {
        throw error;
      }
    }
  }

  static async deleteUserIfUserExists(email: string, password: string) {
    try {
      const userId = (await UserAPI.login(email, password)).user.id;
      await AdminAPI.deleteUser(userId);
      return;
    } catch (error) {
      const response = <AxiosResponse>error.response;
      if (response.status === 401) {
        return;
      } else {
        throw error;
      }
    }
  }

  static async getUserQuotes(userId: number) {
    return (await AdminAPI.getUser(userId)).quotes;
  }

  static async createAQuoteIfNoQuoteExists() {
    if ((await AdminAPI.getQuotes()).length === 0) {
      const user = await this.createUserIfNoUserExists(
        "quote_creator@fakemail.com",
        "12345678"
      );
      await AdminAPI.createQuote("E2E generated fake quote", user);
    }
  }

  static async createUserQuoteIfNoQuoteExists(email: string, password: string) {
    const user = await this.createUserIfNoUserExists(email, password);
    if ((await this.getUserQuotes(user.id)).length === 0) {
      await AdminAPI.createQuote("E2E generated fake quote", user);
    }
  }

  static async assertLoginInvalid(email: string, password: string) {
    try {
      await UserAPI.login(email, password);
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
}
