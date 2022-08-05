<template>
  <div class="h-full bg-white">
    <div class="relative">
      <div class="flex justify-center py-4 text-3xl">My Quotes</div>
      <div class="absolute right-0 top-0 bottom-0 flex items-center">
        <button
          class="mr-4 px-4 py-2 flex bg-rose-300 justify-center items-center"
          @click="openCreateQuoteModal"
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
        @editQuote="openEditQuoteModal"
        @deleteQuote="openDeleteQuoteConfirmation"
      />
    </div>
    <AppModal v-model="showCreateQuoteModal" class="bg-white">
      <QuoteCreateEdit
        :quote="quoteToEdit"
        @createQuote="createQuote"
        @editQuote="editQuote"
        @cancel="showCreateQuoteModal = false"
      ></QuoteCreateEdit>
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
import QuoteCreateEdit from "@/components/Quotes/QuoteCreateEdit.vue";
import QuoteDelete from "@/components/Quotes/QuoteDelete.vue";
import { useQuotesStore } from "@/store/quotes";
import { Quote } from "@/models/quote.model";

const quotesStore = useQuotesStore();

quotesStore.getUserQuotes();

// Create/Edit quote
const showCreateQuoteModal = ref(false);
const quoteToEdit = ref<Quote | undefined>(undefined);

function openCreateQuoteModal() {
  quoteToEdit.value = undefined;
  showCreateQuoteModal.value = true;
}
async function createQuote(quoteText: string) {
  await quotesStore.createUserQuote(quoteText);
  showCreateQuoteModal.value = false;
}

function openEditQuoteModal(quoteId: number) {
  quoteToEdit.value = quotesStore.userQuoteById(quoteId);
  showCreateQuoteModal.value = true;
}
async function editQuote(quote: Quote) {
  await quotesStore.editUserQuote(quote);
  showCreateQuoteModal.value = false;
}

// Delete quote
const showDeleteQuoteModal = ref(false);
const quoteToDelete = ref<Quote | undefined>(undefined);

async function openDeleteQuoteConfirmation(quoteId: number) {
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
