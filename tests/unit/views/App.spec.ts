import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("contains router-view and AppTopbar components", () => {
    const wrapper = mount(App, {
      global: {
        stubs: ["AppTopbar", "router-view"],
      },
    });
    expect(wrapper.find("app-topbar-stub").exists()).toBe(true);
    expect(wrapper.find("router-view-stub").exists()).toBe(true);
  });
});
