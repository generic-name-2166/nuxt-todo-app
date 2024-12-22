import { defineStore } from "pinia";

export interface ITodo {
  id: number;
  done: boolean;
  text: string;
}

function getNewId(data: ITodo[]): number {
  if (data.length < 1) {
    return 0;
  }
  const max = Math.max(...data.map((value) => value.id));
  return max + 1;
}

export const useTodos = defineStore("todos", () => {
  const inner = shallowRef<ITodo[]>([]);

  const init = (value: ITodo[]): void => void (inner.value = value);

  const remove = (idx: number): void =>
    void (inner.value = inner.value
      .slice(0, idx)
      .concat(inner.value.slice(idx + 1, inner.value.length)));

  const append = (text: string): ITodo => {
    const todo: ITodo = { id: getNewId(inner.value), text, done: false };
    inner.value = [...inner.value, todo];
    return todo;
  };

  return { inner, init, remove, append };
});
