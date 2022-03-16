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
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockReturnValue(true);
    wrapper.find("[data-test='login--user-id-input']").setValue("1");
    wrapper.find("[data-test='login--submit-button']").trigger("click");
    await Vue.nextTick();
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("handles failed user logins", async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const userStore = useUserStore();
    (userStore.login as jest.Mock).mockReturnValue(false);
    wrapper.find("[data-test='login--user-id-input']").setValue("1");
    wrapper.find("[data-test='login--submit-button']").trigger("click");
    await Vue.nextTick();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
