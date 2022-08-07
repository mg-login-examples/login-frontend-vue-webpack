<template>
  <div
    class="relative p-2 w-48 h-36 flex flex-col bg-gradient-to-br"
    :class="
      myQuote ? 'from-red-100 to-red-200' : 'from-orange-100 to-orange-200'
    "
    @mouseover="tileHover = true"
    @mouseleave="tileHover = false"
    data-test="quote-tile"
  >
    <div class="grow overflow-scroll" data-test="quote-tile--text">
      {{ quote.text }}
    </div>
    <div
      v-if="!myQuote"
      class="basis-6 whitespace-nowrap truncate"
      data-test="quote-tile--author-username"
    >
      - {{ getQuoteAuthorUsername() }}
    </div>
    <div v-if="myQuote && tileHover" class="absolute left-0 bottom-0">
      <button
        @click="editQuote"
        class="m-4"
        data-test="quote-tile--edit-quote-button"
      >
        <font-awesome-icon icon="pencil" />
      </button>
    </div>
    <div v-if="myQuote && tileHover" class="absolute right-0 bottom-0">
      <button
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

function editQuote() {
  emit("editQuote", props.quote.id);
}

function deleteQuote() {
  emit("deleteQuote", props.quote.id);
}

const emit = defineEmits<{
  (e: "deleteQuote", quoteId: number): void;
  (e: "editQuote", quoteId: number): void;
}>();

function getQuoteAuthorUsername() {
  return props.quote.author.email.split("@")[0];
}
</script>
