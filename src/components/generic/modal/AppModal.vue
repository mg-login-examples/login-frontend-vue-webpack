<template>
  <Teleport to="body">
    <div
      ref="modal-backdrop"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center"
      v-if="modelValue"
      @click="closeModal"
      data-test="modal--background"
    >
      <div
        ref="modal"
        @click.stop=""
        v-bind="$attrs"
        data-test="modal--focus-element-wrapper"
      >
        <slot></slot>
      </div>
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
