jest.mock("@/api/modules/users");
jest.mock("@/api/modules/quotes");
import backendApi from "@/api/backendApi";
import users from "@/api/modules/users";
import quotes from "@/api/modules/quotes";

describe("backend api module", () => {
  it("includes users module in api module", () => {
    expect(backendApi).toHaveProperty("users");
    expect(backendApi.users).toBe(users);
  });
  it("includes quotes module in api module", () => {
    expect(backendApi).toHaveProperty("quotes");
    expect(backendApi.quotes).toBe(quotes);
  });
});
