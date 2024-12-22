<script setup lang="ts">
import { $fetch } from "ofetch";
import { useTemplateRef } from "vue";
import { useTodos, type ITodo } from "~/todos.ts";

interface TodoRowProps {
  todo: ITodo;
  idx: number;
}

const props = defineProps<TodoRowProps>();
const todo = props.todo;

const todos = useTodos();
const remove = (idx: number): void => todos.remove(idx);

interface ConfirmationRef {
  open(): void;
  close(): void;
}

const refKey = `confrimation-${props.idx}`;
const ref = useTemplateRef<ConfirmationRef>(refKey);

const route = `/api/todos/${todo.id}`;

const submit = (): Promise<void> => {
  ref.value?.close();
  remove(props.idx);
  return $fetch(route, {
    method: "DELETE",
  });
};
</script>

<template>
  <p :class="$style.p">{{ todo.title }}</p>
  <NuxtLink :href="`/${todo.id}`" :class="$style.a">Edit</NuxtLink>
  <form @submit.prevent="submit">
    <Confirmation :ref="refKey" :class="$style.button">
      <template #click>Delete</template>
      Are you sure you want to delete this TODO?
    </Confirmation>
  </form>
</template>

<style lang="css" module>
.p {
  margin: 0;
}

.a {
  padding-inline: 0;
  padding-block: 2px;
  border: 1px solid gray;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.a:hover {
  background-color: #aaa;
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
