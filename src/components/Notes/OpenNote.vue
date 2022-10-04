<template>
  <div
    data-test="notes--open-note-container"
    v-if="userNoteModel"
    v-show="showOpenNote"
    class="flex justify-center flex-grow"
  >
    <div
      class="flex flex-col"
      :class="!activateMobileDisplay ? 'w-[400px]' : 'w-full'"
    >
      <div class="mt-2 p-2 bg-slate-500">
        <input
          type="text"
          v-model="userNoteModel.title"
          placeholder="Title"
          class="p-2 w-full outline-0 font-bold"
          data-test="notes--open-note--title"
        />
      </div>
      <div class="px-2 pb-2 bg-slate-500 flex-grow">
        <textarea
          v-model="userNoteModel.text"
          placeholder="Text"
          class="w-full h-full outline-0 p-2 block"
          data-test="notes--open-note--text"
        />
      </div>
      <div class="my-2 flex justify-center">
        <button
          @click="saveUserNote"
          class="p-2 bg-blue-300 flex justify-center"
        >
          SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useUserNotesStore } from "@/store/user-notes";
import { UserNote } from "@/models/user-note.model";
import { UserNoteCreate } from "@/models/user-note-create.model";

const props = defineProps<{
  activateMobileDisplay: boolean;
  showNotesListMobileDisplay: boolean;
  selectedUserNote: UserNote | UserNoteCreate | undefined;
}>();

const userNotesStore = useUserNotesStore();

const showOpenNote = computed(
  () =>
    !props.activateMobileDisplay ||
    (props.activateMobileDisplay && !props.showNotesListMobileDisplay)
);

const userNoteModel = ref<UserNote | UserNoteCreate>();
watch(
  () => props.selectedUserNote,
  (userNote) => {
    if (userNote) {
      userNoteModel.value = { ...userNote };
    }
  },
  { immediate: true }
);

function saveUserNote() {
  if (userNoteModel.value) {
    if ((userNoteModel.value as UserNote).id) {
      userNotesStore.editUserNote(userNoteModel.value as UserNote);
    } else {
      userNotesStore.createUserNote(userNoteModel.value);
    }
  }
}
</script>
