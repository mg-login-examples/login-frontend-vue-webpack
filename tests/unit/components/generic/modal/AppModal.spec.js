import * as Vue from "vue";
import { mount } from "@vue/test-utils";

import AppModalParent from "../../../mocks/mockVues/AppModalParent.vue";
import AppModalContent from "../../../mocks/mockVues/AppModalContent.vue";

const selectors = {
  appModalBackground: "[data-test='modal--background']",
  appModalInnerContent: "[data-test='mock-modal-parent--inner-content']",
};

describe("components > generic > modal > AppModal.vue", () => {
  it("renders modal when showModal is true", async () => {
    // mount parent component of modal
    const wrapper = mount(AppModalParent, {
      attachTo: document.body,
    });
    // assert modal is closed
    expect(wrapper.vm.showModal).toBe(false);
    expect(wrapper.findComponent(AppModalContent).exists()).toBe(false);
    // open modal
    wrapper.vm.showModal = true;
    await Vue.nextTick();
    // assert modal is open
    expect(wrapper.findComponent(AppModalContent).exists()).toBe(true);
    const appModalContentWrapper = wrapper.findComponent(AppModalContent);
    expect(
      appModalContentWrapper.find(selectors.appModalInnerContent).exists()
    ).toBe(true);
  });

  it("closes modal only when clicking outside the central focus element", async () => {
    // mount parent component of modal
    const wrapper = mount(AppModalParent, {
      attachTo: document.body,
    });
    // assert modal is closed
    expect(wrapper.vm.showModal).toBe(false);
    expect(wrapper.findComponent(AppModalContent).exists()).toBe(false);
    // open modal
    wrapper.vm.showModal = true;
    await Vue.nextTick();
    // assert modal is open
    expect(wrapper.findComponent(AppModalContent).exists()).toBe(true);
    const appModalContentWrapper = wrapper.findComponent(AppModalContent);
    expect(
      appModalContentWrapper.find(selectors.appModalInnerContent).exists()
    ).toBe(true);
    // get modal content's parent element and click
    expect(
      appModalContentWrapper.element.parentElement.getAttribute("data-test")
    ).toBe("modal--focus-element-wrapper");
    appModalContentWrapper.element.parentElement.click();
    await Vue.nextTick();
    // assert modal is not closed
    expect(wrapper.findComponent(AppModalContent).exists()).toBe(true);
    // assert parent of focus element is transition element, automatically stubbed by vue-test-utils
    expect(
      appModalContentWrapper.element.parentElement.parentElement.tagName
    ).toBe("TRANSITION-STUB");
    // get modal's root background element and click
    expect(
      appModalContentWrapper.element.parentElement.parentElement.parentElement.getAttribute(
        "data-test"
      )
    ).toBe("modal--background");
    appModalContentWrapper.element.parentElement.parentElement.parentElement.click();
    await Vue.nextTick();
    // assert modal is closed
    expect(wrapper.findComponent(AppModalContent).exists()).toBe(false);
  });
});
