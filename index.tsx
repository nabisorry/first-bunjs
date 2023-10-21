import { renderToReadableStream } from "react-dom/server";
import Todo from "./components/Todo";
import TodoList from "./components/TodoList";
import { TodoResponse, TodosResponse } from "./types";

Bun.serve({
  port: 8544,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/todos") {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const todoList = (await res.json()) as TodosResponse;
      const stream = await renderToReadableStream(<TodoList list={todoList} />);

      return new Response(stream, {
        headers: { "Content-Type": "text/html" },
      });
    }

    const todoRegex = /^\/todos\/([a-zA-Z0-9_-]+)$/;
    const match = url.pathname.match(todoRegex);

    if (match) {
      const id = match[1];
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );

      if (res.status === 404) return new Response("Not Found", { status: 404 });

      const { userId, title, completed } = (await res.json()) as TodoResponse;

      const stream = await renderToReadableStream(
        <Todo userId={userId} title={title} completed={completed} />
      );

      return new Response(stream, {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("server listening...");
