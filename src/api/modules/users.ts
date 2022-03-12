import http from "./base";

const usersApi = {
  async getUser(userId: number) {
    const response = await http.get(`/api/users/${userId}`);
    return response.data;
  },
  async getUserQuotes(userId: number) {
    const response = await http.get(`/api/users/${userId}/quotes/`);
    return response.data;
  },
};

export default usersApi;
