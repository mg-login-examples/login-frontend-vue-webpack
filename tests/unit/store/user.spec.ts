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

describe("store > user.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockBackendApiLogin.mockClear();
    mockBackendApiAuthenticate.mockClear();
    mockErrorsStore.handleError.mockClear();
  });

  it("logs in user with id", async () => {
    // mock login api to return user
    mockBackendApiAuthenticate.mockReturnValue(fakeUser);
    // init user store
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    // invoke store login action
    await userStore.login(fakeUserLogin.email, fakeUserLogin.password);
    // assert login function called
    expect(mockBackendApiLogin).toHaveBeenCalledWith(
      fakeUserLogin.email,
      fakeUserLogin.password
    );
    // assert authenticate function called
    expect(mockBackendApiLogin).toHaveBeenCalledWith(
      fakeUserLogin.email,
      fakeUserLogin.password
    );
    // assert user returned
    expect(userStore.user).toStrictEqual(fakeUser);
  });

  it("handles login api error", async () => {
    const loginError = Error("login error");
    mockBackendApiLogin.mockRejectedValue(loginError);
    const userStore = useUserStore();
    await userStore.login(fakeUserLogin.email, fakeUserLogin.password);
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(loginError);
    expect(userStore.user).toBeNull();
  });

  it("handles authenticate api error", async () => {
    const authenticateError = Error("authentication error");
    mockBackendApiLogin.mockRejectedValue(authenticateError);
    const userStore = useUserStore();
    await userStore.login(fakeUserLogin.email, fakeUserLogin.password);
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(authenticateError);
    expect(userStore.user).toBeNull();
  });
});
