<template>
  <div class="h-full flex justify-center items-center bg-slate-100">
    <div
      class="bg-white w-96 h-80 flex flex-col justify-center items-center p-4"
    >
      <div class="w-72 my-3">
        <input
          v-model="userEmail"
          placeholder="Email"
          type="text"
          class="w-full p-2 bg-slate-200"
          data-test="signup--user-email-input"
        />
      </div>
      <div class="w-72 my-3 relative">
        <button
          class="absolute w-6 right-4 top-0 bottom-0 m-auto h-6 opacity-60"
          @click="togglePasswordVisibility"
          tabindex="-1"
          data-test="signup--show-password-button"
        >
          <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
        </button>
        <input
          v-model="userPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="w-72 p-2 bg-slate-200"
          data-test="signup--user-password-input"
        />
      </div>
      <div class="w-72 my-3 relative">
        <input
          v-model="userPasswordConfirm"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Confirm Password"
          class="w-72 p-2 bg-slate-200"
          data-test="signup--user-confirm-password-input"
        />
      </div>
      <div>
        <button
          @click="createUser"
          class="w-72 my-3 p-2"
          data-test="signup--submit-button"
          :disabled="!enableSubmitButton"
          :class="
            enableSubmitButton
              ? 'bg-gradient-to-r from-orange-300 via-red-300 to-red-500'
              : 'bg-slate-300'
          "
        >
          SIGN UP
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import passwordValidator from "password-validator";

import { useUserStore } from "@/store/user";

const router = useRouter();

const userEmail = ref("");
const userPassword = ref("");
const userPasswordConfirm = ref("");

const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

const emailValid = computed(() => {
  const matchesEmailPattern = String(userEmail.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return matchesEmailPattern !== null;
});
const passwordsMatch = computed(
  () => userPassword.value === userPasswordConfirm.value
);
const passwordValidationSchema = new passwordValidator();
passwordValidationSchema.is().min(8).is().max(20).has().not().spaces();
const passwordValid = computed(() => {
  return passwordValidationSchema.validate(userPassword.value);
});
const enableSubmitButton = computed(() => {
  return emailValid.value && passwordsMatch.value && passwordValid.value;
});

const userStore = useUserStore();
async function createUser() {
  const isUserCreationSuccess = await userStore.createUser(
    userEmail.value,
    userPassword.value
  );
  if (isUserCreationSuccess) {
    router.push({ name: "verifyEmail" });
  }
}
</script>
