jest.mock("@/api/modules/base");
import usersApi from "@/api/modules/users";
import http from "@/api/modules/base";
import { fakeUser, mockAxiosGetUser } from "../../mocks/user";

const mockedHttpGet = http.get as jest.Mock;

describe("Api module: Users", () => {
  beforeEach(() => {
    mockedHttpGet.mockClear();
  });

  it("gets user by userId", async () => {
    mockedHttpGet.mockImplementation(mockAxiosGetUser);
    await expect(usersApi.getUser(fakeUser.id)).resolves.toEqual(fakeUser);
    expect(http.get).toHaveBeenCalledWith(`/api/users/${fakeUser.id}`);
  });
});
