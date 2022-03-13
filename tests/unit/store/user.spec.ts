jest.mock("@/store/errors");
jest.mock("@/api/backendApi");

import { setActivePinia, createPinia } from "pinia";

import { useUserStore } from "@/store/user";
import { useErrorsStore } from "@/store/errors";
import backendApi from "@/api/backendApi";
import { fakeUser } from "../mocks/user";

const mockErrorsStore = { handleError: jest.fn() };
(useErrorsStore as unknown as jest.Mock).mockReturnValue(mockErrorsStore);
const mockBackendApiGetUser = backendApi.users.getUser as jest.Mock;

describe("store > user.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockBackendApiGetUser.mockClear();
    mockErrorsStore.handleError.mockClear();
  });

  it("logs in user with id", async () => {
    mockBackendApiGetUser.mockReturnValue(fakeUser);
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    await userStore.login(fakeUser.id);
    expect(mockBackendApiGetUser).toHaveBeenCalledWith(fakeUser.id);
    expect(userStore.user).toStrictEqual(fakeUser);
  });

  it("handles login api error", async () => {
    const loginError = Error("login error");
    mockBackendApiGetUser.mockRejectedValue(loginError);
    const userStore = useUserStore();
    await userStore.login(fakeUser.id);
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(loginError);
    expect(userStore.user).toBeNull();
  });
});
