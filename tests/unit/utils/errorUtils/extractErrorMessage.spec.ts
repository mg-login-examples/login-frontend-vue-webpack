import extractErrorMessage from "@/utils/errorUtils/extractErrorMessage";

describe("Utils > errorUtils > extractErrorMessage.ts", () => {
  it("extracts axios no connection error message", () => {
    const axiosNoConnectionError = new Error("Network Error");
    const message = extractErrorMessage(axiosNoConnectionError);
    expect(message).toBe("Backend not found.");
  });

  it("extract unknown error in production and staging mode", () => {
    const unknownError = new Error("Unknown error");
    process.env.VUE_APP_ENV = "production";
    expect(extractErrorMessage(unknownError)).toBe(
      "Something went wrong! Please try again later."
    );
    process.env.VUE_APP_ENV = "staging";
    expect(extractErrorMessage(unknownError)).toBe(
      "Something went wrong! Please try again later."
    );
  });

  it("handles unknown error in development mode", () => {
    const errorMessage = "Some error";
    const unknownError = new Error(errorMessage);
    process.env.VUE_APP_ENV = "development";
    expect(extractErrorMessage(unknownError)).toBe(
      `Unmapped error: ${errorMessage}`
    );
    process.env.VUE_APP_ENV = "local";
    expect(extractErrorMessage(unknownError)).toBe(
      `Unmapped error: ${errorMessage}`
    );
  });
});
