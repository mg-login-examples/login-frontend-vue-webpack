jest.mock("@/api/modules/base");
import quotesApi from "@/api/modules/quotes";
import http from "@/api/modules/base";
import { fakeUser } from "../../mocks/user";
import {
  fakeQuotes,
  fakeUserQuotes,
  mockAxiosGetQuotes,
  mockAxiosGetUserQuotes,
} from "../../mocks/quotes";

const mockedHttpGet = http.get as jest.Mock;

describe("api > modules > quotes.ts", () => {
  beforeEach(() => {
    mockedHttpGet.mockClear();
  });

  it("gets quotes", async () => {
    mockedHttpGet.mockImplementation(mockAxiosGetQuotes);
    await expect(quotesApi.getQuotes()).resolves.toEqual(fakeQuotes);
    expect(http.get).toHaveBeenCalledWith(`/api/quotes/`);
  });

  it("gets user quotes by userId", async () => {
    mockedHttpGet.mockImplementation(mockAxiosGetUserQuotes);
    await expect(quotesApi.getUserQuotes(fakeUser.id)).resolves.toEqual(
      fakeUserQuotes
    );
    expect(http.get).toHaveBeenCalledWith(`/api/users/${fakeUser.id}/quotes/`);
  });
});
