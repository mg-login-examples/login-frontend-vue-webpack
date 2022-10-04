import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import UserNotes from "@/views/UserNotes.vue";
import { useUserNotesStore } from "@/store/user-notes";

describe("views > UserNotes.vue", () => {
  it("on init, calls user notes store action to fetch all user notes", async () => {
    // init store
    const testPinia = createTestingPinia();
    const userNotesStore = useUserNotesStore();
    userNotesStore.getUserNotes = jest.fn();
    // assert get user notes action not called before component is mounted
    expect(userNotesStore.getUserNotes).not.toBeCalled();
    // mount component
    mount(UserNotes, {
      global: {
        stubs: ["UserNote", "FontAwesomeIcon"],
        plugins: [testPinia],
      },
    });
    // assert get user notes action called
    expect(userNotesStore.getUserNotes).toBeCalled();
  });

  // TODO
  // Test on mount, component NotesLeftPanel prop activateMobileDisplay value true or false based on window width
  // Test on window resize, prop activateMobileDisplay value changes

  // TODO
  // Test when event "toggleShowNotesList" emitted by component NotesLeftPanel,
  // prop showNotesListMobileDisplay on component NotesLeftPanel changes true to false

  // TODO
  // Test when event "openNewUserNote" emitted by component NotesLeftPanel,
  // prop selectedUserNote on component OpenNote set to a new user note

  // TODO
  // Test given list of 3 user notes, when event "openUserNote" emitted with user note id by component NotesLeftPanel,
  // prop selectedUserNote on component OpenNote set to user note with id
});
