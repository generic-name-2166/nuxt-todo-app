import { readFile } from "node:fs/promises";
import type { ITodo } from "~/todos.ts";

export default defineEventHandler(async (): Promise<ITodo[]> => {
  try {
    return JSON.parse(await readFile("data.json", { encoding: "utf-8" }));
  } catch {
    return [];
  }
});
