import { Quote } from "@/models/quote.model";
import http from "./base";

const quotesApi = {
  async getQuotes(): Promise<Quote[]> {
    const response = await http.get(`/api/quotes/`);
    return <Quote[]>response.data;
  },
  async getUserQuotes(userId: number): Promise<Quote[]> {
    const response = await http.get(`/api/users/${userId}/quotes/`);
    return <Quote[]>response.data;
  },
};

export default quotesApi;
