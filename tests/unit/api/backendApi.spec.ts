jest.mock("@/api/modules/users");
jest.mock("@/api/modules/quotes");
jest.mock("@/api/modules/emailVerifications");
import backendApi from "@/api/backendApi";
import users from "@/api/modules/users";
import quotes from "@/api/modules/quotes";
import emailVerifications from "@/api/modules/emailVerifications";
import userNotes from "@/api/modules/user-notes";

describe("backend api module", () => {
  it("includes users module in api module", () => {
    expect(backendApi).toHaveProperty("users");
    expect(backendApi.users).toBe(users);
  });
  it("includes quotes module in api module", () => {
    expect(backendApi).toHaveProperty("quotes");
    expect(backendApi.quotes).toBe(quotes);
  });
  it("includes email verifications module in api module", () => {
    expect(backendApi).toHaveProperty("emailVerifications");
    expect(backendApi.emailVerifications).toBe(emailVerifications);
  });
  it("includes user notes module in api module", () => {
    expect(backendApi).toHaveProperty("userNotes");
    expect(backendApi.userNotes).toBe(userNotes);
  });
});
