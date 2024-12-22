<script setup lang="ts">
import { createError, useFetch, useRoute, useId } from "#app";
import { useTodos, type ITodo } from "~/todos.ts";

const { data } = await useFetch("/api/todos");

function filterTodos(value: ITodo[] | undefined): ITodo[] {
  return (
    value?.map(({ id, text, done }) => ({ id, text, done }) satisfies ITodo) ??
    []
  );
}

const todos = useTodos();
todos.init(filterTodos(data.value));

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

const todo: ITodo | undefined = todos.inner.find(value => value.id === id);
if (!todo) {
  throw createError({
    status: 404,
    statusText: `TODO with id ${slug} doesn't exist`,
  });
}

const forId = useId();
</script>

<template>
  <div :class="$style.div">
    <main :class="$style.main">

      <input :id="forId" type="checkbox" />
      <label :for="forId">Done</label>
      
      <p :class="$style.p">Text</p>
      <p :class="$style.p">{{ todo.text }}</p>
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
  gap: 2rem;
}

.p {
  margin: 0;
}
</style>
