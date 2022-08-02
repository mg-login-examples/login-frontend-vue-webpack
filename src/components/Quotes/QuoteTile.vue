<template>
  <div
    class="relative p-2 w-48 h-36 overflow-scroll bg-gradient-to-br"
    :class="
      myQuote ? 'from-red-100 to-red-200' : 'from-orange-100 to-orange-200'
    "
    @mouseover="tileHover = true"
    @mouseleave="tileHover = false"
    data-test="quote-tile"
  >
    <div data-test="quote-tile--text">
      {{ quote.text }}
    </div>
    <div class="absolute right-0 bottom-0">
      <button
        v-if="myQuote && tileHover"
        @click="deleteQuote"
        class="m-4"
        data-test="quote-tile--delete-quote-button"
      >
        <font-awesome-icon icon="trash" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Quote } from "@/models/quote.model";
const props = defineProps<{
  quote: Quote;
  myQuote?: boolean;
}>();

const tileHover = ref(false);

function deleteQuote() {
  emit("deleteQuote", props.quote.id);
}

const emit = defineEmits<{
  (e: "deleteQuote", quoteId: number): void;
}>();
</script>
