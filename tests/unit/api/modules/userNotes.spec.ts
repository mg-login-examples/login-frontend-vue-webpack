jest.mock("@/api/modules/base");
import userNotesApi from "@/api/modules/user-notes";
import http from "@/api/modules/base";
import { fakeUser } from "../../mocks/user";
import {
  fakeUserNote,
  fakeUserNotes,
  mockAxiosGetUserNotes,
  mockAxiosPostUserNote,
  mockAxiosPutUserNote,
  mockAxiosDeleteUserNote,
} from "../../mocks/userNotes";
import { UserNoteCreate } from "@/models/user-note-create.model";
import { UserNote } from "@/models/user-note.model";

const mockedHttpGet = http.get as jest.Mock;
const mockedHttpPost = http.post as jest.Mock;
const mockedHttpPut = http.put as jest.Mock;
const mockedHttpDelete = http.delete as jest.Mock;

describe("api > modules > notes.ts", () => {
  beforeEach(() => {
    mockedHttpGet.mockClear();
    mockedHttpPost.mockClear();
    mockedHttpPut.mockClear();
    mockedHttpDelete.mockClear();
  });

  it("gets user notes by userId", async () => {
    mockedHttpGet.mockImplementation(mockAxiosGetUserNotes);
    await expect(userNotesApi.getUserNotes(fakeUser.id)).resolves.toEqual(
      fakeUserNotes
    );
    expect(http.get).toHaveBeenCalledWith(
      `/api/users/${fakeUser.id}/user-notes/`
    );
  });

  it("creates a user note", async () => {
    const userNoteCreate: UserNoteCreate = {
      title: fakeUserNote.title,
      text: fakeUserNote.text,
      user_id: fakeUserNote.user_id,
    };
    mockedHttpPost.mockImplementation(mockAxiosPostUserNote);
    await expect(userNotesApi.createUserNote(userNoteCreate)).resolves.toEqual(
      fakeUserNote
    );
    expect(http.post).toHaveBeenCalledWith(`/api/user-notes/`, userNoteCreate);
  });

  it("edits a user note", async () => {
    const userNoteEdit: UserNote = {
      id: fakeUserNote.id,
      title: fakeUserNote.title,
      text: fakeUserNote.text,
      user_id: fakeUserNote.user_id,
    };
    mockedHttpPut.mockImplementation(mockAxiosPutUserNote);
    await expect(userNotesApi.editUserNote(userNoteEdit)).resolves.toEqual(
      undefined
    );
    expect(http.put).toHaveBeenCalledWith(
      `/api/user-notes/${fakeUserNote.id}`,
      userNoteEdit
    );
  });

  it("deletes a user note", async () => {
    mockedHttpDelete.mockImplementation(mockAxiosDeleteUserNote);
    await expect(userNotesApi.deleteUserNote(fakeUserNote.id)).resolves.toEqual(
      undefined
    );
    expect(http.delete).toHaveBeenCalledWith(
      `/api/user-notes/${fakeUserNote.id}/`
    );
  });
});
