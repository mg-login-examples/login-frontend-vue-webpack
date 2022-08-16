jest.mock("@/api/modules/base");
import http from "@/api/modules/base";
import emailVerificationsApi from "@/api/modules/emailVerifications";
import {
  mockAxiosVerifyEmail,
  mockAxiosResendEmail,
} from "../../mocks/emailVerifications";

const mockedHttpPost = http.post as jest.Mock;

describe("api > modules > emailVerifications.ts", () => {
  beforeEach(() => {
    mockedHttpPost.mockClear();
  });

  it("verifies email verification code", async () => {
    const verificationCode = 323132;
    mockedHttpPost.mockImplementation(mockAxiosVerifyEmail);
    await expect(
      emailVerificationsApi.verifyEmail(verificationCode)
    ).resolves.toEqual(undefined);
    expect(http.post).toHaveBeenCalledWith(
      `/api/email-verifications/verify-email/${verificationCode}/`
    );
  });

  it("resends email with verification code", async () => {
    mockedHttpPost.mockImplementation(mockAxiosResendEmail);
    await expect(emailVerificationsApi.resendEmail()).resolves.toEqual(
      undefined
    );
    expect(http.post).toHaveBeenCalledWith(
      `/api/email-verifications/resend-email/`
    );
  });
});
