import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export function routerBeforeEachGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const userStore = useUserStore();
    if (!userStore.user) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
}

router.beforeEach(routerBeforeEachGuard);

export default router;
