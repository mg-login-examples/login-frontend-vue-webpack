<template>
  <div class="h-full bg-white">
    <div class="flex justify-center py-2">Quotes</div>
    <div class="flex flex-wrap p-2">
      <QuoteTile
        v-for="quote in quotesStore.quotes"
        :key="quote.id"
        :quote="quote"
        class="m-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuoteTile from "@/components/QuoteTile.vue";
import { useQuotesStore } from "@/store/quotes";

const quotesStore = useQuotesStore();

quotesStore.getQuotes();
</script>
