import http from "@/api/modules/base";

describe("Api module: Base", () => {
  it("creates base http object with expected configs", () => {
    expect(http.defaults.baseURL).toBe(process.env.VUE_APP_BACKEND_URL);
    expect(http.defaults.withCredentials).toBe(true);
  });
});
