import axios from "axios";

import { LoginResponseModel } from "../models/login-response.model";

export default class UserAPI {
  static api_base_url = Cypress.env("API_URL");
  static loginUrl = `${this.api_base_url}/login/`;

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
}
