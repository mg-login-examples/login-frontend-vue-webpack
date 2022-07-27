import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";

import App from "@/App.vue";
import { routes, routerBeforeEachGuard } from "@/router";
import { useUserStore } from "@/store/user";
import { getMockRoutes } from "../mocks/routes";
import MockAllQuotes from "../mocks/mockVues/AllQuotes.vue";
import MockUserQuotes from "../mocks/mockVues/UserQuotes.vue";
import MockLoginView from "../mocks/mockVues/LoginView.vue";
import { fakeUser } from "../mocks/user";

const mockRoutes = getMockRoutes(routes);
let testPinia = createTestingPinia();
let userStore = useUserStore();
// Mock userStore authenticate function to set authAttemptedOnce to true like the actual implementation
const mockAuthenticate = async function () {
  await Promise.resolve(null);
  userStore.authAttemptedOnce = true;
};

describe("App", () => {
  beforeEach(() => {
    // Mock user store and authenticate action
    testPinia = createTestingPinia();
    userStore = useUserStore();
    userStore.authenticate = jest.fn();
    (userStore.authenticate as jest.Mock).mockImplementation(mockAuthenticate);
  });

  it("renders All Quotes component via routing", async () => {
    // create router with same configuration and guard as actual router, except with mock components attached to each router
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);
    // mount root App component
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    // navigate to home url
    await router.push("/");
    // assert current route is home url
    expect(router.currentRoute.value.path).toBe("/");
    // assert all quotes component is loaded
    expect(wrapper.findComponent(MockAllQuotes).exists()).toBe(true);
  });

  it("renders Login component via routing", async () => {
    // create router with same configuration and guard as actual router, except with mock components attached to each router
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);
    // mount root App component
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    // navigate to login url
    await router.push("/login");
    // assert current route is login url
    expect(router.currentRoute.value.path).toBe("/login");
    // assert login component is loaded
    expect(wrapper.findComponent(MockLoginView).exists()).toBe(true);
  });

  it("redirects to Login when routing to User Quotes view if not logged in", async () => {
    // create router with same configuration and guard as actual router, except with mock components attached to each router
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);
    // assert user is not logged in
    expect(userStore.user).toBe(null);
    // navigate to my-quotes url
    await router.push("/my-quotes");
    // mount root App component
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    // assert current route is login url
    expect(router.currentRoute.value.path).toBe("/login");
    // assert login component is loaded
    expect(wrapper.findComponent(MockLoginView).exists()).toBe(true);
    // try to navigate to my-quotes url
    await router.push("/my-quotes");
    // assert current route is login url
    expect(router.currentRoute.value.path).toBe("/login");
    // assert login component is loaded
    expect(wrapper.findComponent(MockLoginView).exists()).toBe(true);
  });

  it("renders User Quotes when routing to User Quotes view if logged in", async () => {
    // create router with same configuration and guard as actual router, except with mock components attached to each router
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);
    // simulate logged in user
    userStore.user = fakeUser;
    // navigate to my-quotes url
    await router.push("/my-quotes");
    // mount root App component
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    // assert current route is my-quotes url
    expect(router.currentRoute.value.path).toBe("/my-quotes");
    // assert my quotes component is loaded
    expect(wrapper.findComponent(MockUserQuotes).exists()).toBe(true);
  });
});
