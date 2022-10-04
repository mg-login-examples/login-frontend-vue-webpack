import { defineStore } from "pinia";

import { UserNote } from "@/models/user-note.model";
import { UserNoteCreate } from "@/models/user-note-create.model";
import backendApi from "@/api/backendApi";
import { useErrorsStore } from "./errors";
import { useUserStore } from "./user";

interface UserNotesState {
  userNotes: UserNote[];
  // userNotesSkip: number;
  // userNotesLimit: number;
  // userNotesMoreAvailable: boolean;
}

export const useUserNotesStore = defineStore("userNotes", {
  state: (): UserNotesState => ({
    userNotes: [],
    // userNotesSkip: 0,
    // userNotesLimit: 51,
    // userNotesMoreAvailable: true,
  }),
  getters: {
    userNoteById: (state) => {
      return (userNoteId: string) =>
        state.userNotes.find((userNote) => userNote.id === userNoteId);
    },
  },
  actions: {
    async getUserNotes() {
      const userStore = useUserStore();
      if (userStore.user) {
        try {
          this.userNotes = await backendApi.userNotes.getUserNotes(
            userStore.user.id
          );
        } catch (error) {
          const errorStore = useErrorsStore();
          errorStore.handleError(error);
          this.userNotes = [];
        }
      } else {
        this.userNotes = [];
      }
    },
    async createUserNote(userNoteCreate: UserNoteCreate) {
      const userStore = useUserStore();
      if (userStore.user) {
        try {
          const newUserNote = await backendApi.userNotes.createUserNote(
            userNoteCreate
          );
          this.userNotes.push(newUserNote);
        } catch (error) {
          const errorStore = useErrorsStore();
          errorStore.handleError(error);
        }
      }
    },
    async editUserNote(userNoteEdited: UserNote) {
      try {
        await backendApi.userNotes.editUserNote(userNoteEdited);
        this.userNotes = this.userNotes.map((n) =>
          n.id !== userNoteEdited.id ? n : userNoteEdited
        );
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
      }
    },
    async deleteUserNote(userNoteId: string) {
      try {
        await backendApi.userNotes.deleteUserNote(userNoteId);
        this.userNotes = this.userNotes.filter(
          (userNote) => userNote.id !== userNoteId
        );
      } catch (error) {
        const errorStore = useErrorsStore();
        errorStore.handleError(error);
      }
    },
  },
});
