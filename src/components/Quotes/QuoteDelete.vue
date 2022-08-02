<template>
  <div class="p-4 bg-white w-96">
    <div class="flex justify-center my-4 text-1xl">Delete Quote ?</div>
    <div class="my-4">
      <div class="text-2xl" data-test="user-quote--delete-quote--quote-text">
        {{ quote?.text }}
      </div>
    </div>
    <div class="flex justify-end my-4">
      <button
        @click="cancel"
        data-test="user-quote--delete-quote--cancel-button"
        class="bg-slate-400 mx-2 p-2"
      >
        Cancel
      </button>
      <button
        @click="deleteQuote"
        data-test="user-quote--delete-quote--delete-quote-button"
        class="bg-slate-400 p-2 mx-2"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Quote } from "@/models/quote.model";

const props = defineProps<{
  quote?: Quote;
}>();

function deleteQuote() {
  emit("deleteQuote", props.quote?.id);
}
function cancel() {
  emit("cancelDeleteQuote");
}
const emit = defineEmits<{
  (e: "deleteQuote", quoteId: number | undefined): void;
  (e: "cancelDeleteQuote"): void;
}>();
</script>
