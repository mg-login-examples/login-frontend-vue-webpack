import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import UserQuotes from "@/views/UserQuotes.vue";
import QuoteTile from "@/components/QuoteTile.vue";
import { useQuotesStore } from "@/store/quotes";
import { fakeQuotes } from "../mocks/quotes";

describe("UserQuotes.vue", () => {
  it("renders user quotes items", async () => {
    const wrapper = mount(UserQuotes, {
      global: {
        stubs: ["QuoteTile"],
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.findAllComponents(QuoteTile).length).toBe(0);
    const quotesStore = useQuotesStore();
    quotesStore.userQuotes = fakeQuotes;
    await Vue.nextTick();
    const quoteTileComponents = wrapper.findAllComponents(QuoteTile);
    expect(quoteTileComponents.length).toBe(fakeQuotes.length);
    for (const quoteTileComponent of quoteTileComponents) {
      expect(quoteTileComponent.props("quote")).toBeTruthy();
    }
  });

  it("on create, calls quotes store action to fetch all user quotes", async () => {
    mount(UserQuotes, {
      global: {
        stubs: ["QuoteTile"],
        plugins: [createTestingPinia()],
      },
    });
    const quotesStore = useQuotesStore();
    expect(quotesStore.getUserQuotes).toBeCalled();
  });
});
