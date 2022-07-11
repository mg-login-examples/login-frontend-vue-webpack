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
    async login(userEmail: string, userPassword: string): Promise<boolean> {
      try {
        await backendApi.users.login(userEmail, userPassword);
        this.user = await backendApi.users.authenticate();
        return true;
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
        this.user = null;
        return false;
      }
    },
    async authenticate() {
      try {
        this.user = await backendApi.users.authenticate();
        return true;
      } catch (error) {
        this.user = null;
        return false;
      }
    },
    async logout() {
      try {
        await backendApi.users.logout();
        this.user = null;
        return true;
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
        this.user = null;
        return false;
      }
    },
  },
});
