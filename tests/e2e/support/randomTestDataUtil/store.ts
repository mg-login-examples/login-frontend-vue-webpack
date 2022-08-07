// Note values in this store object should never be changed
// This store is used by all cucumber tests where such data is required that is different for every test run
import minifaker from "minifaker";
import "minifaker/dist/cjs/locales/en";

const Store = {
  "random > my quote > create quote": minifaker
    .array(8, () => minifaker.word())
    .join(" "),
  "random > my quote > to edit quote": minifaker
    .array(5, () => minifaker.word())
    .join(" "),
  "random > my quote > edited quote": minifaker
    .array(6, () => minifaker.word())
    .join(" "),
  "random > my quote > delete quote": minifaker
    .array(6, () => minifaker.word())
    .join(" "),
};

export function overwriteIfKeyInStore(key: string) {
  if (key in Store) {
    return Store[key];
  }
  return key;
}
