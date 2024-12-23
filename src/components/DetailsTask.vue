<script setup lang="ts">
import { ref, useId, watch } from "vue";

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
const edit = () => (editing.value = true);
const save = () => ((editing.value = false), (model.value.text = crutch.value));

// Buffering model changes with a crutch
// because otherwise on every change the component rerenders and editings is set to false
const crutch = ref<string>(model.value.text);
// Watching for parent resets
watch(model, (value): void => void (crutch.value = value.text));
</script>

<template>
  <input :id="id" v-model="model.done" type="checkbox" />

  <label v-show="!editing" :for="id" :class="$style.label">{{ crutch }}</label>
  <input v-show="editing" v-model="crutch" type="text" />

  <button v-if="editing" type="button" :class="$style.button" @click="save">
    Save
  </button>
  <button v-else type="button" :class="$style.button" @click="edit">
    Edit
  </button>

  <button type="button" :class="$style.button" @click="$emit('remove')">
    Delete
  </button>
</template>

<style lang="css" module>
.label {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
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
}

.button:hover {
  background-color: #aaa;
}
</style>
