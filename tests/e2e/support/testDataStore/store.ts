// Note values in this store object should never be changed
// This store is used by all cucumber tests where such data is required that is different for every test run
import minifaker from "minifaker";
import "minifaker/dist/cjs/locales/en";

const RandomValueStore = {
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
  "random > all quotes > like quote": minifaker
    .array(6, () => minifaker.word())
    .join(" "),
  "random > all quotes > unlike quote": minifaker
    .array(6, () => minifaker.word())
    .join(" "),
};

const WebpageValueStore = {
  "webpage > all quotes > like quote": undefined,
  "webpage > all quotes > unlike quote": undefined,
};

const ExternalValueStore = {
  "external > signup > email":
    "de8c1334-5620-4e58-bd9e-ad5ab8599749@mailslurp.com",
  "external > signup > account id": "de8c1334-5620-4e58-bd9e-ad5ab8599749",
  "external > signup > verification code": "",
};

export function getValueFromStore(key: string) {
  if (key in RandomValueStore) {
    return RandomValueStore[key];
  } else if (key in WebpageValueStore) {
    return WebpageValueStore[key];
  } else if (key in ExternalValueStore) {
    return ExternalValueStore[key];
  }
  return key;
}

export function setValueInStore(key: string, value: string) {
  if (key in WebpageValueStore) {
    WebpageValueStore[key] = value;
  } else if (key in ExternalValueStore) {
    ExternalValueStore[key] = value;
  }
}
