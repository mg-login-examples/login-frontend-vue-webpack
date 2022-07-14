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
          data-test="login--user-email-input"
        />
      </div>
      <div class="w-72 my-3 relative">
        <button
          class="absolute w-6 right-4 top-0 bottom-0 m-auto h-6 opacity-60"
          @click="togglePasswordVisibility"
          tabindex="-1"
          data-test="login--show-password-button"
        >
          <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
        </button>
        <input
          v-model="userPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="w-72 p-2 bg-slate-200"
          data-test="login--user-password-input"
        />
      </div>
      <div class="w-72 flex my-3">
        <input
          type="checkbox"
          v-model="rememberMe"
          data-test="login--remember-me-checkbox"
        />
        <div class="mx-2">Remember Me</div>
      </div>
      <div>
        <button
          @click="login"
          class="w-72 my-3 p-2 bg-white bg-gradient-to-r from-orange-300 via-red-300 to-red-500"
          data-test="login--submit-button"
        >
          LOGIN
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userEmail = ref("");
const userPassword = ref("");
const rememberMe = ref(false);

const showPassword = ref(false);

const userStore = useUserStore();
async function login() {
  const isLoginSuccess = await userStore.login(
    userEmail.value,
    userPassword.value,
    rememberMe.value
  );
  if (isLoginSuccess) {
    router.push("/");
  }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>
