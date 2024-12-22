<script setup lang="ts">
import type { ITodo } from "~/todos.ts";

interface DetailsTodoProps {
  tasks: ITodo["tasks"];
}

const props = defineProps<DetailsTodoProps>();
</script>

<template>
  <div :class="$style.div">
    <DetailsTask
      v-for="task in props.tasks"
      :key="task.text"
      :text="task.text"
      :done="task.done"
    />
  </div>
</template>

<style lang="css" module>
.div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
  gap: 0.5rem;
}
</style>
