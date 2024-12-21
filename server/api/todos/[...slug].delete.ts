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

  const newData: ITodo[] = data
    .slice(0, idx)
    .concat(data.slice(idx + 1, data.length));

  return writeFile("data.json", JSON.stringify(newData));
}

export default defineEventHandler(handler);
