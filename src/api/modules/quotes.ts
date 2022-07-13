import { QuoteCreate } from "@/models/quote-create.model";
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
  async createQuote(quoteCreate: QuoteCreate): Promise<Quote> {
    const response = await http.post(`/api/quotes/`, quoteCreate);
    return <Quote>response.data;
  },
  async deleteQuote(quoteId: number) {
    await http.delete(`/api/quotes/${quoteId}/`);
  },
};

export default quotesApi;
