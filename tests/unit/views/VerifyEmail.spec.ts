import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import VerifyEmail from "@/views/VerifyEmail.vue";
import { useUserStore } from "@/store/user";
import { fakeUser } from "../mocks/user";

const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const selectors = {
  userVerified: "[data-test='email-verification--user-verified']",
  userUnverified: "[data-test='email-verification--user-unverified']",
  verificationCodeInput: "[data-test='email-verification--code-input']",
  submitButton: "[data-test='email-verification--submit-button']",
  resendEmailButton: "[data-test='email-verification--resend-email']",
  resendEmailWaitTime:
    "[data-test='email-verification--resend-email-wait-time']",
};

describe("views > VerifyEmail.vue", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("handles successful email verification", async () => {
    // init test values
    const verificationCode = 315232;
    // init user store and login user
    const testPinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.user = { ...fakeUser, is_verified: false };
    // mock store verify email action to return email verification successful
    userStore.verifyEmail = jest.fn();
    (userStore.verifyEmail as jest.Mock).mockReturnValue(true);
    // open email verify view
    const wrapper = mount(VerifyEmail, {
      global: {
        plugins: [testPinia],
      },
    });
    // enter email verification code
    wrapper.find(selectors.verificationCodeInput).setValue(verificationCode);
    expect(
      (
        wrapper.find(selectors.verificationCodeInput)
          .element as HTMLInputElement
      ).value
    ).toBe(verificationCode.toString());
    // wait for submit button to be enabled
    await Vue.nextTick();
    // click submit button
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store verify email function called
    expect(userStore.verifyEmail).toBeCalledWith(verificationCode);
    // assert router redirected to home page
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("handles failed email verification", async () => {
    // init test values
    const verificationCode = 315232;
    // init user store and login user
    const testPinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.user = { ...fakeUser, is_verified: false };
    // mock store verify email action to return email verification failed
    userStore.verifyEmail = jest.fn();
    (userStore.verifyEmail as jest.Mock).mockReturnValue(false);
    // open email verify view
    const wrapper = mount(VerifyEmail, {
      global: {
        plugins: [testPinia],
      },
    });
    // enter email verification code
    wrapper.find(selectors.verificationCodeInput).setValue(verificationCode);
    expect(
      (
        wrapper.find(selectors.verificationCodeInput)
          .element as HTMLInputElement
      ).value
    ).toBe(verificationCode.toString());
    // wait for submit button to be enabled
    await Vue.nextTick();
    // click submit button
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store verify email function called
    expect(userStore.verifyEmail).toBeCalledWith(verificationCode);
    // assert router has not redirected to home page
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("disables submit button if entered verification code is not a 6 digit number", async () => {
    // init test values
    const validCode = 315232;
    const invalidCodes = [13, 13444234, "abcdef"];
    // init user store and login user
    const testPinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.user = { ...fakeUser, is_verified: false };
    // open verify email view
    const wrapper = mount(VerifyEmail, {
      global: {
        plugins: [testPinia],
      },
    });
    // assert submit button disabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeDefined();
    // enter valid code
    wrapper.find(selectors.verificationCodeInput).setValue(validCode);
    expect(
      (
        wrapper.find(selectors.verificationCodeInput)
          .element as HTMLInputElement
      ).value
    ).toBe(validCode.toString());
    await Vue.nextTick();
    // assert submit button enabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeUndefined();
    for (const invalidCode in invalidCodes) {
      // enter invalid code
      wrapper.find(selectors.verificationCodeInput).setValue(invalidCode);
      expect(
        (
          wrapper.find(selectors.verificationCodeInput)
            .element as HTMLInputElement
        ).value
      ).toBe(invalidCode.toString());
      await Vue.nextTick();
      // assert submit button disabled
      expect(
        wrapper.find(selectors.submitButton).attributes("disabled")
      ).toBeDefined();
    }
    // enter valid code
    wrapper.find(selectors.verificationCodeInput).setValue(validCode);
    expect(
      (
        wrapper.find(selectors.verificationCodeInput)
          .element as HTMLInputElement
      ).value
    ).toBe(validCode.toString());
    await Vue.nextTick();
    // assert submit button enabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeUndefined();
  });

  it("displays email verified if user is verified", () => {
    // init user store and login user
    const testPinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.user = { ...fakeUser, is_verified: true };
    // open verify email view
    const wrapper = mount(VerifyEmail, {
      global: {
        plugins: [testPinia],
      },
    });
    expect(wrapper.find(selectors.userVerified).isVisible()).toBe(true);
  });

  it("resends email when resend email button is clicked", async () => {
    // init user store and login user
    const testPinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.user = { ...fakeUser, is_verified: false };
    // mock store resend email action
    userStore.resendEmail = jest.fn();
    (userStore.resendEmail as jest.Mock).mockReturnValue(true);
    // open email verify view
    const wrapper = mount(VerifyEmail, {
      global: {
        plugins: [testPinia],
      },
    });
    // reset counter to enable resend email button
    wrapper.vm.resendWaitTime = 0;
    await Vue.nextTick();
    // assert resend button is enabled
    expect(
      wrapper.find(selectors.resendEmailButton).attributes("disabled")
    ).toBeUndefined();
    // resend email
    wrapper.find(selectors.resendEmailButton).trigger("click");
    await Vue.nextTick();
    // assert store resend email function was called
    expect(userStore.resendEmail).toBeCalled();
    // wait for countdown to reset
    await Vue.nextTick();
    // assert countdown is visible
    expect(wrapper.find(selectors.resendEmailWaitTime).isVisible()).toBe(true);
  });

  it("handles error when resend email fails", async () => {
    // init user store and login user
    const testPinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.user = { ...fakeUser, is_verified: false };
    // mock store resend email action to return fail response
    userStore.resendEmail = jest.fn();
    (userStore.resendEmail as jest.Mock).mockReturnValue(false);
    // open email verify view
    const wrapper = mount(VerifyEmail, {
      global: {
        plugins: [testPinia],
      },
    });
    // reset counter to enable resend email button
    wrapper.vm.resendWaitTime = 0;
    await Vue.nextTick();
    // assert resend button is enabled
    expect(
      wrapper.find(selectors.resendEmailButton).attributes("disabled")
    ).toBeUndefined();
    // resend email
    wrapper.find(selectors.resendEmailButton).trigger("click");
    await Vue.nextTick();
    // assert store resend email function was called
    expect(userStore.resendEmail).toBeCalled();
    // assert countdown not visible
    expect(wrapper.find(selectors.resendEmailWaitTime).exists()).toBe(false);
  });

  it("disables resend button during countdown, and resets countdown after resend email button is clicked", async () => {
    // init user store and login user
    const testPinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.user = { ...fakeUser, is_verified: false };
    // mock store resend email action
    userStore.resendEmail = jest.fn();
    (userStore.resendEmail as jest.Mock).mockReturnValue(true);
    // open email verify view
    const wrapper = mount(VerifyEmail, {
      global: {
        plugins: [testPinia],
      },
    });
    // assert resend button is disabled
    expect(
      wrapper.find(selectors.resendEmailButton).attributes("disabled")
    ).toBeDefined();
    // assert initial countdown time is 30 sec
    expect(wrapper.find(selectors.resendEmailWaitTime).text()).toBe("30");
    // wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // assert countdown reduced by 2 seconds
    expect(wrapper.find(selectors.resendEmailWaitTime).text()).toBe("28");
    // reset counter to 2 seconds to quicken countdown end
    wrapper.vm.resendWaitTime = 2;
    // wait for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // assert resend button is enabled
    expect(
      wrapper.find(selectors.resendEmailButton).attributes("disabled")
    ).toBeUndefined();
    // assert countdown not visible
    expect(wrapper.find(selectors.resendEmailWaitTime).exists()).toBe(false);
    // resend email
    wrapper.find(selectors.resendEmailButton).trigger("click");
    await Vue.nextTick();
    // assert store resend email function was called
    expect(userStore.resendEmail).toBeCalled();
    // wait for coundown to reset
    await Vue.nextTick();
    // assert countdown reset to 30 sec
    expect(wrapper.find(selectors.resendEmailWaitTime).text()).toBe("30");
    // assert resend button is disabled
    expect(
      wrapper.find(selectors.resendEmailButton).attributes("disabled")
    ).toBeDefined();
  }, 10000);
});
