import { QuoteCreate } from "@/models/quote-create.model";
import { Quote } from "@/models/quote.model";
import { User } from "@/models/user.model";
import http from "./base";

const quotesApi = {
  async getQuotes(
    params: { skip?: number; limit?: number } | undefined = undefined
  ): Promise<Quote[]> {
    const skip = params && params.skip ? params.skip : 0;
    const limit = params && params.limit ? params.limit : 40;
    const response = await http.get(`/api/quotes/?skip=${skip}&limit=${limit}`);
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
  async editQuote(quoteEdit: Quote) {
    await http.put(`/api/quotes/${quoteEdit.id}`, quoteEdit);
  },
  async deleteQuote(quoteId: number) {
    await http.delete(`/api/quotes/${quoteId}/`);
  },
  async likeQuote(quoteId: number, userId: number) {
    await http.put(`/api/quotes/${quoteId}/users/${userId}/like/`);
  },
  async unlikeQuote(quoteId: number, userId: number) {
    await http.delete(`/api/quotes/${quoteId}/users/${userId}/like/`);
  },
};

export default quotesApi;
