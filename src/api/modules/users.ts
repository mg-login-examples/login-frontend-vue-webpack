import { User } from "@/models/user.model";
import http from "./base";

const usersApi = {
  async getUser(userId: number): Promise<User> {
    const response = await http.get(`/api/users/${userId}`);
    return <User>response.data;
  },
};

export default usersApi;
