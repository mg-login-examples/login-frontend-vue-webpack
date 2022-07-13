import { defineStore } from "pinia";

import { Quote } from "@/models/quote.model";
import backendApi from "@/api/backendApi";
import { useErrorsStore } from "./errors";
import { useUserStore } from "./user";
import { QuoteCreate } from "@/models/quote-create.model";

interface QuotesState {
  quotes: Quote[];
  userQuotes: Quote[];
}

export const useQuotesStore = defineStore("quotes", {
  state: (): QuotesState => ({
    quotes: [],
    userQuotes: [],
  }),
  actions: {
    async getQuotes() {
      try {
        this.quotes = await backendApi.quotes.getQuotes();
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
        this.quotes = [];
      }
    },
    async getUserQuotes() {
      const userStore = useUserStore();
      if (userStore.user) {
        try {
          this.userQuotes = await backendApi.quotes.getUserQuotes(
            userStore.user.id
          );
        } catch (error) {
          const errorStore = useErrorsStore();
          errorStore.handleError(error);
          this.userQuotes = [];
        }
      } else {
        this.userQuotes = [];
      }
    },
    async createUserQuote(quoteText: string) {
      const userStore = useUserStore();
      if (userStore.user) {
        try {
          const quoteCreate: QuoteCreate = {
            text: quoteText,
            author: userStore.user,
          };
          const newQuote = await backendApi.quotes.createQuote(quoteCreate);
          this.userQuotes.push(newQuote);
        } catch (error) {
          const errorStore = useErrorsStore();
          errorStore.handleError(error);
          this.userQuotes = [];
        }
      }
    },
    async deleteUserQuote(quoteId: number) {
      try {
        await backendApi.quotes.deleteQuote(quoteId);
        this.userQuotes = this.userQuotes.filter(
          (quote) => quote.id !== quoteId
        );
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
      }
    },
  },
});
