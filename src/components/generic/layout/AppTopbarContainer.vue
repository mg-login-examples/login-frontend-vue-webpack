<template>
  <div>
    <div
      class="fixed top-0 z-10 w-full"
      :style="`height: ${topbarHeight ? topbarHeight : 50}px`"
    >
      <slot></slot>
    </div>
    <div :style="`height: ${topbarHeight ? topbarHeight : 50}px`"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  topbarHeight?: number;
}>();
</script>
