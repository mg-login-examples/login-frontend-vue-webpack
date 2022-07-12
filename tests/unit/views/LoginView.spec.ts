import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/store/user";

const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const selectors = {
  usernameInputSelector: "[data-test='login--user-email-input']",
  passwordInputSelector: "[data-test='login--user-password-input']",
  showPasswordButtonSelector: "[data-test='login--show-password-button']",
  showPasswordIconSelector:
    "[data-test='login--show-password-button'] font-awesome-icon-stub",
  rememberMeCheckboxSelector: "[data-test='login--remember-me-checkbox']",
  submitButtonSelector: "[data-test='login--submit-button']",
};

describe("LoginView.vue", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("handles successful user logins", async () => {
    // init test values
    const userEmail = "test@example.com";
    const userPassword = "secretpassword";
    // open login view
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // mock store login action to return login successful
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockReturnValue(true);
    // enter user email
    wrapper.find(selectors.usernameInputSelector).setValue(userEmail);
    expect(
      (
        wrapper.find(selectors.usernameInputSelector)
          .element as HTMLInputElement
      ).value
    ).toBe(userEmail);
    // enter user password
    wrapper.find(selectors.passwordInputSelector).setValue(userPassword);
    expect(
      (
        wrapper.find(selectors.passwordInputSelector)
          .element as HTMLInputElement
      ).value
    ).toBe(userPassword);
    // assert remember me is false by default
    expect(
      (
        wrapper.find(selectors.rememberMeCheckboxSelector)
          .element as HTMLInputElement
      ).checked
    ).toBe(false);
    // set remember me to true
    wrapper.find(selectors.rememberMeCheckboxSelector).setValue(true);
    expect(
      (
        wrapper.find(selectors.rememberMeCheckboxSelector)
          .element as HTMLInputElement
      ).checked
    ).toBe(true);
    // click login
    wrapper.find(selectors.submitButtonSelector).trigger("click");
    await Vue.nextTick();
    // assert user store login function called
    expect(userStore.login).toBeCalledWith(userEmail, userPassword, true);
    // assert router redirected to home page
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("handles failed user logins", async () => {
    // init test values
    const userEmail = "test@example.com";
    const userPassword = "secretpassword";
    // open login view
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // mock store login action to return login unsuccessful
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockReturnValue(false);
    // enter user email
    wrapper.find(selectors.usernameInputSelector).setValue(userEmail);
    expect(
      (
        wrapper.find(selectors.usernameInputSelector)
          .element as HTMLInputElement
      ).value
    ).toBe(userEmail);
    // enter user password
    wrapper.find(selectors.passwordInputSelector).setValue(userPassword);
    expect(
      (
        wrapper.find(selectors.passwordInputSelector)
          .element as HTMLInputElement
      ).value
    ).toBe(userPassword);
    // click login
    wrapper.find(selectors.submitButtonSelector).trigger("click");
    await Vue.nextTick();
    // assert user store login function called
    expect(userStore.login).toBeCalledWith(userEmail, userPassword, false);
    // assert router has not redirected to home page
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("allows setting password input to show/hide text", async () => {
    const userPassword = "secretpassword";
    // open login view
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // enter password
    wrapper.find(selectors.passwordInputSelector).setValue(userPassword);
    expect(
      (
        wrapper.find(selectors.passwordInputSelector)
          .element as HTMLInputElement
      ).value
    ).toBe(userPassword);
    // assert password not visible by default
    expect(
      wrapper.find(selectors.passwordInputSelector).attributes("type")
    ).toBe("password");
    expect(
      wrapper.find(selectors.showPasswordIconSelector).attributes("icon")
    ).toBe("eye");
    // show password
    wrapper.find(selectors.showPasswordButtonSelector).trigger("click");
    await Vue.nextTick();
    // assert password visible
    expect(
      wrapper.find(selectors.passwordInputSelector).attributes("type")
    ).toBe("text");
    expect(
      wrapper.find(selectors.showPasswordIconSelector).attributes("icon")
    ).toBe("eye-slash");
  });
});
