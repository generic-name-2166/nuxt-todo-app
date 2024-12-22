<script setup lang="ts">
import { useId } from 'vue';

interface TodoTaskProps {
  text: string;
  done: boolean;
}

const props = defineProps<TodoTaskProps>();

const id = useId();
</script>

<template>
  <input :id="id" type="checkbox" :checked="props.done" />

  <label :for="id" :class="$style.label">{{ props.text }}</label>
</template>

<style lang="css" module>
.label {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}
</style>
