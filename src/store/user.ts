import { defineStore } from "pinia";

import { User } from "@/models/user.model";
import backendApi from "@/api/backendApi";
import { useErrorsStore } from "./errors";

interface UserState {
  user: User | undefined;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: undefined,
  }),
  actions: {
    async login(userId: number) {
      try {
        this.user = await backendApi.users.getUser(userId);
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
        this.user = undefined;
      }
    },
  },
});
