import * as Vue from "vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import { fakeQuote } from "../../mocks/quotes";
import { useUserStore } from "@/store/user";
import { fakeUser } from "../../mocks/user";

const selectors = {
  quoteTile: "[data-test='quote-tile']",
  quoteText: "[data-test='quote-tile--text']",
  quoteAuthorUsername: "[data-test='quote-tile--author-username']",
  editQuoteButton: "[data-test='quote-tile--edit-quote-button']",
  deleteQuoteButton: "[data-test='quote-tile--delete-quote-button']",
  likeQuoteButton: "[data-test='quote-tile--like-quote-button']",
  unlikeQuoteButton: "[data-test='quote-tile--unlike-quote-button']",
};

describe("components > QuoteTile.vue", () => {
  it("renders a quote", async () => {
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.find(selectors.quoteText).text()).toBe(fakeQuote.text);
  });

  it("renders author username if only when prop myQuote value is false", () => {
    const expectedQuoteUsername = "abc";
    const quoteEmail = "abc@some_email.com";
    const quoteAuthor = { ...fakeQuote.author, email: quoteEmail };
    const quote = { ...fakeQuote, author: quoteAuthor };
    // mount quoteTile component with prop myQuote false (default value)
    const wrapper = mount(QuoteTile, {
      props: { quote },
      global: {
        stubs: ["FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.find(selectors.quoteAuthorUsername).text()).toBe(
      `- ${expectedQuoteUsername}`
    );
  });

  it("selects tile background based on prop myQuote's value", async () => {
    const allQuoteBackgroundClass = "from-orange-100";
    const userQuoteBackgroundClass = "from-red-100";
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
        myQuote: false,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
        plugins: [createTestingPinia()],
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

  it("renders edit button and delete button only when prop myQuote is true and on hover", async () => {
    // mount quoteTile component with prop myQuote true
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
        myQuote: true,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
    });
    // assert edit and delete button not visible
    expect(wrapper.find(selectors.editQuoteButton).exists()).toBe(false);
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseover");
    await Vue.nextTick();
    // assert edit and delete buttons visible
    expect(wrapper.find(selectors.editQuoteButton).isVisible()).toBe(true);
    expect(wrapper.find(selectors.deleteQuoteButton).isVisible()).toBe(true);
    // stop hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseleave");
    await Vue.nextTick();
    // assert edit and delete buttons not visible
    expect(wrapper.find(selectors.editQuoteButton).exists()).toBe(false);
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // change prop myQuote to false
    wrapper.setProps({ myQuote: false });
    await Vue.nextTick();
    // assert edit and delete buttons not visible
    expect(wrapper.find(selectors.editQuoteButton).exists()).toBe(false);
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseover");
    await Vue.nextTick();
    // assert edit and delete buttons not visible
    expect(wrapper.find(selectors.editQuoteButton).exists()).toBe(false);
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
    // stop hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseleave");
    await Vue.nextTick();
    // assert edit and delete buttons not visible
    expect(wrapper.find(selectors.editQuoteButton).exists()).toBe(false);
    expect(wrapper.find(selectors.deleteQuoteButton).exists()).toBe(false);
  });

  it("emits edit quote event when edit quote button is clicked", async () => {
    // mount quoteTile component with prop myQuote true
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
        myQuote: true,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
    });
    // assert edit button not visible
    expect(wrapper.find(selectors.editQuoteButton).exists()).toBe(false);
    // hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseover");
    await Vue.nextTick();
    // assert edit button visible
    expect(wrapper.find(selectors.editQuoteButton).isVisible()).toBe(true);
    // assert edit quote event not yet emitted
    expect(wrapper.emitted("editQuote")).toBeFalsy();
    // click on edit button
    wrapper.find(selectors.editQuoteButton).trigger("click");
    // assert edit quote event has been emitted with quote id
    const editQuoteEvent = wrapper.emitted("editQuote") as unknown[];
    expect(editQuoteEvent).toBeTruthy();
    expect(editQuoteEvent[0]).toEqual([fakeQuote.id]);
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
        plugins: [createTestingPinia()],
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

  it("emits like quote event when like quote button is clicked", async () => {
    // mount quoteTile component with prop myQuote false
    const wrapper = mount(QuoteTile, {
      props: {
        quote: fakeQuote,
        myQuote: false,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
        plugins: [createTestingPinia()],
      },
    });
    // assert like button not visible
    expect(wrapper.find(selectors.likeQuoteButton).exists()).toBe(false);
    // hover on quote tile
    wrapper.find(selectors.quoteTile).trigger("mouseover");
    await Vue.nextTick();
    // assert like button visible
    expect(wrapper.find(selectors.likeQuoteButton).isVisible()).toBe(true);
    // assert like quote event not yet emitted
    expect(wrapper.emitted("likeQuote")).toBeFalsy();
    // click on like button
    wrapper.find(selectors.likeQuoteButton).trigger("click");
    // assert like quote event has been emitted with quote id
    const likeQuoteEvent = wrapper.emitted("likeQuote") as unknown[];
    expect(likeQuoteEvent).toBeTruthy();
    expect(likeQuoteEvent[0]).toEqual([fakeQuote.id]);
  });

  it("emits unlike quote event when unlike quote button is clicked", async () => {
    // init user store with logged in user
    const testPinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.user = fakeUser;
    // mount quoteTile component with prop myQuote false
    const quote = { ...fakeQuote, liked_by_users: [fakeUser] };
    const wrapper = mount(QuoteTile, {
      props: {
        quote,
        myQuote: false,
      },
      global: {
        stubs: ["FontAwesomeIcon"],
        plugins: [testPinia],
      },
    });
    // assert unlike button visible
    expect(wrapper.find(selectors.unlikeQuoteButton).isVisible()).toBe(true);
    // assert unlike quote event not yet emitted
    expect(wrapper.emitted("unlikeQuote")).toBeFalsy();
    // click on unlike button
    wrapper.find(selectors.unlikeQuoteButton).trigger("click");
    // assert unlike quote event has been emitted with quote id
    const unlikeQuoteEvent = wrapper.emitted("unlikeQuote") as unknown[];
    expect(unlikeQuoteEvent).toBeTruthy();
    expect(unlikeQuoteEvent[0]).toEqual([fakeQuote.id]);
  });
});
