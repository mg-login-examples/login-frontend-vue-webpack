jest.mock("@/api/backendApi");

import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import App from "@/App.vue";
import { useUserStore } from "@/store/user";

const testPinia = createTestingPinia();
const userStore = useUserStore();

describe("App.vue", () => {
  it("renders AppTopbar component", async () => {
    // mount App component with stubbed router and topbar
    const wrapper = mount(App, {
      global: {
        stubs: ["AppTopbar", "router-view"],
        plugins: [testPinia],
      },
    });
    // assert topbar component is rendered
    expect(wrapper.find("app-topbar-stub").exists()).toBe(true);
  });

  it(`
  renders loader component if userstore authAtemptedOnce is false,
  renders vue-router if userstore authAttemptedOnce is true
  `, async () => {
    const wrapper = mount(App, {
      global: {
        stubs: ["AppTopbar", "router-view"],
        plugins: [testPinia],
      },
    });
    // set value of userStore authAttemptedOnce is false (default value is false anyway)
    userStore.authAttemptedOnce = false;
    await Vue.nextTick();
    // assert "connecting..." is rendered and router is not rendered when user authenticate method is not yet called
    expect(wrapper.find("router-view-stub").exists()).toBe(false);
    expect(wrapper.find("[data-test='app--connecting']").exists()).toBe(true);
    // set value of userStore authAttemptedOnce is true
    // in actuality, router guard will call authenticate action which sets authAttemptedOnce to true upon completion
    userStore.authAttemptedOnce = true;
    await Vue.nextTick();
    // assert "connecting..." is not rendered and router is rendered when authenticate method is called"
    expect(wrapper.find("router-view-stub").exists()).toBe(true);
    expect(wrapper.find("[data-test='app--connecting']").exists()).toBe(false);
  });
});
