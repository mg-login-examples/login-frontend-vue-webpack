<template>
  <div class="p-4 bg-white w-96">
    <div
      class="flex justify-center my-4 text-2xl"
      data-test="user-quote--create-edit-quote--title"
    >
      {{ quote ? "Edit Quote" : "Write A Quote" }}
    </div>
    <div class="my-4">
      <textarea
        v-model="quoteText"
        class="p-2 w-full h-32 bg-slate-300"
        placeholder="enter your own quote"
        data-test="user-quote--create-edit-quote--quote-text"
      ></textarea>
    </div>
    <div class="flex justify-end my-4">
      <button
        @click="cancel"
        data-test="user-quote--create-edit-quote--cancel-button"
        class="bg-slate-400 mx-2 p-2"
      >
        Cancel
      </button>
      <button
        @click="save"
        data-test="user-quote--create-edit-quote--save-quote-button"
        class="bg-slate-400 p-2 mx-2"
        :disabled="quoteText === ''"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { Quote } from "@/models/quote.model";

const props = defineProps<{
  quote?: Quote;
}>();

const quoteText = ref("");

watch(
  () => props.quote,
  (newQuote) => {
    if (newQuote) {
      quoteText.value = newQuote.text;
    }
  },
  { immediate: true }
);

function save() {
  if (props.quote) {
    const quoteEdited: Quote = { ...props.quote, text: quoteText.value };
    emit("editQuote", quoteEdited);
  } else {
    emit("createQuote", quoteText.value);
  }
}
function cancel() {
  emit("cancel");
}
const emit = defineEmits<{
  (e: "createQuote", quoteText: string): void;
  (e: "editQuote", quote: Quote): void;
  (e: "cancel"): void;
}>();
</script>
