<template>
  <div class="h-full bg-white">
    <div class="relative">
      <div class="flex justify-center py-4 text-3xl">My Quotes</div>
      <div class="absolute right-0 top-0 bottom-0 flex items-center">
        <button
          class="mr-4 px-4 py-2 flex bg-rose-300 justify-center items-center"
          @click="showCreateQuoteModal = true"
          data-test="user-quote--open-create-quote-modal-button"
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
        :myQuote="true"
        class="m-2"
        @deleteQuote="getDeleteQuoteConfirmation"
      />
    </div>
    <AppModal v-model="showCreateQuoteModal" class="bg-white">
      <QuoteCreate
        @saveQuote="createQuote"
        @cancelCreateQuote="showCreateQuoteModal = false"
      ></QuoteCreate>
    </AppModal>
    <AppModal v-model="showDeleteQuoteModal" class="bg-white">
      <QuoteDelete
        :quote="quoteToDelete"
        @deleteQuote="deleteQuote"
        @cancelDeleteQuote="showDeleteQuoteModal = false"
      ></QuoteDelete>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";

import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import AppModal from "@/components/generic/modal/AppModal.vue";
import QuoteCreate from "@/components/Quotes/QuoteCreate.vue";
import QuoteDelete from "@/components/Quotes/QuoteDelete.vue";
import { useQuotesStore } from "@/store/quotes";
import { Quote } from "@/models/quote.model";

const quotesStore = useQuotesStore();

quotesStore.getUserQuotes();

// Create quote
const showCreateQuoteModal = ref(false);

async function createQuote(quoteText: string) {
  await quotesStore.createUserQuote(quoteText);
  showCreateQuoteModal.value = false;
}

// Delete quote
const showDeleteQuoteModal = ref(false);
const quoteToDelete = ref<Quote | undefined>(undefined);

async function getDeleteQuoteConfirmation(quoteId: number) {
  quoteToDelete.value = quotesStore.userQuoteById(quoteId);
  showDeleteQuoteModal.value = true;
}
async function deleteQuote(quoteId: number | undefined) {
  if (quoteId) {
    await quotesStore.deleteUserQuote(quoteId as number);
  }
  showDeleteQuoteModal.value = false;
}

// window resize listener
const windowInnerWidth = ref(window.innerWidth);
function updateWindowInnerWidth() {
  windowInnerWidth.value = window.innerWidth;
}
window.addEventListener("resize", updateWindowInnerWidth);
onUnmounted(() => {
  window.removeEventListener("resize", updateWindowInnerWidth);
});
</script>
