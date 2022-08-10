<template>
  <div
    class="relative w-48 h-36 m-2 bg-gradient-to-br"
    :class="
      myQuote ? 'from-red-100 to-red-200' : 'from-orange-100 to-orange-200'
    "
    @mouseover="tileHover = true"
    @mouseleave="tileHover = false"
    data-test="quote-tile"
  >
    <div class="w-full h-full p-2 overflow-scroll hide-scrollbar">
      <div data-test="quote-tile--text">{{ quote.text }}</div>
      <div
        v-if="!myQuote"
        class="whitespace-nowrap truncate"
        data-test="quote-tile--author-username"
      >
        - {{ getQuoteAuthorUsername() }}
      </div>
    </div>
    <div
      v-if="!myQuote && (tileHover || userLiked) && userStore.user"
      class="absolute right-0 bottom-0"
    >
      <button
        v-if="!userLiked"
        @click="likeQuote"
        class="w-8 h-8"
        data-test="quote-tile--like-quote-button"
      >
        <font-awesome-icon :icon="['far', 'thumbs-up']" />
      </button>
      <button
        v-if="userLiked"
        @click="unlikeQuote"
        class="w-8 h-8"
        data-test="quote-tile--unlike-quote-button"
      >
        <font-awesome-icon :icon="['fas', 'thumbs-up']" />
      </button>
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
import { ref, computed } from "vue";

import { Quote } from "@/models/quote.model";
import { useUserStore } from "@/store/user";

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

function likeQuote() {
  emit("likeQuote", props.quote.id);
}

function unlikeQuote() {
  emit("unlikeQuote", props.quote.id);
}

const emit = defineEmits<{
  (e: "deleteQuote", quoteId: number): void;
  (e: "editQuote", quoteId: number): void;
  (e: "likeQuote", quoteId: number): void;
  (e: "unlikeQuote", quoteId: number): void;
}>();

function getQuoteAuthorUsername() {
  return props.quote.author.email.split("@")[0];
}

const userStore = useUserStore();

const userLiked = computed(() => {
  const userInLikedUsers = props.quote.liked_by_users.find(
    (likedUsers) => userStore.user && likedUsers.id === userStore.user.id
  );
  return userInLikedUsers !== undefined;
});
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
