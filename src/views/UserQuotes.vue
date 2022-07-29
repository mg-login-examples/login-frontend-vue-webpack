<template>
  <div class="h-full bg-white">
    <div class="relative">
      <div class="flex justify-center py-4 text-3xl">My Quotes</div>
      <div class="absolute right-0 top-0 bottom-0 flex items-center">
        <button
          class="mr-4 px-4 py-2 flex bg-rose-300 justify-center items-center"
          @click="showCreateQuoteModal = true"
          data-test="user-quote--open-create-quote-dialog-button"
        >
          <span v-if="windowInnerWidth >= 400">Create</span>
          <font-awesome-icon v-if="windowInnerWidth < 400" icon="plus" />
        </button>
      </div>
    </div>
    <div class="flex flex-wrap p-2">
      <QuoteTile
        v-for="quote in quotesStore.userQuotes"
        :key="quote.id"
        :quote="quote"
        :background="'my-quotes'"
        class="m-2"
      />
    </div>
    <AppModal v-model="showCreateQuoteModal" class="bg-white">
      <QuoteCreate
        @saveQuote="createQuote"
        @cancelCreateQuote="showCreateQuoteModal = false"
      ></QuoteCreate>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";

import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import AppModal from "@/components/generic/modal/AppModal.vue";
import QuoteCreate from "@/components/Quotes/QuoteCreate.vue";
import { useQuotesStore } from "@/store/quotes";

const quotesStore = useQuotesStore();

quotesStore.getUserQuotes();

const showCreateQuoteModal = ref(false);

async function createQuote(quoteText: string) {
  await quotesStore.createUserQuote(quoteText);
  showCreateQuoteModal.value = false;
}

const windowInnerWidth = ref(window.innerWidth);
function updateWindowInnerWidth() {
  windowInnerWidth.value = window.innerWidth;
}
window.addEventListener("resize", updateWindowInnerWidth);
onUnmounted(() => {
  window.removeEventListener("resize", updateWindowInnerWidth);
});
</script>
