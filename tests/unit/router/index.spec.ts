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

describe("App", () => {
  it("renders All Quotes component via routing", async () => {
    const testPinia = createTestingPinia();
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);

    await router.push("/");
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    expect(router.currentRoute.value.path).toBe("/");
    expect(wrapper.findComponent(MockAllQuotes).exists()).toBe(true);
  });

  it("renders Login component via routing", async () => {
    const testPinia = createTestingPinia();
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);

    await router.push("/login");
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    expect(router.currentRoute.value.path).toBe("/login");
    expect(wrapper.findComponent(MockLoginView).exists()).toBe(true);
  });

  it("redirects to Login when routing to User Quotes view if not logged in", async () => {
    const testPinia = createTestingPinia();
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);

    const userStore = useUserStore();
    expect(userStore.user).toBe(null);
    await router.push("/my-quotes");
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    expect(router.currentRoute.value.path).toBe("/login");
    expect(wrapper.findComponent(MockLoginView).exists()).toBe(true);

    await router.push("/my-quotes");
    expect(router.currentRoute.value.path).toBe("/login");
    expect(wrapper.findComponent(MockLoginView).exists()).toBe(true);
  });

  it("renders User Quotes when routing to User Quotes view if logged in", async () => {
    const testPinia = createTestingPinia();
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);

    const userStore = useUserStore();
    userStore.user = fakeUser;
    await router.push("/my-quotes");
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    expect(router.currentRoute.value.path).toBe("/my-quotes");
    expect(wrapper.findComponent(MockUserQuotes).exists()).toBe(true);
  });
});
