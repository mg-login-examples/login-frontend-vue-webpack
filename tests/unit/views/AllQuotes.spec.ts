import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import AllQuotes from "@/views/AllQuotes.vue";
import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import { useQuotesStore } from "@/store/quotes";
import { fakeQuotes } from "../mocks/quotes";

describe("AllQuotes.vue", () => {
  it("renders all quotes items", async () => {
    const wrapper = mount(AllQuotes, {
      global: {
        stubs: ["QuoteTile"],
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.findAllComponents(QuoteTile).length).toBe(0);
    const quotesStore = useQuotesStore();
    quotesStore.quotes = fakeQuotes;
    await Vue.nextTick();
    const quoteTileComponents = wrapper.findAllComponents(QuoteTile);
    expect(quoteTileComponents.length).toBe(fakeQuotes.length);
    for (const quoteTileComponent of quoteTileComponents) {
      expect(quoteTileComponent.props("quote")).toBeTruthy();
    }
  });

  it("on create, calls quotes store action to fetch all quotes", async () => {
    mount(AllQuotes, {
      global: {
        stubs: ["QuoteTile"],
        plugins: [createTestingPinia()],
      },
    });
    const quotesStore = useQuotesStore();
    expect(quotesStore.getQuotes).toBeCalled();
  });
});
