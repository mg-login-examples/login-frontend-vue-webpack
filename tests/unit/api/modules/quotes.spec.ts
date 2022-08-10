jest.mock("@/api/modules/base");
import quotesApi from "@/api/modules/quotes";
import http from "@/api/modules/base";
import { fakeUser } from "../../mocks/user";
import {
  fakeQuote,
  fakeQuotes,
  fakeUserQuotes,
  mockAxiosGetQuotes,
  mockAxiosGetUserQuotes,
  mockAxiosPostUserQuote,
  mockAxiosPutUserQuote,
  mockAxiosDeleteUserQuote,
  mockAxiosLikeQuote,
  mockAxiosUnlikeQuote,
} from "../../mocks/quotes";
import { QuoteCreate } from "@/models/quote-create.model";
import { Quote } from "@/models/quote.model";

const mockedHttpGet = http.get as jest.Mock;
const mockedHttpPost = http.post as jest.Mock;
const mockedHttpPut = http.put as jest.Mock;
const mockedHttpDelete = http.delete as jest.Mock;

describe("api > modules > quotes.ts", () => {
  beforeEach(() => {
    mockedHttpGet.mockClear();
  });

  it("gets quotes", async () => {
    // call get quotes with no params
    const defaultSkip = 0;
    const defaultLimit = 40;
    mockedHttpGet.mockImplementation(mockAxiosGetQuotes);
    await expect(quotesApi.getQuotes()).resolves.toEqual(fakeQuotes);
    expect(http.get).toHaveBeenCalledWith(
      `/api/quotes/?skip=${defaultSkip}&limit=${defaultLimit}`
    );
    // call get quotes with only skip param
    const skipParam = 2;
    await expect(quotesApi.getQuotes({ skip: skipParam })).resolves.toEqual(
      fakeQuotes
    );
    expect(http.get).toHaveBeenCalledWith(
      `/api/quotes/?skip=${skipParam}&limit=${defaultLimit}`
    );
    // call get quotes with both skip and limit params
    const limitParam = 77;
    await expect(
      quotesApi.getQuotes({ skip: skipParam, limit: limitParam })
    ).resolves.toEqual(fakeQuotes);
    expect(http.get).toHaveBeenCalledWith(
      `/api/quotes/?skip=${skipParam}&limit=${limitParam}`
    );
  });

  it("gets user quotes by userId", async () => {
    mockedHttpGet.mockImplementation(mockAxiosGetUserQuotes);
    await expect(quotesApi.getUserQuotes(fakeUser.id)).resolves.toEqual(
      fakeUserQuotes
    );
    expect(http.get).toHaveBeenCalledWith(`/api/users/${fakeUser.id}/quotes/`);
  });

  it("creates a user quote", async () => {
    const quoteCreate: QuoteCreate = {
      text: fakeQuote.text,
      author: fakeQuote.author,
    };
    mockedHttpPost.mockImplementation(mockAxiosPostUserQuote);
    await expect(quotesApi.createQuote(quoteCreate)).resolves.toEqual(
      fakeQuote
    );
    expect(http.post).toHaveBeenCalledWith(`/api/quotes/`, quoteCreate);
  });

  it("edits a user quote", async () => {
    const quoteEdit: Quote = {
      id: fakeQuote.id,
      text: fakeQuote.text,
      author: fakeQuote.author,
      liked_by_users: [],
    };
    mockedHttpPut.mockImplementation(mockAxiosPutUserQuote);
    await expect(quotesApi.editQuote(quoteEdit)).resolves.toEqual(undefined);
    expect(http.put).toHaveBeenCalledWith(
      `/api/quotes/${fakeQuote.id}`,
      quoteEdit
    );
  });

  it("deletes a user quote", async () => {
    mockedHttpDelete.mockImplementation(mockAxiosDeleteUserQuote);
    await expect(quotesApi.deleteQuote(fakeQuote.id)).resolves.toEqual(
      undefined
    );
    expect(http.delete).toHaveBeenCalledWith(`/api/quotes/${fakeQuote.id}/`);
  });

  it("likes a user quote", async () => {
    const userId = 22;
    const quoteId = 33;
    mockedHttpPut.mockImplementation(mockAxiosLikeQuote);
    await expect(quotesApi.likeQuote(quoteId, userId)).resolves.toEqual(
      undefined
    );
    expect(http.put).toHaveBeenCalledWith(
      `/api/quotes/${quoteId}/users/${userId}/like/`
    );
  });

  it("unlikes a user quote", async () => {
    const userId = 22;
    const quoteId = 33;
    mockedHttpDelete.mockImplementation(mockAxiosUnlikeQuote);
    await expect(quotesApi.unlikeQuote(quoteId, userId)).resolves.toEqual(
      undefined
    );
    expect(http.delete).toHaveBeenCalledWith(
      `/api/quotes/${quoteId}/users/${userId}/like/`
    );
  });
});
