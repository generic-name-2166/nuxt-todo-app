<script setup lang="ts">
import type { ITodo } from "~/todos.ts";
import { removeAt } from "~/utils.ts";

const tasks = defineModel<ITodo["tasks"]>({ required: true });

const remove = (idx: number): void =>
  void (tasks.value = removeAt(tasks.value, idx));

const append = (): void =>
  void (tasks.value = tasks.value.concat([
    { done: false, text: "" } satisfies ITodo["tasks"][0],
  ]));
</script>

<template>
  <div :class="$style.div">
    <!-- https://stackoverflow.com/a/68655002 -->
    <DetailsTask
      v-for="(task, idx) in tasks"
      :key="task.text"
      v-model="tasks[idx]!"
      @remove="remove(idx)"
    />

    <button type="button" :class="$style.button" @click="append">Add</button>
  </div>
</template>

<style lang="css" module>
.div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 4fr) repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
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
  grid-column: span 4;
  justify-self: end;
}

.button:hover {
  background-color: #aaa;
}
</style>
