import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import App from "@/App.vue";
import { useUserStore } from "@/store/user";

const testPinia = createTestingPinia();
const userStore = useUserStore();
userStore.authenticate = jest.fn();

describe("App.vue", () => {
  beforeEach(() => {
    (userStore.authenticate as jest.Mock).mockClear();
  });

  it("renders router-view and AppTopbar components after authenticate()", async () => {
    // mount App component with stubbed router and topbar
    const wrapper = mount(App, {
      global: {
        stubs: ["AppTopbar", "router-view"],
        plugins: [testPinia],
      },
    });
    // Allow userStore authenticate function to be called
    await Vue.nextTick();
    // Allow components to be rendered after authenticate function completion changes v-if condition
    await Vue.nextTick();
    // assert topbar component is rendered
    expect(wrapper.find("app-topbar-stub").exists()).toBe(true);
    // assert router-view component is rendered
    expect(wrapper.find("router-view-stub").exists()).toBe(true);
  });

  it("renders loader component until authenticate() has executed", async () => {
    expect(userStore.authenticate).not.toBeCalled();
    // mount App component with stubbed router and topbar
    const wrapper = mount(App, {
      global: {
        stubs: ["AppTopbar", "router-view"],
        plugins: [testPinia],
      },
    });
    // assert authenticate function is called
    expect(userStore.authenticate).toBeCalled();
    // assert topbar component is rendered
    await Vue.nextTick();
    expect(wrapper.find("app-topbar-stub").exists()).toBe(true);
    // assert "connecting..." is rendered and router is not rendered when user authenticate method is not yet called
    expect(wrapper.find("router-view-stub").exists()).toBe(false);
    expect(wrapper.find("[data-test='app--connecting']").exists()).toBe(true);
    // wait for user authenticate method to be called
    await Vue.nextTick();
    // assert "connecting..." is not rendered and router is rendered when authenticate method is called"
    expect(wrapper.find("router-view-stub").exists()).toBe(true);
    expect(wrapper.find("[data-test='app--connecting']").exists()).toBe(false);
  });
});
