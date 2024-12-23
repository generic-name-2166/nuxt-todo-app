<script setup lang="ts">
import { removeAt, type ITodo } from "~/todos.ts";

const tasks = defineModel<ITodo["tasks"]>({ required: true });

const remove = (idx: number): void =>
  void (tasks.value = removeAt(tasks.value, idx));
</script>

<template>
  <div :class="$style.div">
    <DetailsTask
      v-for="(task, idx) in tasks"
      :key="task.text"
      v-model="tasks[idx]!"
      @remove="remove(idx)"
    />
    <!-- https://stackoverflow.com/a/68655002 -->
  </div>
</template>

<style lang="css" module>
.div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 4fr) repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
}
</style>
