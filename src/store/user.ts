import { defineStore } from "pinia";

import { User } from "@/models/user.model";
import backendApi from "@/api/backendApi";
import { useErrorsStore } from "./errors";

interface UserState {
  user: User | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    async login(userId: number): Promise<boolean> {
      try {
        this.user = await backendApi.users.getUser(userId);
        return true;
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
        this.user = null;
        return false;
      }
    },
    logout() {
      this.user = null;
    },
  },
});
