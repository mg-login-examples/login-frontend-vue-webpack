import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import AllQuotes from "../views/AllQuotes.vue";
import UserNotes from "../views/UserNotes.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import VerifyEmail from "../views/VerifyEmail.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import { useUserStore } from "@/store/user";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "allQuotes",
    component: AllQuotes,
  },
  {
    path: "/my-quotes",
    name: "userQuotes",
    component: () =>
      import(/* webpackChunkName: "userQuotes" */ "../views/UserQuotes.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user-notes",
    name: "userNotes",
    component: UserNotes,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    props: true,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/verify-email",
    name: "verifyEmail",
    component: VerifyEmail,
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export async function routerBeforeEachGuard(
  to: RouteLocationNormalized,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _from: RouteLocationNormalized
) {
  const userStore = useUserStore();
  if (!userStore.authAttemptedOnce) {
    await userStore.authenticate();
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userStore.user) {
      return {
        name: "login",
        params: { user_requested_route: to.fullPath },
      };
    } else if (!userStore.user.is_verified) {
      return {
        name: "verifyEmail",
        params: { user_requested_route: to.fullPath },
      };
    }
  }
}

router.beforeEach(routerBeforeEachGuard);

export default router;
