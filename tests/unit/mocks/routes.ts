import { RouteRecordRaw } from "vue-router";

import MockAllQuotes from "./mockVues/AllQuotes.vue";
import MockUserQuotes from "./mockVues/UserQuotes.vue";
import MockLoginView from "./mockVues/LoginView.vue";
import MockSignupView from "./mockVues/SignupView.vue";
import MockVerifyEmail from "./mockVues/VerifyEmail.vue";
import MockForgotPassword from "./mockVues/ForgotPassword.vue";
import MockUserNotes from "./mockVues/UserNotes.vue";
import MockGroupChat from "./mockVues/GroupChat.vue";

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
    if (routeClone.name === "forgotPassword") {
      routeClone.component = MockForgotPassword;
    }
    if (routeClone.name === "userNotes") {
      routeClone.component = MockUserNotes;
    }
    if (routeClone.name === "groupChat") {
      routeClone.component = MockGroupChat;
    }
    mockRoutes.push(routeClone);
  }
  return mockRoutes;
}
