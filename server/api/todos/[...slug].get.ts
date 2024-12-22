import type { H3Event } from "h3";
import { readData } from "./index.post.ts";
import type { ITodo } from "~/todos.ts";

function create404(slug: string | undefined): Error {
  return createError({
    statusCode: 404,
    statusMessage: `TODO with id ${slug} doesn't exist`,
  });
}

async function handler(event: H3Event): Promise<ITodo> {
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
  const todo = data.find((value) => value.id === id);
  if (!todo) {
    throw create404(slug);
  }

  return todo;
}

export default defineEventHandler(handler);
