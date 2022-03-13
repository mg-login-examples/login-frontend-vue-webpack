import { AxiosError } from "axios";

import logError from "@/utils/errorUtils/logError";
console.log = jest.fn();

process.env.VUE_APP_ENV = "development";

describe("logError", () => {
  beforeEach(() => {
    (console.log as jest.Mock).mockClear();
  });

  it("logs error object and message", () => {
    const error = Error("mock error");
    logError(error);
    expect(console.log).toHaveBeenCalledWith("Error object: ", error);
    expect(console.log).toHaveBeenCalledWith("Error message: ", error.message);
  });
});
