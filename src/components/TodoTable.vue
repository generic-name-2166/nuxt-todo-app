<script setup lang="ts">
import { computed } from "vue";
import { useTodos, type ITodo } from "~/todos.ts";

const store = useTodos();
// Destructuring the `todos` causes it to lose reactivity
const todos = computed<ITodo[]>(() => store.inner);
</script>

<template>
  <div :class="$style.div">
    <h2 :class="$style.h2">Note</h2>
    <h2 :class="$style.h2">Edit</h2>
    <h2 :class="$style.h2">Delete</h2>

    <TodoRow
      v-for="(todo, idx) in todos"
      :key="todo.id"
      :todo="todo"
      :idx="idx"
    />

    <p v-if="todos.length < 1" :class="`${$style.else} ${$style.p}`">
      Add a todo!
    </p>
  </div>
</template>

<style lang="css" module>
.div {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid gray;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 1fr) minmax(0, 1fr);
  column-gap: 2rem;
  row-gap: 1rem;
}

.h2 {
  margin: 0;
}

.else {
  grid-column: span 3 / span 3;
}
</style>
