import * as Vue from "vue";
import { mount } from "@vue/test-utils";

import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import { fakeQuote } from "../mocks/quotes";

describe("components > QuoteTile.vue", () => {
  it("renders a quote", async () => {
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
      },
    });
    expect(wrapper.find("[data-test='quote-tile--text']").text()).toBe(
      fakeQuote.text
    );
  });

  it("selects tile background based on prop 'background's value", async () => {
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
      },
    });
    expect(
      wrapper.find("[data-test='quote-tile']").classes("from-orange-100")
    ).toBe(true);
    expect(
      wrapper.find("[data-test='quote-tile']").classes("from-red-100")
    ).toBe(false);

    wrapper.setProps({ background: "my-quotes" });
    await Vue.nextTick();
    expect(
      wrapper.find("[data-test='quote-tile']").classes("from-red-100")
    ).toBe(true);
    expect(
      wrapper.find("[data-test='quote-tile']").classes("from-orange-100")
    ).toBe(false);
  });
});
