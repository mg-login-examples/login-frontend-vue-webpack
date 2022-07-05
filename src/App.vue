<template>
  <AppContainer>
    <AppTopbar />
    <AppMainContainer>
      <router-view v-if="initAuth" />
      <div data-test="app--connecting" v-if="!initAuth">Connecting...</div>
    </AppMainContainer>
  </AppContainer>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppContainer from "@/components/generic/layout/AppContainer.vue";
import AppMainContainer from "@/components/generic/layout/AppMainContainer.vue";
import AppTopbar from "@/components/AppTopbar.vue";
import { useUserStore } from "@/store/user";

@Options({
  components: {
    AppContainer,
    AppMainContainer,
    AppTopbar,
  },
})
export default class App extends Vue {
  initAuth = false;
  userStore = useUserStore();

  mounted() {
    this.authenticate();
  }

  async authenticate() {
    await this.userStore.authenticate();
    this.initAuth = true;
  }
}
</script>
