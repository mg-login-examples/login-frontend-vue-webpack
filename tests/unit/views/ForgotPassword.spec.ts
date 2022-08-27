import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import ForgotPassword from "@/views/ForgotPassword.vue";
import { useUserStore } from "@/store/user";

const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const selectors = {
  usernameInput: "[data-test='forgot-password--user-email-input']",
  submitButton: "[data-test='forgot-password--submit-button']",
  loginButton: "[data-test='forgot-password--login-button']",
};

describe("views > ForgotPassword.vue", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("handles successful sending of email with password reset link", async () => {
    // init test values
    const userEmail = "test@example.com";
    // open forgot password view
    const wrapper = mount(ForgotPassword, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // mock store signup action to return signup successful
    const userStore = useUserStore();
    (userStore.sendEmailWithPasswordResetLink as jest.Mock).mockReturnValue(
      true
    );
    // enter user email
    wrapper.find(selectors.usernameInput).setValue(userEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(userEmail);
    // wait for submit button to be enabled
    await Vue.nextTick();
    // click signup
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store signup function called
    expect(userStore.sendEmailWithPasswordResetLink).toBeCalledWith(userEmail);
    // wait for vue to change
    await Vue.nextTick();
    // assert email and submit buttons no longer visible
    expect(wrapper.find(selectors.usernameInput).exists()).toBe(false);
    expect(wrapper.find(selectors.submitButton).exists()).toBe(false);
    // assert login button is visible
    expect(wrapper.find(selectors.loginButton).isVisible()).toBe(true);
  });

  it("handles failed sending of email with password reset link", async () => {
    // init test values
    const userEmail = "test@example.com";
    // open forgot password view
    const wrapper = mount(ForgotPassword, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // mock store signup action to return signup successful
    const userStore = useUserStore();
    (userStore.sendEmailWithPasswordResetLink as jest.Mock).mockReturnValue(
      false
    );
    // enter user email
    wrapper.find(selectors.usernameInput).setValue(userEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(userEmail);
    // wait for submit button to be enabled
    await Vue.nextTick();
    // click signup
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store signup function called
    expect(userStore.sendEmailWithPasswordResetLink).toBeCalledWith(userEmail);
    // assert email and submit buttons are still visible
    expect(wrapper.find(selectors.usernameInput).exists()).toBe(true);
    expect(wrapper.find(selectors.submitButton).exists()).toBe(true);
    // assert login button is not visible
    expect(wrapper.find(selectors.loginButton).exists()).toBe(false);
  });

  it("disables submit button if the email is not valid:", async () => {
    // init test values
    const validEmail = "valid@email.com";
    const invalidEmail = "invalid_email";
    // open forgot password view
    const wrapper = mount(ForgotPassword, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // assert submit button disabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeDefined();
    // enter valid user email
    wrapper.find(selectors.usernameInput).setValue(validEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(validEmail);
    // wait for submit button to be enabled
    await Vue.nextTick();
    // assert submit button enabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeUndefined();
    // enter invalid email
    wrapper.find(selectors.usernameInput).setValue(invalidEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(invalidEmail);
    await Vue.nextTick();
    // assert submit button disabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeDefined();
  });
});
