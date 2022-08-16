import minifaker from "minifaker";
import "minifaker/dist/cjs/locales/en";

import { User } from "@/models/user.model";
import { UserLogin } from "@/models/user-login.model";
import { LoginResponse } from "@/models/login-response.model";

export const fakeUserLogin: UserLogin = {
  email: minifaker.email(),
  password: minifaker.password({ minLength: 8 }),
};

export const fakeUser: User = {
  id: minifaker.number({ min: 1000, max: 9999 }),
  email: fakeUserLogin.email,
  is_active: true,
  is_verified: true,
};

export const fakeUserUnverified: User = {
  id: minifaker.number({ min: 1000, max: 9999 }),
  email: fakeUserLogin.email,
  is_active: true,
  is_verified: false,
};

export const fakeLoginResponse: LoginResponse = {
  user: fakeUser,
  access_token: minifaker.uuid.toString(),
  token_type: "bearer",
};

export const mockAxiosLoginUser = () =>
  Promise.resolve({ data: fakeLoginResponse });

export const mockAxiosAuthenticateUser = () =>
  Promise.resolve({ data: fakeUser });

export const mockAxiosLogoutUser = () => Promise.resolve(null);

export const mockAxiosCreateUser = () =>
  Promise.resolve({ data: fakeLoginResponse });
