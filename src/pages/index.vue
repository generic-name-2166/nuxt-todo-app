<script setup lang="ts">
import { useFetch } from "#app";
import { useTodos, type ITodo } from "~/todos.ts";

const { data } = await useFetch("/api/todos");

function filterTodos(value: ITodo[] | undefined): ITodo[] {
  return (
    value?.map(
      ({ id, title, tasks }) => ({ id, title, tasks }) satisfies ITodo,
    ) ?? []
  );
}

const todos = useTodos();
todos.init(filterTodos(data.value));
</script>

<template>
  <main :class="$style.main">
    <TodoTable />

    <Create />
  </main>
</template>

<style lang="css" module>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
