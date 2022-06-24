jest.mock("@/api/modules/base");
import usersApi from "@/api/modules/users";
import http from "@/api/modules/base";
import {
  fakeUserLogin,
  fakeLoginResponse,
  fakeUser,
  mockAxiosLoginUser,
  mockAxiosAuthenticateUser,
} from "../../mocks/user";

const mockedHttpPost = http.post as jest.Mock;

describe("api > modules > users.ts", () => {
  beforeEach(() => {
    mockedHttpPost.mockClear();
  });

  describe("> login()", () => {
    afterEach(() => {
      process.env.VUE_APP_CYPRESS_DOCKER = undefined;
    });

    it("makes an axios api POST call to login endpoint with username and password", async () => {
      mockedHttpPost.mockImplementation(mockAxiosLoginUser);
      await expect(
        usersApi.login(fakeUserLogin.email, fakeUserLogin.password)
      ).resolves.toEqual(fakeLoginResponse);
      expect(http.post).toHaveBeenCalledWith(
        "/api/login/",
        expect.anything(),
        expect.anything()
      );
      expect(http.defaults.headers.common["Authorization"]).not.toBe(
        `Bearer ${fakeLoginResponse.access_token}`
      );
    });

    it("stores the access token as an authorization header after login api call when CYPRESS_DOCKER environment variable is 1", async () => {
      process.env.VUE_APP_CYPRESS_DOCKER = 1;
      mockedHttpPost.mockImplementation(mockAxiosLoginUser);
      await expect(
        usersApi.login(fakeUserLogin.email, fakeUserLogin.password)
      ).resolves.toEqual(fakeLoginResponse);
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
});
