import * as Vue from "vue";
import { mount } from "@vue/test-utils";

import QuoteCreate from "@/components/Quotes/QuoteCreate.vue";

const selectors = {
  createQuoteInput: "[data-test='user-quote--create-quote--quote-text']",
  cancelButton: "[data-test='user-quote--create-quote--cancel-button']",
  saveQuoteButton: "[data-test='user-quote--create-quote--save-quote-button']",
};

describe("components > QuoteCreate.vue", () => {
  it("disables save button until create quote input is not empty", async () => {
    const wrapper = mount(QuoteCreate);
    expect(
      (wrapper.find(selectors.createQuoteInput).element as HTMLInputElement)
        .value
    ).toBe("");
    expect(
      wrapper.find(selectors.saveQuoteButton).attributes("disabled")
    ).toBeDefined();
    const textQuoteText = "some quote text";
    wrapper.find(selectors.createQuoteInput).setValue(textQuoteText);
    await Vue.nextTick();
    expect(
      (wrapper.find(selectors.createQuoteInput).element as HTMLInputElement)
        .value
    ).toBe(textQuoteText);
    expect(
      wrapper.find(selectors.saveQuoteButton).attributes("disabled")
    ).toBeUndefined();
  });

  it("emits cancel create event when clicking on cancel button", () => {
    const wrapper = mount(QuoteCreate);
    wrapper.find(selectors.cancelButton).trigger("click");
    expect(wrapper.emitted()).toHaveProperty("cancelCreateQuote");
  });

  it("emits save quote event when clicking on save quote button", async () => {
    const wrapper = mount(QuoteCreate);
    const textQuoteText = "some quote text";
    wrapper.find(selectors.createQuoteInput).setValue(textQuoteText);
    await Vue.nextTick();
    expect(
      (wrapper.find(selectors.createQuoteInput).element as HTMLInputElement)
        .value
    ).toBe(textQuoteText);
    wrapper.find(selectors.saveQuoteButton).trigger("click");
    const saveQuoteEvent = wrapper.emitted("saveQuote") as unknown[];
    expect(saveQuoteEvent).toBeDefined();
    expect(saveQuoteEvent[0]).toEqual([textQuoteText]);
  });
});
