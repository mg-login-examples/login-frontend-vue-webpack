<template>
  <div class="flex justify-center items-center p-4">
    <div v-if="emailVerified" data-test="email-verification--user-verified">
      Your email is verified. Thank you
    </div>
    <div
      v-if="userStore.user && !emailVerified"
      data-test="email-verification--user-unverified"
    >
      <div class="text-xl text-center">Email verification required</div>
      <div class="mt-16">
        <div>Please enter the 6 digit code sent to your email address</div>
        <div class="flex justify-center">
          <input
            v-model="emailVerificationCode"
            type="number"
            placeholder="Enter"
            class="w-20 p-2 m-2 bg-slate-200"
            data-test="email-verification--code-input"
          />
          <button
            :disabled="disableSubmitButton"
            @click="verifyEmail"
            class="w-20 p-2 m-2"
            :class="
              !disableSubmitButton
                ? 'bg-gradient-to-r from-rose-300 to-red-300'
                : 'bg-slate-300'
            "
            data-test="email-verification--submit-button"
          >
            Submit
          </button>
        </div>
      </div>
      <div class="flex justify-center">
        <span>Did not receive any email?</span>
        <button
          :disabled="resendWaitTime > 0"
          @click="resendEmail"
          class="pl-2 underline"
          data-test="email-verification--resend-email"
        >
          {{
            resendWaitTime > 0
              ? `Try again in ${resendWaitTime} seconds`
              : "Send Email"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const props = defineProps<{
  user_requested_route?: string;
}>();

const userStore = useUserStore();

const emailVerified = computed(() => userStore.user?.is_verified);

const emailVerificationCode: Ref<number | undefined> = ref();
const disableSubmitButton = computed(() => {
  return (
    emailVerificationCode.value === undefined ||
    emailVerificationCode.value.toString().length !== 6
  );
});

const router = useRouter();

async function verifyEmail() {
  const verificationSuccess = await userStore.verifyEmail(
    emailVerificationCode.value as number
  );
  if (verificationSuccess) {
    if (props.user_requested_route) {
      router.push(props.user_requested_route as string);
    } else {
      router.push("/");
    }
  }
}

// 30 sec countdown timer to prevent frequent calls to resend email function
const resendWaitTime = ref(30);
watch(
  resendWaitTime,
  () => {
    if (resendWaitTime.value > 0) {
      setTimeout(() => {
        resendWaitTime.value = resendWaitTime.value - 1;
      }, 1000);
    }
  },
  { immediate: true }
);

async function resendEmail() {
  if (resendWaitTime.value <= 0) {
    const resendSuccess = await userStore.resendEmail();
    if (resendSuccess) {
      // start countdown. Vue watcher will be triggered, and automatically countdown
      resendWaitTime.value = 30;
    }
  }
}
</script>
