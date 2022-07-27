jest.mock("@/store/errors");
jest.mock("@/api/backendApi");

import { setActivePinia, createPinia } from "pinia";

import { useUserStore } from "@/store/user";
import { useErrorsStore } from "@/store/errors";
import backendApi from "@/api/backendApi";
import { fakeUser, fakeUserLogin } from "../mocks/user";

const mockErrorsStore = { handleError: jest.fn() };
(useErrorsStore as unknown as jest.Mock).mockReturnValue(mockErrorsStore);
const mockBackendApiLogin = backendApi.users.login as jest.Mock;
const mockBackendApiAuthenticate = backendApi.users.authenticate as jest.Mock;
const mockBackendApiLogout = backendApi.users.logout as jest.Mock;

describe("store > user.ts", () => {
  beforeEach(() => {
    // init test pinia before tests
    setActivePinia(createPinia());
    // clear mocks
    mockBackendApiLogin.mockReset();
    mockBackendApiAuthenticate.mockReset();
    mockBackendApiLogout.mockReset();
    mockErrorsStore.handleError.mockReset();
  });

  it("logs in user with id", async () => {
    // mock login api to return user
    mockBackendApiAuthenticate.mockReturnValue(fakeUser);
    // init user store
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    // invoke store login action
    const loginResponse = await userStore.login(
      fakeUserLogin.email,
      fakeUserLogin.password,
      false
    );
    // assert success return
    expect(loginResponse).toBe(true);
    // assert api login function called
    expect(mockBackendApiLogin).toHaveBeenCalledWith(
      fakeUserLogin.email,
      fakeUserLogin.password,
      false
    );
    // assert api authenticate function called
    expect(mockBackendApiLogin).toHaveBeenCalledWith(
      fakeUserLogin.email,
      fakeUserLogin.password,
      false
    );
    // assert user returned
    expect(userStore.user).toStrictEqual(fakeUser);
  });

  it("handles login api error", async () => {
    // mock api error return
    const loginError = Error("login error");
    mockBackendApiLogin.mockRejectedValue(loginError);
    // init user store
    const userStore = useUserStore();
    // invoke store login action
    const loginResponse = await userStore.login(
      fakeUserLogin.email,
      fakeUserLogin.password,
      false
    );
    // assert failure return
    expect(loginResponse).toBe(false);
    // assert error handler called with api error
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(loginError);
    // assert user is null
    expect(userStore.user).toBeNull();
  });

  it("handles authenticate api error", async () => {
    // mock api error return
    const authenticateError = Error("authentication error");
    mockBackendApiAuthenticate.mockRejectedValue(authenticateError);
    // init user store
    const userStore = useUserStore();
    // invoke store login action
    const loginResponse = await userStore.login(
      fakeUserLogin.email,
      fakeUserLogin.password,
      false
    );
    // assert failure return
    expect(loginResponse).toBe(false);
    // assert error handler called with api error
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(authenticateError);
    // assert user is null
    expect(userStore.user).toBeNull();
  });

  it("authenticates user", async () => {
    // mock authenticate api to return user
    mockBackendApiAuthenticate.mockReturnValue(fakeUser);
    // init user store
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    // invoke store login action
    const authenticateResponse = await userStore.authenticate();
    // assert success return
    expect(authenticateResponse).toBe(true);
    // assert api authenticate function called
    expect(mockBackendApiAuthenticate).toHaveBeenCalled();
    // assert user returned
    expect(userStore.user).toStrictEqual(fakeUser);
  });

  it("handles authentication api error", async () => {
    // mock api error return
    const authenticateError = Error("authentication error");
    mockBackendApiAuthenticate.mockRejectedValue(authenticateError);
    // init user store
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    // invoke store login action
    const authenticateResponse = await userStore.authenticate();
    // assert failure return
    expect(authenticateResponse).toBe(false);
    // assert error handler not called with api error
    expect(mockErrorsStore.handleError).not.toHaveBeenCalledWith();
    // assert user is null
    expect(userStore.user).toBeNull();
  });

  it("logs out user", async () => {
    // init user store
    const userStore = useUserStore();
    // simulate logged in user
    userStore.user = fakeUser;
    // invoke store login action
    const logoutResponse = await userStore.logout();
    // assert success return
    expect(logoutResponse).toBe(true);
    // assert api authenticate function called
    expect(mockBackendApiLogout).toHaveBeenCalled();
    // assert user is locally deleted
    expect(userStore.user).toBeNull();
  });

  it("handles logout api error", async () => {
    // mock api error return
    const logoutError = Error("logout error");
    mockBackendApiLogout.mockRejectedValue(logoutError);
    // init user store
    const userStore = useUserStore();
    // simulate logged in user
    userStore.user = fakeUser;
    // invoke store login action
    const logoutResponse = await userStore.logout();
    // assert failure return
    expect(logoutResponse).toBe(false);
    // assert error handler called with api error
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(logoutError);
    // assert user is locally deleted
    expect(userStore.user).toBeNull();
  });
});
