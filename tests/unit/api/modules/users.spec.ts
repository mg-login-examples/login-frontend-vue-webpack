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

describe("Api module: Users", () => {
  beforeEach(() => {
    mockedHttpPost.mockClear();
  });

  it("login user with username and password", async () => {
    mockedHttpPost.mockImplementation(mockAxiosLoginUser);
    await expect(
      usersApi.login(fakeUserLogin.email, fakeUserLogin.password)
    ).resolves.toEqual(fakeLoginResponse);
    expect(http.post).toHaveBeenCalledWith(
      "/api/login/",
      expect.anything(),
      expect.anything()
    );
  });

  it("authenticate user", async () => {
    mockedHttpPost.mockImplementation(mockAxiosAuthenticateUser);
    await expect(usersApi.authenticate()).resolves.toEqual(fakeUser);
    expect(http.post).toHaveBeenCalledWith("/api/authenticate/");
  });
});
