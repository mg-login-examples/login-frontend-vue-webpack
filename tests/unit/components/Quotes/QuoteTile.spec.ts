import * as Vue from "vue";
import { mount } from "@vue/test-utils";

import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import { fakeQuote } from "../../mocks/quotes";

const selectors = {
  quoteTile: "[data-test='quote-tile']",
  quoteText: "[data-test='quote-tile--text']",
  deleteQuoteButton: "[data-test='quote-tile--delete-quote-button']",
};

describe("components > QuoteTile.vue", () => {
  it("renders a quote", async () => {
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
      },
    });
    expect(wrapper.find(selectors.quoteText).text()).toBe(fakeQuote.text);
  });

  it("selects tile background based on prop 'myQuote's value", async () => {
    const allQuoteBackgroundClass = "from-orange-100";
    const userQuoteBackgroundClass = "from-red-100";
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
        myQuote: false,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
      },
    });
    expect(
      wrapper.find(selectors.quoteTile).classes(allQuoteBackgroundClass)
    ).toBe(true);
    expect(
      wrapper.find(selectors.quoteTile).classes(userQuoteBackgroundClass)
    ).toBe(false);

    wrapper.setProps({ myQuote: true });
    await Vue.nextTick();
    expect(
      wrapper.find(selectors.quoteTile).classes(userQuoteBackgroundClass)
    ).toBe(true);
    expect(
      wrapper.find(selectors.quoteTile).classes(allQuoteBackgroundClass)
    ).toBe(false);
  });

  it("renders delete button only when my quote is true and on hover", async () => {
    // mount quoteTile component with prop myQuote true
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
        myQuote: true,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
      },
    });
    // assert delete button not visible
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseover");
    await Vue.nextTick();
    // assert delete button visible
    expect(wrapper.find(selectors.deleteQuoteButton).isVisible()).toBe(true);
    // stop hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseleave");
    await Vue.nextTick();
    // assert delete button not visible
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // change prop myQuote to false
    wrapper.setProps({ myQuote: false });
    await Vue.nextTick();
    // assert delete button not visible
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseover");
    await Vue.nextTick();
    // assert delete button not visible
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // stop hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseleave");
    await Vue.nextTick();
    // assert delete button not visible
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
  });

  it("emits delete quote event when delete quote button is clicked", async () => {
    // mount quoteTile component with prop myQuote true
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
        myQuote: true,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
      },
    });
    // assert delete button not visible
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseover");
    await Vue.nextTick();
    // assert delete button visible
    expect(wrapper.find(selectors.deleteQuoteButton).isVisible()).toBe(true);
    // assert delete quote event not yet emitted
    expect(wrapper.emitted("deleteQuote")).toBeFalsy();
    // click on delete button
    wrapper.find(selectors.deleteQuoteButton).trigger("click");
    // assert delete quote event has been emitted with quote id
    const deleteQuoteEvent = wrapper.emitted("deleteQuote") as unknown[];
    expect(deleteQuoteEvent).toBeTruthy();
    expect(deleteQuoteEvent[0]).toEqual([fakeQuote.id]);
  });
});
