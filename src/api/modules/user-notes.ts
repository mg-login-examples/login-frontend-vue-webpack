import { UserNoteCreate } from "@/models/user-note-create.model";
import { UserNote } from "@/models/user-note.model";
import http from "./base";

const userNotesApi = {
  async getUserNotes(userId: number): Promise<UserNote[]> {
    const response = await http.get(`/api/users/${userId}/user-notes/`);
    return <UserNote[]>response.data;
  },
  async createUserNote(userNoteCreate: UserNoteCreate): Promise<UserNote> {
    const response = await http.post(`/api/user-notes/`, userNoteCreate);
    return <UserNote>response.data;
  },
  async editUserNote(userNoteEdit: UserNote) {
    await http.put(`/api/user-notes/${userNoteEdit.id}`, userNoteEdit);
  },
  async deleteUserNote(userNoteId: string) {
    await http.delete(`/api/user-notes/${userNoteId}/`);
  },
};

export default userNotesApi;
