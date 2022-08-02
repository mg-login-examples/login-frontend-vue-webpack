<template>
  <div class="h-full bg-white">
    <div class="relative">
      <div class="flex justify-center py-4 text-3xl">Quotes</div>
    </div>
    <div class="flex flex-wrap p-2">
      <QuoteTile
        v-for="quote in quotesStore.quotes"
        :key="quote.id"
        :quote="quote"
        :myQuote="false"
        class="m-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuoteTile from "@/components/Quotes/QuoteTile.vue";
import { useQuotesStore } from "@/store/quotes";

const quotesStore = useQuotesStore();

quotesStore.getQuotes();
</script>
