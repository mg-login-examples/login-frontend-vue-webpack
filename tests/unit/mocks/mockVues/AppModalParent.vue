<template>
  <div>
    <AppModal v-model="showModal">
      <AppModalContent />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import AppModal from "@/components/generic/modal/AppModal.vue";
import AppModalContent from "./AppModalContent.vue";

const showModal = ref(false);

defineExpose({ showModal });
</script>
