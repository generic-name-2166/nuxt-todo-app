<script setup lang="ts">
import type { ITodo } from "~/todos.ts";

interface DetailsTodoProps {
  tasks: ITodo["tasks"];
}

const props = defineProps<DetailsTodoProps>();
</script>

<template>
  <div>
    <DetailsTask
      v-for="task in props.tasks"
      :key="task.text"
      :text="task.text"
      :done="task.done"
    />
  </div>
</template>
