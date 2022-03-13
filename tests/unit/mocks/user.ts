import minifaker from "minifaker";
import "minifaker/dist/cjs/locales/en";

import { User } from "@/models/user.model";

export const fakeUser: User = {
  id: minifaker.number({ min: 1000, max: 9999 }),
  email: minifaker.email(),
  is_active: true,
};

export const mockAxiosGetUser = () => Promise.resolve({ data: fakeUser });
