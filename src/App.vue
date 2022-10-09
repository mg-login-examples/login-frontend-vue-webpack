<template>
  <AppContainer>
    <AppTopbar />
    <AppMainContainer>
      <router-view v-if="userStore.authAttemptedOnce" />
      <div data-test="app--connecting" v-if="!userStore.authAttemptedOnce">
        Connecting...
      </div>
    </AppMainContainer>
  </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from "@/components/generic/layout/AppContainer.vue";
import AppMainContainer from "@/components/generic/layout/AppMainContainer.vue";
import AppTopbar from "@/components/AppTopbar.vue";
import { useUserStore } from "@/store/user";
import { useWebSocketStore } from "@/store/webSocket";

const userStore = useUserStore();
const webSocketStore = useWebSocketStore();

userStore.$subscribe((a, userState) => {
  if (userState.user) {
    webSocketStore.reconnect();
  } else {
    webSocketStore.disconnect();
  }
});
</script>
