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
  <label><input type="checkbox" disabled :checked="todo.done" /></label>
  <p :class="$style.p">{{ todo.text }}</p>
  <a href="#" :class="$style.a">Edit</a>
  <form @submit.prevent="submit">
    <Confirmation :ref="refKey">
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
  display: block;
}
</style>
