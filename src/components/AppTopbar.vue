<template>
  <AppTopbarContainer>
    <div
      class="flex h-full items-center bg-gradient-to-r from-orange-300 to-rose-400"
    >
      <font-awesome-icon icon="biohazard" class="px-4" />
      <router-link to="/" class="px-4" data-test="topbar--all-quotes-link">
        All Quotes
      </router-link>
      <router-link
        to="/my-quotes"
        class="px-4"
        data-test="topbar--user-quotes-link"
      >
        My Quotes
      </router-link>
      <router-link
        to="/user-notes"
        class="px-4"
        data-test="topbar--user-notes-link"
      >
        User Notes
      </router-link>
      <router-link
        to="/group-chat"
        class="px-4"
        data-test="topbar--group-chat-link"
      >
        Group Chat
      </router-link>
      <div class="flex-grow"></div>
      <router-link
        v-if="!userStore.user && userStore.authAttemptedOnce"
        to="/login"
        class="px-4"
        data-test="topbar--login-link"
      >
        Login
      </router-link>
      <div v-if="userStore.user" data-test="topbar--user-name">
        {{ userStore.user.email }}
      </div>
      <button
        v-if="userStore.user"
        @click="logout"
        class="p-2"
        data-test="topbar--logout-button"
      >
        <font-awesome-icon icon="right-from-bracket" class="px-4" />
      </button>
    </div>
  </AppTopbarContainer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import AppTopbarContainer from "@/components/generic/layout/AppTopbarContainer.vue";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();

function logout() {
  userStore.logout();
  router.go(0);
}
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
}
</style>
