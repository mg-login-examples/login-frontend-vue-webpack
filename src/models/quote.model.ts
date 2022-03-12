import { User } from "./user.model";

export interface Quote {
  id: number;
  text: string;
  author: User;
  liked_by_users: User[];
}
