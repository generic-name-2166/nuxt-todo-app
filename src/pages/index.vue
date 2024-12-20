<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import { useFetch, useId } from "#app";
import type { ITodo } from "~/todos.ts";

const { data } = await useFetch("/api/todos");
console.log(data.value);
const todos = computed<[number, ITodo][]>(() =>
  (data.value as ITodo[]).map((value, index) => [index, value]),
);

const dialog = useTemplateRef("dialog");
const createTextId = useId();

const open = () => dialog.value?.showModal();
const close = () => dialog.value?.close();
</script>

<template>
  <main>
    <div>
      <p v-for="[key, todo] in todos" :key="key">{{ todo.text }}</p>
      <p v-if="todos.length < 1">Add a todo!</p>
    </div>

    <button type="button" @click="open">Create</button>

    <dialog ref="dialog">
      <form action="/api/todos" method="POST">
        <label :for="createTextId">Text</label>
        <input
          :id="createTextId"
          name="text"
          type="text"
          required
          minlength="1"
        />

        <button type="button" formnovalidate @click="close">Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </dialog>
  </main>
</template>
