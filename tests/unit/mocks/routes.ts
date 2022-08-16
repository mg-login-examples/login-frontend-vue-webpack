import { RouteRecordRaw } from "vue-router";

import MockAllQuotes from "./mockVues/AllQuotes.vue";
import MockUserQuotes from "./mockVues/UserQuotes.vue";
import MockLoginView from "./mockVues/LoginView.vue";
import MockSignupView from "./mockVues/SignupView.vue";
import MockVerifyEmail from "./mockVues/VerifyEmail.vue";

export function getMockRoutes(
  routes: Array<RouteRecordRaw>
): Array<RouteRecordRaw> {
  const mockRoutes: Array<RouteRecordRaw> = [];
  for (const route of routes) {
    const routeClone = Object.assign(route);
    if (routeClone.name === "allQuotes") {
      routeClone.component = MockAllQuotes;
    }
    if (routeClone.name === "userQuotes") {
      routeClone.component = MockUserQuotes;
    }
    if (routeClone.name === "login") {
      routeClone.component = MockLoginView;
    }
    if (routeClone.name === "signup") {
      routeClone.component = MockSignupView;
    }
    if (routeClone.name === "verifyEmail") {
      routeClone.component = MockVerifyEmail;
    }
    mockRoutes.push(routeClone);
  }
  return mockRoutes;
}
