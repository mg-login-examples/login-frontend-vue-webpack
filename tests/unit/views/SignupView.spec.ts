import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import SignupView from "@/views/SignupView.vue";
import { useUserStore } from "@/store/user";

const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const selectors = {
  usernameInput: "[data-test='signup--user-email-input']",
  passwordInput: "[data-test='signup--user-password-input']",
  showPasswordButton: "[data-test='signup--show-password-button']",
  showPasswordIcon:
    "[data-test='signup--show-password-button'] font-awesome-icon-stub",
  confirmPasswordInput: "[data-test='signup--user-confirm-password-input']",
  submitButton: "[data-test='signup--submit-button']",
};

describe("views > Signup.vue", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("handles successful user signup", async () => {
    // init test values
    const userEmail = "test@example.com";
    const userPassword = "secretpassword";
    // open signup view
    const wrapper = mount(SignupView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // mock store signup action to return signup successful
    const userStore = useUserStore();
    (userStore.createUser as jest.Mock).mockReturnValue(true);
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
    // enter confirm user password
    wrapper.find(selectors.confirmPasswordInput).setValue(userPassword);
    expect(
      (wrapper.find(selectors.confirmPasswordInput).element as HTMLInputElement)
        .value
    ).toBe(userPassword);
    // wait for submit button to be enabled
    await Vue.nextTick();
    // click signup
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store signup function called
    expect(userStore.createUser).toBeCalledWith(userEmail, userPassword);
    // assert router redirected to home page
    expect(mockPush).toHaveBeenCalledWith({ name: "verifyEmail" });
  });

  it("handles failed user signup", async () => {
    // init test values
    const userEmail = "test@example.com";
    const userPassword = "secretpassword";
    // open signup view
    const wrapper = mount(SignupView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // mock store signup action to return signup unsuccessful
    const userStore = useUserStore();
    (userStore.createUser as jest.Mock).mockReturnValue(false);
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
    // enter confir user password
    wrapper.find(selectors.confirmPasswordInput).setValue(userPassword);
    expect(
      (wrapper.find(selectors.confirmPasswordInput).element as HTMLInputElement)
        .value
    ).toBe(userPassword);
    // wait for submit button to be enabled
    await Vue.nextTick();
    // click signup
    wrapper.find(selectors.submitButton).trigger("click");
    await Vue.nextTick();
    // assert user store signup function called
    expect(userStore.createUser).toBeCalledWith(userEmail, userPassword);
    // assert router has not redirected to home page
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("allows setting password input to show/hide text", async () => {
    const userPassword = "secretpassword";
    // open signup view
    const wrapper = mount(SignupView, {
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
    // enter confirm password
    wrapper.find(selectors.confirmPasswordInput).setValue(userPassword);
    expect(
      (wrapper.find(selectors.confirmPasswordInput).element as HTMLInputElement)
        .value
    ).toBe(userPassword);
    // assert password not visible by default
    expect(wrapper.find(selectors.passwordInput).attributes("type")).toBe(
      "password"
    );
    expect(wrapper.find(selectors.showPasswordIcon).attributes("icon")).toBe(
      "eye"
    );
    // assert confirm password not visible by default
    expect(
      wrapper.find(selectors.confirmPasswordInput).attributes("type")
    ).toBe("password");
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
    // assert confirm password visible
    expect(
      wrapper.find(selectors.confirmPasswordInput).attributes("type")
    ).toBe("text");
  });

  it(`
  disables submit button if any of the 3 conditions fail:
    1. email is not valid 2. password is too short 3. entered password different from entered confirm password
  `, async () => {
    // init test values
    const validEmail = "valid@email.com";
    const invalidEmail = "invalid_email";
    const validPassword = "validpassword";
    const invalidPassword = "invalid";
    const differentValidPassword = "differentPassword";

    // open signup view
    const wrapper = mount(SignupView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: { FontAwesomeIcon: true },
      },
    });
    // assert submit button disabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeDefined();
    // enter user email
    wrapper.find(selectors.usernameInput).setValue(validEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(validEmail);
    // enter user password
    wrapper.find(selectors.passwordInput).setValue(validPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(validPassword);
    // enter confirm user password
    wrapper.find(selectors.confirmPasswordInput).setValue(validPassword);
    expect(
      (wrapper.find(selectors.confirmPasswordInput).element as HTMLInputElement)
        .value
    ).toBe(validPassword);
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
    // enter valid email
    wrapper.find(selectors.usernameInput).setValue(validEmail);
    expect(
      (wrapper.find(selectors.usernameInput).element as HTMLInputElement).value
    ).toBe(validEmail);
    await Vue.nextTick();
    // assert submit button enabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeUndefined();
    // enter different password from the one entered in confirm password
    wrapper.find(selectors.passwordInput).setValue(differentValidPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(differentValidPassword);
    await Vue.nextTick();
    // assert submit button disabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeDefined();
    // enter new password in confirm password
    wrapper
      .find(selectors.confirmPasswordInput)
      .setValue(differentValidPassword);
    expect(
      (wrapper.find(selectors.confirmPasswordInput).element as HTMLInputElement)
        .value
    ).toBe(differentValidPassword);
    await Vue.nextTick();
    // assert submit button enabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeUndefined();
    // enter invalid password in both password inputs
    wrapper.find(selectors.passwordInput).setValue(invalidPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(invalidPassword);
    wrapper.find(selectors.confirmPasswordInput).setValue(invalidPassword);
    expect(
      (wrapper.find(selectors.confirmPasswordInput).element as HTMLInputElement)
        .value
    ).toBe(invalidPassword);
    await Vue.nextTick();
    // assert submit button disabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeDefined();
    // enter valid password in both password inputs
    wrapper.find(selectors.passwordInput).setValue(validPassword);
    expect(
      (wrapper.find(selectors.passwordInput).element as HTMLInputElement).value
    ).toBe(validPassword);
    wrapper.find(selectors.confirmPasswordInput).setValue(validPassword);
    expect(
      (wrapper.find(selectors.confirmPasswordInput).element as HTMLInputElement)
        .value
    ).toBe(validPassword);
    await Vue.nextTick();
    // assert submit button enabled
    expect(
      wrapper.find(selectors.submitButton).attributes("disabled")
    ).toBeUndefined();
  });
});
