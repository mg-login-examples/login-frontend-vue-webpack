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
import MockSignupView from "../mocks/mockVues/SignupView.vue";
import MockVerifyEmail from "../mocks/mockVues/VerifyEmail.vue";
import MockForgotPassword from "../mocks/mockVues/ForgotPassword.vue";
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
    // navigate to all quotes url
    await router.push("/");
    // assert current route is all quotes url
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

  it("renders Signup component via routing", async () => {
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
    // navigate to sign up url
    await router.push("/signup");
    // assert current route is sign up url
    expect(router.currentRoute.value.path).toBe("/signup");
    // assert sign up component is loaded
    expect(wrapper.findComponent(MockSignupView).exists()).toBe(true);
  });

  it("renders VerifyEmail component via routing", async () => {
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
    // navigate to verify email url
    await router.push("/verify-email");
    // assert current route is verify email url
    expect(router.currentRoute.value.path).toBe("/verify-email");
    // assert verify email component is loaded
    expect(wrapper.findComponent(MockVerifyEmail).exists()).toBe(true);
  });

  it("renders ForgotPassword component via routing", async () => {
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
    // navigate to forgot password url
    await router.push("/forgot-password");
    // assert current route is forgot password url
    expect(router.currentRoute.value.path).toBe("/forgot-password");
    // assert forgot password component is loaded
    expect(wrapper.findComponent(MockForgotPassword).exists()).toBe(true);
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
    // navigate to user quotes url
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
    // try to navigate to user quotes url
    await router.push("/my-quotes");
    // assert current route is user url
    expect(router.currentRoute.value.path).toBe("/login");
    // assert login component is loaded
    expect(wrapper.findComponent(MockLoginView).exists()).toBe(true);
  });

  it("redirects to VerifyEmail when routing to User Quotes view if logged in but email not verified", async () => {
    // create router with same configuration and guard as actual router, except with mock components attached to each router
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: mockRoutes,
    });
    router.beforeEach(routerBeforeEachGuard);
    // simulate logged in user who is not verified
    userStore.user = { ...fakeUser, is_verified: false };
    // navigate to user quotes url
    await router.push("/my-quotes");
    // mount root App component
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    // assert current route is verify email url
    expect(router.currentRoute.value.path).toBe("/verify-email");
    // assert verify email component is loaded
    expect(wrapper.findComponent(MockVerifyEmail).exists()).toBe(true);
    // try to navigate to user quotes url
    await router.push("/my-quotes");
    // assert current route is verify email url
    expect(router.currentRoute.value.path).toBe("/verify-email");
    // assert verify email component is loaded
    expect(wrapper.findComponent(MockVerifyEmail).exists()).toBe(true);
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
    // navigate to user quotes url
    await router.push("/my-quotes");
    // mount root App component
    const wrapper = mount(App, {
      global: {
        plugins: [router, testPinia],
        stubs: ["AppTopbar"],
      },
    });
    // assert current route is user quotes url
    expect(router.currentRoute.value.path).toBe("/my-quotes");
    // assert user quotes component is loaded
    expect(wrapper.findComponent(MockUserQuotes).exists()).toBe(true);
  });
});
