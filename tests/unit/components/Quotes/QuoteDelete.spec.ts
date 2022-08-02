import { mount } from "@vue/test-utils";

import QuoteDelete from "@/components/Quotes/QuoteDelete.vue";
import { fakeQuote } from "../../mocks/quotes";

const selectors = {
  quoteText: "[data-test='user-quote--delete-quote--quote-text']",
  cancelButton: "[data-test='user-quote--delete-quote--cancel-button']",
  deleteQuoteButton:
    "[data-test='user-quote--delete-quote--delete-quote-button']",
};

describe("components > QuoteDelete.vue", () => {
  it("renders quote text", () => {
    const wrapper = mount(QuoteDelete, {
      props: { quote: fakeQuote },
    });
    expect(wrapper.find(selectors.quoteText).text()).toContain(fakeQuote.text);
  });

  it("emits cancel create event when clicking on cancel button", () => {
    const wrapper = mount(QuoteDelete, {
      props: { quote: fakeQuote },
    });
    wrapper.find(selectors.cancelButton).trigger("click");
    expect(wrapper.emitted()).toHaveProperty("cancelDeleteQuote");
  });

  it("emits delete quote event when clicking on delete quote button", async () => {
    const wrapper = mount(QuoteDelete, {
      props: { quote: fakeQuote },
    });
    wrapper.find(selectors.deleteQuoteButton).trigger("click");
    const deleteQuoteEvent = wrapper.emitted("deleteQuote") as unknown[];
    expect(deleteQuoteEvent).toBeDefined();
    expect(deleteQuoteEvent[0]).toEqual([fakeQuote.id]);
  });
});
