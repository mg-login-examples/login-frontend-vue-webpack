import * as Vue from "vue";
import { mount } from "@vue/test-utils";

import QuoteCreate from "@/components/Quotes/QuoteCreateEdit.vue";
import { fakeQuote } from "../../mocks/quotes";

const selectors = {
  createEditQuoteTitle: "[data-test='user-quote--create-edit-quote--title']",
  quoteTextInput: "[data-test='user-quote--create-quote--quote-text']",
  cancelButton: "[data-test='user-quote--create-quote--cancel-button']",
  saveQuoteButton: "[data-test='user-quote--create-quote--save-quote-button']",
};

describe("components > QuoteCreateEdit.vue", () => {
  it("displays edit quote title if prop quote is defined and create quote title otherwise", async () => {
    const wrapper = mount(QuoteCreate);
    expect(wrapper.find(selectors.createEditQuoteTitle).text()).toContain(
      "Write A Quote"
    );
    wrapper.setProps({ quote: { ...fakeQuote } });
    await Vue.nextTick();
    expect(wrapper.find(selectors.createEditQuoteTitle).text()).toContain(
      "Edit Quote"
    );
  });

  it("disables save button until quote text input is not empty", async () => {
    const wrapper = mount(QuoteCreate);
    expect(
      (wrapper.find(selectors.quoteTextInput).element as HTMLInputElement).value
    ).toBe("");
    expect(
      wrapper.find(selectors.saveQuoteButton).attributes("disabled")
    ).toBeDefined();
    const textQuoteText = "some quote text";
    wrapper.find(selectors.quoteTextInput).setValue(textQuoteText);
    await Vue.nextTick();
    expect(
      (wrapper.find(selectors.quoteTextInput).element as HTMLInputElement).value
    ).toBe(textQuoteText);
    expect(
      wrapper.find(selectors.saveQuoteButton).attributes("disabled")
    ).toBeUndefined();
  });

  it("emits cancel create event when clicking on cancel button", () => {
    const wrapper = mount(QuoteCreate);
    wrapper.find(selectors.cancelButton).trigger("click");
    expect(wrapper.emitted()).toHaveProperty("cancel");
  });

  it("emits create quote event when clicking on save quote button if prop quote is undefined", async () => {
    const wrapper = mount(QuoteCreate);
    const quoteText = "some quote text";
    wrapper.find(selectors.quoteTextInput).setValue(quoteText);
    await Vue.nextTick();
    expect(
      (wrapper.find(selectors.quoteTextInput).element as HTMLInputElement).value
    ).toBe(quoteText);
    wrapper.find(selectors.saveQuoteButton).trigger("click");
    const saveQuoteEvent = wrapper.emitted("createQuote") as unknown[];
    expect(saveQuoteEvent).toBeDefined();
    expect(saveQuoteEvent[0]).toEqual([quoteText]);
  });

  it("emits edit quote event when clicking on save quote button if prop quote is defined", async () => {
    const quoteProp = { ...fakeQuote };
    const wrapper = mount(QuoteCreate, {
      props: {
        quote: quoteProp,
      },
    });
    const quoteText = "some quote text";
    wrapper.find(selectors.quoteTextInput).setValue(quoteText);
    await Vue.nextTick();
    expect(
      (wrapper.find(selectors.quoteTextInput).element as HTMLInputElement).value
    ).toBe(quoteText);
    wrapper.find(selectors.saveQuoteButton).trigger("click");
    const saveQuoteEvent = wrapper.emitted("editQuote") as unknown[];
    expect(saveQuoteEvent).toBeDefined();
    const expectedEditedQuote = { ...fakeQuote, text: quoteText };
    expect(saveQuoteEvent[0]).toEqual([expectedEditedQuote]);
  });
});
