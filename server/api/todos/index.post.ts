import * as fs from "node:fs/promises";
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

async function handler(event: H3Event): Promise<void> {
  const body: ITodoPostDto = await readBody(event);
  const todo: ITodo = initialize(body);
  return fs.writeFile("data.json", JSON.stringify([todo]));
}

export default defineEventHandler((event: H3Event): void => {
  event.waitUntil(handler(event));
});
