import { isDevelopmentEnvironment } from "@/utils/envUtils";

const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message && error.message === "Network Error") {
      return "Backend not found.";
    } else {
      if (isDevelopmentEnvironment()) {
        return "Unmapped error: " + error.message;
      } else {
        return "Something went wrong! Please try again later.";
      }
    }
  }
  if (isDevelopmentEnvironment()) {
    return "Unknown error object!";
  }
  return "Something went wrong! Please try again later.";
};

export default extractErrorMessage;
