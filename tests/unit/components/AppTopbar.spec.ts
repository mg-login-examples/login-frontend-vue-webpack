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

const selectors = {
  allQuotesPageLink: "[data-test='topbar--all-quotes-link']",
  myQuotesPageLink: "[data-test='topbar--user-quotes-link']",
  userNotesPageLink: "[data-test='topbar--user-notes-link']",
  loginPageLink: "[data-test='topbar--login-link']",
  logoutButton: "[data-test='topbar--logout-button']",
  usernameLabel: "[data-test='topbar--user-name']",
};

describe("AppTopbar.vue", () => {
  it("has All Quotes, My Quotes and Login navlinks", async () => {
    const wrapper = mount(AppTopbar, {
      global: {
        stubs: { RouterLink: RouterLinkStub, FontAwesomeIcon: true },
        plugins: [createTestingPinia()],
      },
    });
    // All Quotes navlink
    const allQuotesViewLink = wrapper.find(selectors.allQuotesPageLink);
    expect(allQuotesViewLink.text()).toMatch("All Quotes");
    expect(allQuotesViewLink.findComponent(RouterLinkStub).props().to).toBe(
      "/"
    );
    // My Quotes navlink
    const myQuotesViewLink = wrapper.find(selectors.myQuotesPageLink);
    expect(myQuotesViewLink.text()).toMatch("My Quotes");
    expect(myQuotesViewLink.findComponent(RouterLinkStub).props().to).toBe(
      "/my-quotes"
    );
    // User Notes navlink
    const userNotesViewLink = wrapper.find(selectors.userNotesPageLink);
    expect(userNotesViewLink.text()).toMatch("User Notes");
    expect(userNotesViewLink.findComponent(RouterLinkStub).props().to).toBe(
      "/user-notes"
    );
    // Mock authentication having completed
    const userStore = useUserStore();
    userStore.authAttemptedOnce = true;
    await Vue.nextTick();
    // Login navlink
    const loginViewLink = wrapper.find(selectors.loginPageLink);
    expect(loginViewLink.text()).toMatch("Login");
    expect(loginViewLink.findComponent(RouterLinkStub).props().to).toBe(
      "/login"
    );
  });

  it("displays Login button only when not logged in and authentication is completed", async () => {
    const wrapper = mount(AppTopbar, {
      global: {
        stubs: { RouterLink: RouterLinkStub, FontAwesomeIcon: true },
        plugins: [createTestingPinia()],
      },
    });
    // Assert app in start phase, authentication ongoing
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    expect(userStore.authAttemptedOnce).toBe(false);
    // Assert login button not visible
    expect(wrapper.find(selectors.loginPageLink).exists()).toBe(false);
    // Mock authentication complete unsuccessfully, user not logged in
    userStore.authAttemptedOnce = true;
    await Vue.nextTick();
    // Assert login button is visible
    expect(wrapper.find(selectors.loginPageLink).isVisible()).toBe(true);
    // Mock user logged in / authenticated successfully
    userStore.$patch({ user: fakeUser });
    await Vue.nextTick();
    // Assert login button not visible
    expect(wrapper.find(selectors.loginPageLink).exists()).toBe(false);
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
    let logoutButton = wrapper.find(selectors.logoutButton);
    expect(logoutButton.exists()).toBe(false);
    let userDesignation = wrapper.find(selectors.usernameLabel);
    expect(userDesignation.exists()).toBe(false);
    userStore.$patch({ user: fakeUser });
    await Vue.nextTick();
    logoutButton = wrapper.find(selectors.logoutButton);
    expect(logoutButton.isVisible()).toBe(true);
    userDesignation = wrapper.find(selectors.usernameLabel);
    expect(userDesignation.isVisible()).toBe(true);
  });
});
