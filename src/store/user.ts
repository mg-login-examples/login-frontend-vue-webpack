import { defineStore } from "pinia";

import { User } from "@/models/user.model";
import backendApi from "@/api/backendApi";
import { useErrorsStore } from "./errors";

interface UserState {
  authAttemptedOnce: boolean;
  user: User | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    authAttemptedOnce: false,
    user: null,
  }),
  actions: {
    async login(
      userEmail: string,
      userPassword: string,
      rememberMe: boolean
    ): Promise<boolean> {
      try {
        await backendApi.users.login(userEmail, userPassword, rememberMe);
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
      } catch (error) {
        this.user = null;
      }
      this.authAttemptedOnce = true;
      return this.user != null;
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
