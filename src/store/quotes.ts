import { defineStore } from "pinia";

import { Quote } from "@/models/quote.model";
import { User } from "@/models/user.model";
import backendApi from "@/api/backendApi";
import { useErrorsStore } from "./errors";
import { useUserStore } from "./user";
import { QuoteCreate } from "@/models/quote-create.model";

interface QuotesState {
  quotes: Quote[];
  quotesSkip: number;
  quotesLimit: number;
  quotesMoreAvailable: boolean;
  userQuotes: Quote[];
}

export const useQuotesStore = defineStore("quotes", {
  state: (): QuotesState => ({
    quotes: [],
    quotesSkip: 0,
    quotesLimit: 51,
    quotesMoreAvailable: true,
    userQuotes: [],
  }),
  getters: {
    userQuoteById: (state) => {
      return (quoteId: number) =>
        state.userQuotes.find((quote) => quote.id === quoteId);
    },
  },
  actions: {
    async getQuotes() {
      try {
        if (this.quotesMoreAvailable) {
          this.quotes = await backendApi.quotes.getQuotes({
            skip: this.quotesSkip,
            limit: this.quotesLimit,
          });
        }
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
        }
      }
    },
    async editUserQuote(quoteEdited: Quote) {
      try {
        await backendApi.quotes.editQuote(quoteEdited);
        this.userQuotes = this.userQuotes.map((q) =>
          q.id !== quoteEdited.id ? q : quoteEdited
        );
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
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
    async likeQuote(quoteId: number) {
      const userStore = useUserStore();
      if (userStore.user) {
        try {
          await backendApi.quotes.likeQuote(quoteId, userStore.user.id);
          this.quotes = this.quotes.map((quote) => {
            if (quote.id === quoteId) {
              quote.liked_by_users.push(userStore.user as User);
            }
            return quote;
          });
        } catch (error) {
          const errorStore = useErrorsStore();
          errorStore.handleError(error);
          this.userQuotes = [];
        }
      }
    },
    async unlikeQuote(quoteId: number) {
      const userStore = useUserStore();
      if (userStore.user) {
        try {
          await backendApi.quotes.unlikeQuote(quoteId, userStore.user.id);
          this.quotes = this.quotes.map((quote) => {
            if (quote.id === quoteId) {
              quote.liked_by_users = quote.liked_by_users.filter(
                (user) => user.id !== user.id
              );
            }
            return quote;
          });
        } catch (error) {
          const errorStore = useErrorsStore();
          errorStore.handleError(error);
          this.userQuotes = [];
        }
      }
    },
  },
});
