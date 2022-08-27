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
const mockBackendApiCreateUser = backendApi.users.createUser as jest.Mock;
const mockBackendApiVerifyEmail = backendApi.emailVerifications
  .verifyEmail as jest.Mock;
const mockBackendApiResendEmail = backendApi.emailVerifications
  .resendEmail as jest.Mock;
const mockBackendApiSendEmailWithPasswordResetLink = backendApi.users
  .sendEmailWithPasswordResetLink as jest.Mock;

describe("store > user.ts", () => {
  beforeEach(() => {
    // init test pinia before tests
    setActivePinia(createPinia());
    // clear mocks
    mockBackendApiLogin.mockReset();
    mockBackendApiAuthenticate.mockReset();
    mockBackendApiLogout.mockReset();
    mockErrorsStore.handleError.mockReset();
    mockBackendApiCreateUser.mockReset();
    mockBackendApiVerifyEmail.mockReset();
    mockBackendApiResendEmail.mockReset();
    mockBackendApiSendEmailWithPasswordResetLink.mockReset();
  });

  it("logs in user with email and password", async () => {
    // mock login api to return user
    mockBackendApiLogin.mockReturnValue(fakeUser);
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

  it("creates a new user", async () => {
    // mock create user api to return user
    mockBackendApiCreateUser.mockReturnValue(fakeUser);
    // init user store
    const userStore = useUserStore();
    // invoke store create user action
    const createUserResponse = await userStore.createUser(
      fakeUserLogin.email,
      fakeUserLogin.password
    );
    // assert success return
    expect(createUserResponse).toBe(true);
    // assert api authenticate function called
    expect(mockBackendApiCreateUser).toHaveBeenCalledWith({
      email: fakeUserLogin.email,
      password: fakeUserLogin.password,
    });
    // assert user is locally deleted
    expect(userStore.user).toStrictEqual(fakeUser);
  });

  it("handles user create api error", async () => {
    // mock api error return
    const userCreateError = Error("create user error");
    mockBackendApiCreateUser.mockRejectedValue(userCreateError);
    // init user store
    const userStore = useUserStore();
    // invoke store create user action
    const createUserResponse = await userStore.createUser(
      fakeUserLogin.email,
      fakeUserLogin.password
    );
    // assert failure return
    expect(createUserResponse).toBe(false);
    // assert error handler called with api error
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(userCreateError);
    // assert user is locally deleted
    expect(userStore.user).toBeNull();
  });

  it("verifies email", async () => {
    // mock authenticate api to return user
    mockBackendApiAuthenticate.mockReturnValue(fakeUser);
    // init user store
    const userStore = useUserStore();
    // invoke store verify email action
    const verificationCode = 545344;
    const verifyEmailResponse = await userStore.verifyEmail(verificationCode);
    // assert success return
    expect(verifyEmailResponse).toBe(true);
    // assert api verify email function called
    expect(mockBackendApiVerifyEmail).toHaveBeenCalled();
    // assert api authenticate function called
    expect(mockBackendApiAuthenticate).toHaveBeenCalled();
    // assert user returned
    expect(userStore.user).toStrictEqual(fakeUser);
  });

  it("handles verify email api error", async () => {
    // mock api error return
    const verifyEmailError = Error("verify email error");
    mockBackendApiVerifyEmail.mockRejectedValue(verifyEmailError);
    // init user store
    const userStore = useUserStore();
    // invoke store verify email action
    const verificationCode = 545344;
    const verifyEmailResponse = await userStore.verifyEmail(verificationCode);
    // assert failure return
    expect(verifyEmailResponse).toBe(false);
    // assert error handler called with api error
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(verifyEmailError);
    // assert api authenticate function not called
    expect(mockBackendApiAuthenticate).not.toBeCalled();
    // assert user is locally deleted
    expect(userStore.user).toBeNull();
  });

  it("resends email", async () => {
    // init user store
    const userStore = useUserStore();
    // invoke store resend email action
    const resendEmailResponse = await userStore.resendEmail();
    // assert success return
    expect(resendEmailResponse).toBe(true);
    // assert api resend email function called
    expect(mockBackendApiResendEmail).toHaveBeenCalled();
  });

  it("handles resend email api error", async () => {
    // mock api error return
    const resendEmailError = Error("resend email error");
    mockBackendApiResendEmail.mockRejectedValue(resendEmailError);
    // init user store
    const userStore = useUserStore();
    // invoke store resend email action
    const resendEmailResponse = await userStore.resendEmail();
    // assert failure return
    expect(resendEmailResponse).toBe(false);
    // assert error handler called with api error
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(resendEmailError);
  });

  it("sends email with password reset link", async () => {
    // init test values
    const testEmail = "test@email.com";
    // init user store
    const userStore = useUserStore();
    // invoke store send email with password reset link action
    const sendEmailWithPasswordResetLinkResponse =
      await userStore.sendEmailWithPasswordResetLink(testEmail);
    // assert success return
    expect(sendEmailWithPasswordResetLinkResponse).toBe(true);
    // assert api resend email function called
    expect(mockBackendApiSendEmailWithPasswordResetLink).toHaveBeenCalledWith(
      testEmail
    );
  });

  it("handles send email with password reset link api error", async () => {
    // init test values
    const testEmail = "test@email.com";
    // mock api error return
    const sendEmailWithPasswordResetLinkError = Error(
      "send email with password reset link error"
    );
    mockBackendApiSendEmailWithPasswordResetLink.mockRejectedValue(
      sendEmailWithPasswordResetLinkError
    );
    // init user store
    const userStore = useUserStore();
    // invoke store resend email action
    const sendEmailWithPasswordResetLinkResponse =
      await userStore.sendEmailWithPasswordResetLink(testEmail);
    // assert failure return
    expect(sendEmailWithPasswordResetLinkResponse).toBe(false);
    // assert error handler called with api error
    expect(mockErrorsStore.handleError).toHaveBeenCalledWith(
      sendEmailWithPasswordResetLinkError
    );
  });
});
