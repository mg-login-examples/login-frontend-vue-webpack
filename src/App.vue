<template>
  <AppContainer>
    <AppTopbar />
    <AppMainContainer>
      <router-view />
    </AppMainContainer>
  </AppContainer>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppContainer from "@/components/generic/layout/AppContainer.vue";
import AppMainContainer from "@/components/generic/layout/AppMainContainer.vue";
import AppTopbar from "@/components/AppTopbar.vue";

@Options({
  components: {
    AppContainer,
    AppMainContainer,
    AppTopbar,
  },
})
export default class App extends Vue {}
</script>
