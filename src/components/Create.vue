<script setup lang="ts">
import { $fetch } from "ofetch";
import { useId } from "#app";
import { useTemplateRef } from "vue";
import { useTodos } from "~/todos.ts";

const todos = useTodos();

const dialog = useTemplateRef("dialog");
const createTextId = useId();

const open = () => dialog.value?.showModal();
const close = () => dialog.value?.close();

const submit = (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement;
  const data = new FormData(form);

  const title = data.get("title") as string;
  const tasks = (data.getAll("tasks[]") as string[]).filter(
    (task) => task.length > 0,
  );
  const body = todos.append(title, tasks);
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
  <button type="button" :class="$style.button" @click="open">
    <h1 :class="$style.h1">Create</h1>
  </button>

  <dialog ref="dialog" :class="$style.dialog">
    <form
      action="/api/todos"
      method="POST"
      :class="$style.form"
      @submit.prevent="submit"
    >
      <label :for="createTextId"><h1 :class="$style.h1">Title</h1></label>
      <input
        :id="createTextId"
        name="title"
        type="text"
        required
        minlength="1"
      />

      <template v-for="idx in Array(5).keys()" :key="idx">
        <label :for="`${createTextId}-${idx}`">Task</label>
        <input
          :id="`${createTextId}-${idx}`"
          type="text"
          name="tasks[]"
          minlength="1"
        />
      </template>

      <button
        type="button"
        formnovalidate
        :class="$style.button"
        @click="close"
      >
        Cancel
      </button>
      <button type="submit" :class="$style.button">Submit</button>
    </form>
  </dialog>
</template>

<style lang="css" module>
.button {
  padding: 0.5rem;
  margin: 0;
  border: 1px solid gray;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

.h1 {
  margin: 0;
}

.button:hover {
  background-color: #aaa;
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
