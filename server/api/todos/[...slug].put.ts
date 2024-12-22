import { writeFile } from "node:fs/promises";
import type { H3Event } from "h3";
import { readData } from "./index.post.ts";
import type { ITodo } from "~/todos.ts";

function create404(slug: string | undefined): Error {
  return createError({
    statusCode: 404,
    statusMessage: `TODO with id ${slug} doesn't exist`,
  });
}

async function handler(event: H3Event): Promise<void> {
  const slug: string | undefined = event.context.params?.slug;
  if (!slug) {
    throw create404(slug);
  }
  let id: number;
  try {
    id = parseInt(slug);
  } catch {
    throw create404(slug);
  }
  const data: ITodo[] = await readData();
  const idx = data.findIndex((value) => value.id === id);
  if (idx < 0) {
    throw create404(slug);
  }

  const todo: ITodo = await readBody(event);
  data[idx] = todo;

  return writeFile("data.json", JSON.stringify(data));
}

export default defineEventHandler(handler);
