import { defineStore } from "pinia";

import { Quote } from "@/models/quote.model";
import backendApi from "@/api/backendApi";
import { useErrorsStore } from "./errors";
import { useUserStore } from "./user";

const errorStore = useErrorsStore();

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
          errorStore.handleError(error);
          this.userQuotes = [];
        }
      } else {
        this.userQuotes = [];
      }
    },
  },
});
