<template>
  <div
    class="bg-slate-200"
    :class="notesLeftPanelClasses"
    data-test="notes--notes-list-container"
  >
    <div
      v-if="activateMobileDisplay"
      data-test="notes--notes-list--collapsed-row"
      class="px-2 bg-slate-400"
    >
      <button @click="toggleShowListOfUserNotes" class="hover:bg-slate-500 p-2">
        <font-awesome-icon :icon="['far', 'rectangle-list']" />
      </button>
    </div>
    <div
      v-if="showNotesList"
      class="flex flex-col"
      data-test="notes--notes-list"
    >
      <div class="flex">
        <span class="px-4 p-2 flex-grow font-bold">My Notes</span>
        <button @click="openNewUserNote" class="p-2 hover:bg-slate-300">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
      <div
        v-for="userNote in userNotesStore.userNotes"
        :key="userNote.id"
        @click="openUserNote(userNote.id)"
        class="px-4 py-1 cursor-pointer hover:bg-slate-300"
      >
        {{ userNote.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useUserNotesStore } from "@/store/user-notes";

const props = defineProps<{
  activateMobileDisplay: boolean;
  showNotesListMobileDisplay: boolean;
}>();

const emit = defineEmits<{
  (e: "toggleShowNotesList"): void;
  (e: "openNewUserNote"): void;
  (e: "openUserNote", noteId: string): void;
}>();

const userNotesStore = useUserNotesStore();

function toggleShowListOfUserNotes() {
  emit("toggleShowNotesList");
}
function openNewUserNote() {
  emit("openNewUserNote");
}
function openUserNote(noteId: string) {
  emit("openUserNote", noteId);
}

const showNotesList = computed(
  () =>
    !props.activateMobileDisplay ||
    (props.activateMobileDisplay && props.showNotesListMobileDisplay)
);

const notesLeftPanelClasses = computed(() => {
  if (!props.activateMobileDisplay) {
    return "w-[200px]";
  } else {
    if (!props.showNotesListMobileDisplay) {
      return "";
    } else {
      return "flex-grow";
    }
  }
});
</script>
