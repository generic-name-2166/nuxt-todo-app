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
  <button type="button" :class="$style.button" @click="open">
    <slot name="click" />
  </button>
  <dialog ref="dialog">
    <p><slot /></p>
    <button type="button" :class="$style.button" @click="close">
      <slot name="cancel">Cancel</slot>
    </button>
    <button type="submit" :class="$style.button">
      <slot name="submit">Confirm</slot>
    </button>
  </dialog>
</template>

<style lang="css" module>
.button {
  width: 100%;
  height: 100%;
  padding-inline: 0;
  padding-block: 2px;
  border: 1px solid gray;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: medium;
}

.button:hover {
  background-color: #aaa;
}
</style>
