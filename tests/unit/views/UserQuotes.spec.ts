import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import UserQuotes from "@/views/UserQuotes.vue";
import QuoteCreate from "@/components/Quotes/QuoteCreate.vue";
import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import { useQuotesStore } from "@/store/quotes";
import { fakeQuotes } from "../mocks/quotes";

const selectors = {
  createQuoteButton:
    "[data-test='user-quote--open-create-quote-dialog-button']",
};

describe("UserQuotes.vue", () => {
  it("renders a list of user quotes from quotes store", async () => {
    const wrapper = mount(UserQuotes, {
      global: {
        stubs: ["QuoteTile", "QuoteCreate", "FontAwesomeIcon"],
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

  it("on init, calls quotes store action to fetch all user quotes", async () => {
    mount(UserQuotes, {
      global: {
        stubs: ["QuoteTile", "QuoteCreate", "FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
    });
    const quotesStore = useQuotesStore();
    expect(quotesStore.getUserQuotes).toBeCalled();
  });

  it(`
  opens create quote modal when clicking on create quote button,
  calls create quote action and closes modal when save quote event is emitted by CreateQuote component
  `, async () => {
    const wrapper = mount(UserQuotes, {
      global: {
        stubs: ["QuoteTile", "FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
      attachTo: document.body,
    });
    expect(wrapper.findComponent(QuoteCreate).exists()).toBe(false);
    wrapper.find(selectors.createQuoteButton).trigger("click");
    await Vue.nextTick();
    expect(wrapper.findComponent(QuoteCreate).exists()).toBe(true);
    const quoteText = "some quote text";
    wrapper.findComponent(QuoteCreate).vm.$emit("saveQuote", quoteText);
    await Vue.nextTick();
    const quotesStore = useQuotesStore();
    expect(quotesStore.createUserQuote).toBeCalledWith(quoteText);
    await Vue.nextTick();
    expect(wrapper.findComponent(QuoteCreate).exists()).toBe(false);
  });

  it(`
  opens create quote modal when clicking on create quote button,
  closes modal when CreateQuote component emits cancel event
  `, async () => {
    const wrapper = mount(UserQuotes, {
      global: {
        stubs: ["QuoteTile", "FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
      attachTo: document.body,
    });
    expect(wrapper.findComponent(QuoteCreate).exists()).toBe(false);
    wrapper.find(selectors.createQuoteButton).trigger("click");
    await Vue.nextTick();
    expect(wrapper.findComponent(QuoteCreate).exists()).toBe(true);
    wrapper.findComponent(QuoteCreate).vm.$emit("cancelCreateQuote");
    await Vue.nextTick();
    expect(wrapper.findComponent(QuoteCreate).exists()).toBe(false);
  });
});
