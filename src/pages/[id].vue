<script setup lang="ts">
import { $fetch } from "ofetch";
import { createError, useFetch, useRoute } from "#app";
import { ref } from "vue";
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

const model = ref<ITodo>(todo);

const remove = (): Promise<void> => {
  const idx: number = todos.inner.findIndex((value) => value.id === id);
  todos.remove(idx);

  return $fetch(request, {
    method: "DELETE",
  });
};
const put = (): Promise<void> => {
  const idx: number = todos.inner.findIndex((value) => value.id === id);
  todos.update(idx, model.value);

  return $fetch(request, {
    method: "PUT",
    body: model.value,
  });
};
</script>

<template>
  <div :class="$style.div">
    <main :class="$style.main">
      <h1 :class="$style.h1">{{ model.title }}</h1>
      <DetailsTodo :tasks="model.tasks" />
      <div :class="$style.div">
        <div :class="$style.wrapper">
          <Confirmation :class="$style.button" redirect="/" @click="remove">
            <template #click>Delete</template>
            Are you sure you want to delete this TODO?
          </Confirmation>
        </div>
        <div :class="$style.wrapper">
          <button type="button" :class="$style.button">Reset</button>
        </div>
        <div :class="$style.wrapper">
          <NuxtLink to="/" :class="$style.button">Cancel</NuxtLink>
        </div>
        <form :class="$style.wrapper" @submit.prevent="put">
          <button type="submit" :class="$style.button">Update</button>
        </form>
      </div>
    </main>
  </div>
</template>

<style lang="css" module>
.div {
  display: flex;
  flex-direction: row;
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

.wrapper {
  flex: 1 1 0px;
  margin: 0;
  padding: 0;
  border: 0;
  margin-inline: 0.5rem;
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
