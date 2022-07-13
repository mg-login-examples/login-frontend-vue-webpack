import { User } from "./user.model";

export interface QuoteCreate {
  text: string;
  author: User | undefined;
}
