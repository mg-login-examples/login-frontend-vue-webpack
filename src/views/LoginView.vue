<template>
  <div class="h-full flex justify-center items-center">
    <div
      class="bg-blue-500 w-96 h-80 flex flex-col justify-center items-center p-4"
    >
      <div>
        <input
          v-model="userEmail"
          placeholder="Email"
          type="text"
          class="m-4 p-2"
          data-test="login--user-email-input"
        />
      </div>
      <div>
        <input
          v-model="userPassword"
          type="text"
          placeholder="Password"
          class="m-4 p-2"
          data-test="login--user-password-input"
        />
      </div>
      <div>
        <button
          @click="login"
          class="bg-white m-4 p-2"
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

const userStore = useUserStore();
async function login() {
  const isLoginSuccess = await userStore.login(
    userEmail.value,
    userPassword.value
  );
  if (isLoginSuccess) {
    router.push("/");
  }
}
</script>
