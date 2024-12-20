import { readFileSync } from "node:fs";
import type { ITodo } from "~/todos.ts";

function readData(): ITodo[] {
  let data: Buffer;
  try {
    data = readFileSync("data.json");
  } catch {
    return [];
  }
  const decoder = new TextDecoder();
  const todos = decoder.decode(data);
  return JSON.parse(todos);
}

export default defineEventHandler((): ITodo[] => {
  const data = readData();
  return data;
});
