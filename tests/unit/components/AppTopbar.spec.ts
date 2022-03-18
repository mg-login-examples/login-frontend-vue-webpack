import * as Vue from "vue";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/store/user";
import AppTopbar from "@/components/AppTopbar.vue";
import { fakeUser } from "../mocks/user";

const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("AppTopbar.vue", () => {
  it("has All Quotes, My Quotes and Login navlinks", () => {
    const wrapper = mount(AppTopbar, {
      global: {
        stubs: { RouterLink: RouterLinkStub, FontAwesomeIcon: true },
        plugins: [createTestingPinia()],
      },
    });
    // All Quotes navlink
    const allQuotesViewLink = wrapper.find(
      "[data-test='topbar--all-quotes-link']"
    );
    expect(allQuotesViewLink.text()).toMatch("All Quotes");
    expect(allQuotesViewLink.findComponent(RouterLinkStub).props().to).toBe(
      "/"
    );
    // My Quotes navlink
    const myQuotesViewLink = wrapper.find(
      "[data-test='topbar--user-quotes-link']"
    );
    expect(myQuotesViewLink.text()).toMatch("My Quotes");
    expect(myQuotesViewLink.findComponent(RouterLinkStub).props().to).toBe(
      "/my-quotes"
    );
    // Login navlink
    const loginViewLink = wrapper.find("[data-test='topbar--login-link']");
    expect(loginViewLink.text()).toMatch("Login");
    expect(loginViewLink.findComponent(RouterLinkStub).props().to).toBe(
      "/login"
    );
  });

  it("displays Login button only when not logged in", async () => {
    const wrapper = mount(AppTopbar, {
      global: {
        stubs: { RouterLink: RouterLinkStub, FontAwesomeIcon: true },
        plugins: [createTestingPinia()],
      },
    });
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    let loginViewLink = wrapper.find("[data-test='topbar--login-link']");
    expect(loginViewLink.isVisible()).toBe(true);
    userStore.$patch({ user: fakeUser });
    await Vue.nextTick();
    loginViewLink = wrapper.find("[data-test='topbar--login-link']");
    expect(loginViewLink.exists()).toBe(false);
  });

  it("displays Logout button and user designation only when logged in", async () => {
    const wrapper = mount(AppTopbar, {
      global: {
        stubs: { RouterLink: RouterLinkStub, FontAwesomeIcon: true },
        plugins: [createTestingPinia()],
      },
    });
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    let logoutButton = wrapper.find("[data-test='topbar--logout-button']");
    expect(logoutButton.exists()).toBe(false);
    let userDesignation = wrapper.find("[data-test='topbar--user-name']");
    expect(userDesignation.exists()).toBe(false);
    userStore.$patch({ user: fakeUser });
    await Vue.nextTick();
    logoutButton = wrapper.find("[data-test='topbar--logout-button']");
    expect(logoutButton.isVisible()).toBe(true);
    userDesignation = wrapper.find("[data-test='topbar--user-name']");
    expect(userDesignation.isVisible()).toBe(true);
  });
});
