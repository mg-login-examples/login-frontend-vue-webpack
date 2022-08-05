<template>
  <Teleport to="body">
    <div
      ref="modal-backdrop"
      class="fixed z-30 inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center"
      v-if="modelValue"
      @click="closeModal"
      data-test="modal--background"
    >
      <transition
        appear
        enter-active-class="transition ease-out duration-300 transform "
        enter-from-class="opacity-0 translate-y-10 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
      >
        <div
          ref="modal"
          @click.stop=""
          v-bind="$attrs"
          data-test="modal--focus-element-wrapper"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  closeWhenClickOutside?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function closeModal() {
  emit("update:modelValue", false);
}
</script>

<style scoped lang="scss"></style>
