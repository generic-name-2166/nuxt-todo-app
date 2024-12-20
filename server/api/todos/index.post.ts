import { readFile, writeFile } from "node:fs/promises";
import type { H3Event } from "h3";
import type { ITodo } from "~/todos.ts";

interface ITodoPostDto {
  text: string;
}

function initialize(dto: ITodoPostDto): ITodo {
  return {
    ...dto,
    done: false,
  };
}

async function readData(): Promise<ITodo[]> {
  try {
    return JSON.parse(await readFile("data.json", { encoding: "utf-8" }));
  } catch {
    return [];
  }
}

async function handler(event: H3Event): Promise<void> {
  const body: ITodoPostDto = await readBody(event);
  const todo: ITodo = initialize(body);

  const data: ITodo[] = await readData();

  return writeFile("data.json", JSON.stringify([...data, todo]));
}

export default defineEventHandler((event: H3Event): void => {
  event.waitUntil(handler(event));
});
