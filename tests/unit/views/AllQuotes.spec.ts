import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import AllQuotes from "@/views/AllQuotes.vue";
import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import { useQuotesStore } from "@/store/quotes";
import { fakeQuotes } from "../mocks/quotes";

describe("views > AllQuotes.vue", () => {
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

  it("calls like quote action when a QuoteTile component emits like quote event", async () => {
    // mount component
    const wrapper = mount(AllQuotes, {
      global: {
        stubs: ["QuoteTile", "QuoteCreateEdit", "FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
    });
    // add public quotes to quote store
    const quotesStore = useQuotesStore();
    quotesStore.quotes = fakeQuotes;
    await Vue.nextTick();
    // assert quote tiles rendered
    const quoteTileComponents = wrapper.findAllComponents(QuoteTile);
    expect(quoteTileComponents.length).toBe(fakeQuotes.length);
    // set quote to like
    const likeQuoteIndex = 1;
    const quoteToLike = quotesStore.quotes[likeQuoteIndex];
    // emit like quote quote event from a quote tile component
    quoteTileComponents[likeQuoteIndex].vm.$emit("likeQuote", quoteToLike.id);
    await Vue.nextTick();
    // assert like quote action is called with expected quoteId
    expect(quotesStore.likeQuote).toBeCalledWith(quoteToLike.id);
  });

  it("calls unlike quote action when a QuoteTile component emits unlike quote event", async () => {
    // mount component
    const wrapper = mount(AllQuotes, {
      global: {
        stubs: ["QuoteTile", "QuoteCreateEdit", "FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
    });
    // add public quotes to quote store
    const quotesStore = useQuotesStore();
    quotesStore.quotes = fakeQuotes;
    await Vue.nextTick();
    // assert quote tiles rendered
    const quoteTileComponents = wrapper.findAllComponents(QuoteTile);
    expect(quoteTileComponents.length).toBe(fakeQuotes.length);
    // set quote to unlike
    const likeQuoteIndex = 1;
    const quoteToUnlike = quotesStore.quotes[likeQuoteIndex];
    // emit like quote quote event from a quote tile component
    quoteTileComponents[likeQuoteIndex].vm.$emit(
      "unlikeQuote",
      quoteToUnlike.id
    );
    await Vue.nextTick();
    // assert like quote action is called with expected quoteId
    expect(quotesStore.unlikeQuote).toBeCalledWith(quoteToUnlike.id);
  });
});
