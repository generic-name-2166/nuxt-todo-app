<script setup lang="ts">
import { useTemplateRef } from "vue";

const dialog = useTemplateRef("dialog");

const open = () => dialog.value?.showModal();
const close = () => dialog.value?.close();

defineExpose({
  open,
  close,
});

interface ConfirmationEmits {
  click: [];
}

const emit = defineEmits<ConfirmationEmits>();

interface ConfirmationProps {
  class?: string;
  redirect?: string;
}

const props = defineProps<ConfirmationProps>();
</script>

<template>
  <button type="button" :class="props.class" @click="open">
    <slot name="click" />
  </button>
  <dialog ref="dialog">
    <p><slot /></p>
    <div :class="$style.div">
      <button type="button" :class="$style.button" @click="close">
        <slot name="cancel">Cancel</slot>
      </button>
      <button
        v-if="props.redirect === undefined"
        type="submit"
        :class="$style.button"
        @click="emit('click')"
      >
        <slot name="submit">Confirm</slot>
      </button>
      <NuxtLink
        v-else
        :to="props.redirect"
        :class="$style.button"
        @click="emit('click')"
      >
        <slot name="submit">Confirm</slot>
      </NuxtLink>
    </div>
  </dialog>
</template>

<style lang="css" module>
.div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.button {
  padding: 0.5rem;
  margin: 0;
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
