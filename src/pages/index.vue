<script setup lang="ts">
import { $fetch } from "ofetch";
import { useTemplateRef } from "vue";
import { useFetch, useId } from "#app";
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

const dialog = useTemplateRef("dialog");
const createTextId = useId();

const open = () => dialog.value?.showModal();
const close = () => dialog.value?.close();

const submit = (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement;
  const data = new FormData(form);

  const body = todos.append(data.get("text") as string);
  close();
  form.reset();

  const route = form.action;
  const method = form.method;
  return $fetch(route, {
    method,
    body,
  });
};
</script>

<template>
  <main :class="$style.main">
    <TodoTable />

    <button type="button" @click="open">Create</button>

    <dialog ref="dialog" :class="$style.dialog">
      <form
        action="/api/todos"
        method="POST"
        :class="$style.form"
        @submit.prevent="submit"
      >
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

<style lang="css" module>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog {
  border-radius: 1rem;
}

.form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}
</style>
