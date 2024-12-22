import { defineStore } from "pinia";

export interface ITodo {
  id: number;
  title: string;
  tasks: {
    done: boolean;
    text: string;
  }[];
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

  const append = (title: string, tasks: string[]): ITodo => {
    const todo: ITodo = {
      id: getNewId(inner.value),
      title,
      tasks: tasks.map((text) => ({ done: false, text })),
    };
    inner.value = [...inner.value, todo];
    return todo;
  };

  const update = (idx: number, todo: ITodo): void =>
    void (inner.value = inner.value
      .slice(0, idx)
      .concat([todo, ...inner.value.slice(idx + 1, inner.value.length)]));

  return { inner, init, remove, append, update };
});
