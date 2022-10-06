import minifaker from "minifaker";
import "minifaker/dist/cjs/locales/en";

import { UserNote } from "@/models/user-note.model";
import { fakeUser } from "./user";

export const fakeUserNote: UserNote = {
  id: Math.random().toString(36).slice(2),
  title: minifaker.array(3, () => minifaker.word()).join(),
  text: minifaker.array(10, () => minifaker.word()).join(),
  user_id: fakeUser.id,
};

export const fakeUserNotes: UserNote[] = [
  {
    id: Math.random().toString(36).slice(2),
    title: minifaker.array(3, () => minifaker.word()).join(),
    text: minifaker.array(10, () => minifaker.word()).join(),
    user_id: fakeUser.id,
  },
  {
    id: Math.random().toString(36).slice(2),
    title: minifaker.array(3, () => minifaker.word()).join(),
    text: minifaker.array(10, () => minifaker.word()).join(),
    user_id: fakeUser.id,
  },
  {
    id: Math.random().toString(36).slice(2),
    title: minifaker.array(3, () => minifaker.word()).join(),
    text: minifaker.array(10, () => minifaker.word()).join(),
    user_id: fakeUser.id,
  },
];

export const mockAxiosGetUserNotes = () =>
  Promise.resolve({ data: fakeUserNotes });

export const mockAxiosPostUserNote = () =>
  Promise.resolve({ data: fakeUserNote });

export const mockAxiosPutUserNote = () => Promise.resolve();

export const mockAxiosDeleteUserNote = () => {
  Promise.resolve();
};
