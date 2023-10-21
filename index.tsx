import { renderToReadableStream } from "react-dom/server";

Bun.serve({
  async fetch(req) {
    const stream = await renderToReadableStream();

    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
