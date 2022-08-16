import { User } from "./user.model";

export interface LoginResponse {
  user: User;
  access_token: string;
  token_type: string;
}
