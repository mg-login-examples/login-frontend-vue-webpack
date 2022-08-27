jest.mock("@/api/modules/base");
import usersApi from "@/api/modules/users";
import http from "@/api/modules/base";
import {
  fakeUserLogin,
  fakeLoginResponse,
  fakeUser,
  mockAxiosLoginUser,
  mockAxiosAuthenticateUser,
  mockAxiosLogoutUser,
  mockAxiosCreateUser,
  mockAxiosSendEmailWithPasswordResetLink,
} from "../../mocks/user";
import { UserCreate } from "@/models/user-create.model";

const mockedHttpPost = http.post as jest.Mock;

describe("api > modules > users.ts", () => {
  beforeEach(() => {
    mockedHttpPost.mockClear();
  });

  describe("> login()", () => {
    afterEach(() => {
      process.env.VUE_APP_ADD_AUTHORIZATION_HEADER = undefined;
    });

    it("logs in user with username and password", async () => {
      mockedHttpPost.mockImplementation(mockAxiosLoginUser);
      await expect(
        usersApi.login(fakeUserLogin.email, fakeUserLogin.password, false)
      ).resolves.toEqual(fakeUser);
      expect(http.post).toHaveBeenCalledWith(
        "/api/login/",
        expect.anything(),
        expect.anything()
      );
      expect(http.defaults.headers.common["Authorization"]).not.toBe(
        `Bearer ${fakeLoginResponse.access_token}`
      );
    });

    it(`
    stores the access token as an authorization header after login api call
    if environment variable VUE_APP_ADD_AUTHORIZATION_HEADER has value true
    `, async () => {
      process.env.VUE_APP_ADD_AUTHORIZATION_HEADER = "true";
      mockedHttpPost.mockImplementation(mockAxiosLoginUser);
      await expect(
        usersApi.login(fakeUserLogin.email, fakeUserLogin.password, false)
      ).resolves.toEqual(fakeUser);
      expect(http.post).toHaveBeenCalledWith(
        "/api/login/",
        expect.anything(),
        expect.anything()
      );
      expect(http.defaults.headers.common["Authorization"]).toBe(
        `Bearer ${fakeLoginResponse.access_token}`
      );
    });
  });

  it("authenticates user", async () => {
    mockedHttpPost.mockImplementation(mockAxiosAuthenticateUser);
    await expect(usersApi.authenticate()).resolves.toEqual(fakeUser);
    expect(http.post).toHaveBeenCalledWith("/api/authenticate/");
  });

  it("logs out user", async () => {
    mockedHttpPost.mockImplementation(mockAxiosLogoutUser);
    await expect(usersApi.logout()).resolves.toEqual(undefined);
    expect(http.post).toHaveBeenCalledWith("/api/logout/");
  });

  it("creates a user", async () => {
    const userCreate: UserCreate = {
      email: fakeUser.email,
      password: "fakepassword",
    };
    mockedHttpPost.mockImplementation(mockAxiosCreateUser);
    await expect(usersApi.createUser(userCreate)).resolves.toEqual(fakeUser);
    expect(http.post).toHaveBeenCalledWith(`/api/users/`, userCreate);
  });

  it(`
  stores the access token as an authorization header after create user api call
  if environment variable VUE_APP_ADD_AUTHORIZATION_HEADER has value true
  `, async () => {
    process.env.VUE_APP_ADD_AUTHORIZATION_HEADER = "true";
    const userCreate: UserCreate = {
      email: fakeUser.email,
      password: "fakepassword",
    };
    mockedHttpPost.mockImplementation(mockAxiosCreateUser);
    await expect(usersApi.createUser(userCreate)).resolves.toEqual(fakeUser);
    expect(http.post).toHaveBeenCalledWith(`/api/users/`, userCreate);
    expect(http.defaults.headers.common["Authorization"]).toBe(
      `Bearer ${fakeLoginResponse.access_token}`
    );
  });

  it("sends email with password reset link", async () => {
    const email = fakeUser.email;
    mockedHttpPost.mockImplementation(mockAxiosSendEmailWithPasswordResetLink);
    await expect(
      usersApi.sendEmailWithPasswordResetLink(email)
    ).resolves.toEqual(undefined);
    expect(http.post).toHaveBeenCalledWith(
      `/api/password-reset-link/`,
      expect.anything()
    );
    expect((http.post as jest.Mock).mock.calls[0][1]).toEqual({ email });
  });
});
