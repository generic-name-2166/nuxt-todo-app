<script setup lang="ts">
import type { ITodo } from "~/todos.ts";

const tasks = defineModel<ITodo["tasks"]>({ required: true });
</script>

<template>
  <div :class="$style.div">
    <DetailsTask
      v-for="(task, idx) in tasks"
      :key="task.text"
      v-model="tasks[idx]!"
    />
    <!-- https://stackoverflow.com/a/68655002 -->
  </div>
</template>

<style lang="css" module>
.div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
  gap: 0.5rem;
}
</style>
