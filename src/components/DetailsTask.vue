<script setup lang="ts">
interface TodoTaskProps {
  text: string;
  done: boolean;
}

const props = defineProps<TodoTaskProps>();
</script>

<template>
  <label><input type="checkbox" :checked="props.done" /></label>

  <p>{{ props.text }}</p>
</template>
