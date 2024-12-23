<script setup lang="ts">
import { ref, useId } from "vue";

interface TodoTaskModel {
  text: string;
  done: boolean;
}

const model = defineModel<TodoTaskModel>({ required: true });
interface TodoTaskEmits {
  remove: [];
}
defineEmits<TodoTaskEmits>();

const id = useId();

const editing = ref<boolean>(false);
const toggle = (): void => void (editing.value = !editing.value);
</script>

<template>
  <input :id="id" v-model="model.done" type="checkbox" />

  <label v-show="!editing" :for="id" :class="$style.label">{{
    model.text
  }}</label>
  <input v-show="editing" v-model="model.text" type="text" />

  <button type="button" @click="toggle">Edit</button>

  <button type="button" @click="$emit('remove')">Delete</button>
</template>

<style lang="css" module>
.label {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}
</style>
