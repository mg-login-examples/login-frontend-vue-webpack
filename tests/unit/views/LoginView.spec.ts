import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/store/user";
import { fakeUser } from "../mocks/user";

const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const selectors = {
  usernameInput: "[data-test='login--user-email-input']",
  passwordInput: "[data-test='login--user-password-input']",
  showPasswordButton: "[data-test='login--show-password-button']",
  showPasswordIcon:
    "[data-test='login--show-password-button'] font-awesome-icon-stub",
  rememberMeCheckbox: "[data-test='login--remember-me-checkbox']",
  submitButton: "[data-test='login--submit-button']",
};

describe("views > LoginView.vue", () => {
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
    // mock store login action to return login successful for an unverified user
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockImplementation(() => {
      userStore.user = { ...fakeUser, is_verified: true };
      return true;
    });
    // enter user email
    wrapper.find(selectors.usernameInput).setValue(userEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(userEmail);
    // enter user password
    wrapper.find(selectors.passwordInput).setValue(userPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(userPassword);
    // assert remember me is false by default
    expect(
      (wrapper.find(selectors.rememberMeCheckbox).element as HTMLInputElement)
        .checked
    ).toBe(false);
    // set remember me to true
    wrapper.find(selectors.rememberMeCheckbox).setValue(true);
    expect(
      (wrapper.find(selectors.rememberMeCheckbox).element as HTMLInputElement)
        .checked
    ).toBe(true);
    // click login
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store login function called
    expect(userStore.login).toBeCalledWith(userEmail, userPassword, true);
    // assert router redirected to home page
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("opens email verification page on successful user logins if user is not verified", async () => {
    // init test values
    const userEmail = "test@example.com";
    const userPassword = "secretpassword";
    // set prop user requested route to simulate router passing this value
    const user_requested_route_before = "/my-quotes";
    // open login view
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
      props: { user_requested_route: user_requested_route_before },
    });
    // mock store login action to return login successful for an unverified user
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockImplementation(() => {
      userStore.user = { ...fakeUser, is_verified: false };
      return true;
    });
    // enter user email
    wrapper.find(selectors.usernameInput).setValue(userEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(userEmail);
    // enter user password
    wrapper.find(selectors.passwordInput).setValue(userPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(userPassword);
    // click login
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store login function called
    expect(userStore.login).toBeCalledWith(userEmail, userPassword, false);
    // assert router redirected to user requested route
    expect(mockPush).toHaveBeenCalledWith("/verify-email");
  });

  it("opens user requested route on successful user logins if redirected to login", async () => {
    // init test values
    const userEmail = "test@example.com";
    const userPassword = "secretpassword";
    // set prop user requested route to simulate router passing this value
    const user_requested_route_before = "/my-quotes";
    // open login view
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
      props: { user_requested_route: user_requested_route_before },
    });
    // mock store login action to return login successful for an verified user
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockImplementation(() => {
      userStore.user = { ...fakeUser, is_verified: true };
      return true;
    });
    // enter user email
    wrapper.find(selectors.usernameInput).setValue(userEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(userEmail);
    // enter user password
    wrapper.find(selectors.passwordInput).setValue(userPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(userPassword);
    // click login
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store login function called
    expect(userStore.login).toBeCalledWith(userEmail, userPassword, false);
    // assert router redirected to user requested route
    expect(mockPush).toHaveBeenCalledWith(user_requested_route_before);
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
    wrapper.find(selectors.usernameInput).setValue(userEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(userEmail);
    // enter user password
    wrapper.find(selectors.passwordInput).setValue(userPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(userPassword);
    // click login
    wrapper.find(selectors.submitButton).trigger("click");
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
    wrapper.find(selectors.passwordInput).setValue(userPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(userPassword);
    // assert password not visible by default
    expect(wrapper.find(selectors.passwordInput).attributes("type")).toBe(
      "password"
    );
    expect(wrapper.find(selectors.showPasswordIcon).attributes("icon")).toBe(
      "eye"
    );
    // show password
    wrapper.find(selectors.showPasswordButton).trigger("click");
    await Vue.nextTick();
    // assert password visible
    expect(wrapper.find(selectors.passwordInput).attributes("type")).toBe(
      "text"
    );
    expect(wrapper.find(selectors.showPasswordIcon).attributes("icon")).toBe(
      "eye-slash"
    );
  });
});
