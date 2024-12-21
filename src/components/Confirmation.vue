<script setup lang="ts">
import { useTemplateRef } from "vue";

const dialog = useTemplateRef("dialog");

const open = () => dialog.value?.showModal();
const close = () => dialog.value?.close();

defineExpose({
  open,
  close,
});
</script>

<template>
  <button type="button" @click="open">
    <slot name="click" />
  </button>
  <dialog ref="dialog">
    <p><slot /></p>
    <button type="button" @click="close">
      <slot name="cancel">Cancel</slot>
    </button>
    <button type="submit">
      <slot name="submit">Confirm</slot>
    </button>
  </dialog>
</template>

<style lang="css" module></style>
