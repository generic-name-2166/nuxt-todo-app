<script setup lang="ts">
import { useId } from "vue";

interface TodoTaskModel {
  text: string;
  done: boolean;
}

const model = defineModel<TodoTaskModel>({ required: true });

const id = useId();
</script>

<template>
  <input :id="id" v-model="model.done" type="checkbox" />

  <label :for="id" :class="$style.label">{{ model.text }}</label>
</template>

<style lang="css" module>
.label {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}
</style>
