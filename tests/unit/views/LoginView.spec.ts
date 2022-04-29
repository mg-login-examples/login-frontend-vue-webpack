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

describe("LoginView.vue", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("handles successful user logins", async () => {
    // open login view
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    // mock store login action to return login successful
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockReturnValue(true);
    // enter user email & password
    wrapper
      .find("[data-test='login--user-email-input']")
      .setValue("test@example.com");
    wrapper
      .find("[data-test='login--user-password-input']")
      .setValue("secretpassword");
    // click login
    wrapper.find("[data-test='login--submit-button']").trigger("click");
    await Vue.nextTick();
    // assert router redirected to home page
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("handles failed user logins", async () => {
    // open login view
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    // mock store login action to return login unsuccessful
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockReturnValue(false);
    // enter user email & password
    wrapper
      .find("[data-test='login--user-email-input']")
      .setValue("test@example.com");
    wrapper
      .find("[data-test='login--user-password-input']")
      .setValue("secretpassword");
    // click login
    wrapper.find("[data-test='login--submit-button']").trigger("click");
    await Vue.nextTick();
    // assert router has not redirected to home page
    expect(mockPush).not.toHaveBeenCalled();
  });
});
