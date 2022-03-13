import { defineStore } from "pinia";

import extractErrorMessage from "@/utils/errorUtils/extractErrorMessage";
import logError from "@/utils/errorUtils/logError";

interface ErrorsState {
  isOpenSnackbar: boolean;
  errorMessage: string;
  errorHistory: unknown[];
}

export const useErrorsStore = defineStore("errors", {
  state: (): ErrorsState => ({
    isOpenSnackbar: false,
    errorMessage: "",
    errorHistory: [],
  }),
  actions: {
    openSnackbar() {
      this.isOpenSnackbar = true;
    },
    closeSnackbar() {
      this.isOpenSnackbar = false;
    },
    handleError(error: unknown) {
      this.errorMessage = extractErrorMessage(error);
      this.openSnackbar();
      this.errorHistory.push(error);
      logError(error);
    },
  },
});
