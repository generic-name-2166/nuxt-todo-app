import { readFile, writeFile } from "node:fs/promises";
import type { H3Event } from "h3";
import type { ITodo } from "~/todos.ts";

export async function readData(): Promise<ITodo[]> {
  try {
    return JSON.parse(await readFile("data.json", { encoding: "utf-8" })) ?? [];
  } catch {
    return [];
  }
}

async function handler(event: H3Event): Promise<void> {
  const todo: ITodo = await readBody(event);
  const data: ITodo[] = await readData();

  return writeFile("data.json", JSON.stringify([...data, todo]));
}

export default defineEventHandler(handler);
