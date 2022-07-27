import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import AllQuotes from "../views/AllQuotes.vue";
import LoginView from "../views/LoginView.vue";
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
      import(/* webpackChunkName: "about" */ "../views/UserQuotes.vue"),
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
    }
  }
}

router.beforeEach(routerBeforeEachGuard);

export default router;
