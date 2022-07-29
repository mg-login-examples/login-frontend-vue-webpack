<template>
  <div class="p-4 bg-white w-96">
    <div class="flex justify-center my-4 text-2xl">Write A Quote</div>
    <div class="my-4">
      <textarea
        v-model="quoteText"
        class="p-2 w-full h-32 bg-slate-300"
        placeholder="enter your own quote"
        data-test="user-quote--create-quote--quote-text"
      ></textarea>
    </div>
    <div class="flex justify-end my-4">
      <button
        @click="cancel"
        data-test="user-quote--create-quote--cancel-button"
        class="bg-slate-400 mx-2 p-2"
      >
        Cancel
      </button>
      <button
        @click="save"
        data-test="user-quote--create-quote--save-quote-button"
        class="bg-slate-400 p-2 mx-2"
        :disabled="quoteText === ''"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const quoteText = ref("");

function save() {
  emit("saveQuote", quoteText.value);
}
function cancel() {
  emit("cancelCreateQuote");
}
const emit = defineEmits<{
  (e: "saveQuote", quoteText: string): void;
  (e: "cancelCreateQuote"): void;
}>();
</script>
