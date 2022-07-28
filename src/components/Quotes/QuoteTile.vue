<template>
  <div
    class="p-2 w-48 h-36 overflow-scroll bg-gradient-to-br"
    :class="
      background === 'my-quotes'
        ? 'from-red-100 to-red-200'
        : 'from-orange-100 to-orange-200'
    "
    data-test="quote-tile"
  >
    <div data-test="quote-tile--text">
      {{ quote.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Quote } from "@/models/quote.model";
defineProps<{
  quote: Quote;
  background?: string;
}>();
</script>
