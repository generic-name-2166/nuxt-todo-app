<script setup lang="ts">
import { createError, useFetch, useRoute } from "#app";
import { useTodos, type ITodo } from "~/todos.ts";

const route = useRoute();
const slug = route.params.id;
if (!slug || typeof slug !== "string") {
  throw createError({
    status: 404,
    statusText: `TODO with id ${slug} doesn't exist`,
  });
}
let id: number;
try {
  id = parseInt(slug);
} catch {
  throw createError({
    status: 404,
    statusText: `TODO with id ${slug} doesn't exist`,
  });
}

const request = `/api/todos/${id}`;
const { data } = await useFetch(request);

function filterTodo(value: ITodo | undefined, slug: string): ITodo {
  if (!value) {
    throw createError({
      status: 404,
      statusText: `TODO with id ${slug} doesn't exist aaa`,
    });
  }
  return {
    id: value.id,
    title: value.title,
    tasks: value.tasks,
  } satisfies ITodo;
}

const todos = useTodos();
const serverTodo = filterTodo(data.value as ITodo | undefined, slug);
if (todos.inner.length < 1) {
  todos.init([serverTodo]);
}

const todo: ITodo = todos.inner.find((value) => value.id === id) ?? serverTodo;
</script>

<template>
  <div :class="$style.div">
    <main :class="$style.main">
      <h1 :class="$style.h1">{{ todo.title }}</h1>
      <DetailsTodo :tasks="todo.tasks" />
    </main>
  </div>
</template>

<style lang="css" module>
.div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  border: 1px solid gray;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.h1 {
  margin: 0;
  grid-column: span 2 / span 2;
}

.p {
  margin: 0;
}
</style>
