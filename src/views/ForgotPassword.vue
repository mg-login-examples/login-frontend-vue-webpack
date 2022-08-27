<template>
  <div class="h-full flex justify-center items-center bg-slate-100">
    <div
      class="bg-white w-96 h-80 flex flex-col justify-center items-center p-4"
    >
      <div v-if="!emailSent" class="w-72">
        <div class="w-full my-3">
          Enter your email address and we'll send you a link to reset your
          password.
        </div>
        <div class="w-full my-3">
          <input
            v-model="userEmail"
            placeholder="Email"
            type="text"
            class="w-full p-2 bg-slate-200"
            data-test="forgot-password--user-email-input"
          />
        </div>
        <div>
          <button
            @click="sendEmailWithPasswordResetLink"
            class="w-full my-3 p-2"
            data-test="forgot-password--submit-button"
            :disabled="!enableSubmitButton"
            :class="
              enableSubmitButton
                ? 'bg-gradient-to-r from-orange-300 via-red-300 to-red-500'
                : 'bg-slate-300'
            "
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
      <div v-if="emailSent">
        <div>
          A password reset message was sent to your email. Please click the link
          in that message to reset your password.
        </div>
        <button
          @click="router.push('/login')"
          class="w-full my-3 p-2 bg-gradient-to-r from-orange-300 via-red-300 to-red-500"
          data-test="forgot-password--login-button"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/store/user";

const router = useRouter();

const userEmail = ref("");
const emailSent = ref(false);

const emailValid = computed(() => {
  const matchesEmailPattern = String(userEmail.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return matchesEmailPattern !== null;
});

const enableSubmitButton = computed(() => {
  return emailValid.value;
});

const userStore = useUserStore();
async function sendEmailWithPasswordResetLink() {
  const isUserCreationSuccess = await userStore.sendEmailWithPasswordResetLink(
    userEmail.value
  );
  if (isUserCreationSuccess) {
    emailSent.value = true;
  }
  emailSent.value = true;
}
</script>
