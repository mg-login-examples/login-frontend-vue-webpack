<template>
  <div
    class="flex h-full"
    :class="activateMobileDisplay ? 'flex-col' : 'flex-row'"
  >
    <NotesLeftPanel
      :activateMobileDisplay="activateMobileDisplay"
      :showNotesListMobileDisplay="showNotesListMobileDisplay"
      @toggleShowNotesList="toggleShowNotesList"
      @openNewUserNote="openNewUserNote"
      @openUserNote="openUserNote"
    />
    <OpenNote
      :activateMobileDisplay="activateMobileDisplay"
      :showNotesListMobileDisplay="showNotesListMobileDisplay"
      :selectedUserNote="selectedUserNote"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";

import NotesLeftPanel from "@/components/Notes/NotesLeftPanel.vue";
import OpenNote from "@/components/Notes/OpenNote.vue";
import { useUserNotesStore } from "@/store/user-notes";
import { useUserStore } from "@/store/user";
import { UserNote } from "@/models/user-note.model";
import { UserNoteCreate } from "@/models/user-note-create.model";

const userStore = useUserStore();
const userNotesStore = useUserNotesStore();

userNotesStore.getUserNotes();

const showNotesListMobileDisplay = ref(false);
function toggleShowNotesList() {
  showNotesListMobileDisplay.value = !showNotesListMobileDisplay.value;
}

// Create/Edit note
const selectedUserNote = ref<UserNote | UserNoteCreate | undefined>(undefined);

async function openNewUserNote() {
  if (userStore.user) {
    selectedUserNote.value = {
      title: "",
      text: "",
      user_id: userStore.user.id,
    };
    showNotesListMobileDisplay.value = false;
  }
}

function openUserNote(userNoteId: string) {
  const userNote = userNotesStore.userNoteById(userNoteId);
  if (userNote) {
    selectedUserNote.value = { ...userNote };
  }
  showNotesListMobileDisplay.value = false;
}

// window resize listener
const activateMobileDisplay = ref(window.innerWidth < 600);
function updateActivateMobileDisplay() {
  activateMobileDisplay.value = window.innerWidth < 600;
}
window.addEventListener("resize", updateActivateMobileDisplay);
onUnmounted(() => {
  window.removeEventListener("resize", updateActivateMobileDisplay);
});
</script>
