import http from "@/api/modules/base";

describe("api > modules > base.ts", () => {
  it("creates base http object with expected configs", () => {
    expect(http.defaults.baseURL).toBe(process.env.VUE_APP_BACKEND_URL);
    expect(http.defaults.withCredentials).toBe(true);
  });
});
