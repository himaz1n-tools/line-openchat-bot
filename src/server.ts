import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "./config.ts";
import { handleAdminCommands } from "./handlers/adminHandler.ts";
import { handleJoinEvent } from "./handlers/joinHandler.ts";
import { handleMessageEvent } from "./handlers/messageHandler.ts";
import { verifySignature } from "./utils/apiUtils.ts";

const port = 8080;

const app = new Application();

app.use(async (context: Context, next: Function) => {
  if (context.request.method === "POST" && context.request.headers.get("x-line-signature")) {
    const body = await context.request.body().value;
    const signature = context.request.headers.get("x-line-signature")!;
    if (verifySignature(body, signature)) {
      await next();
    } else {
      context.response.status = 400;
      context.response.body = { message: "Invalid signature" };
    }
  } else {
    await next();
  }
});

app.use(async (context: Context) => {
  const body = await context.request.body().value;
  if (body.events) {
    for (const event of body.events) {
      const eventType = event.type;

      if (eventType === "join") {
        handleJoinEvent(event);
      } else if (eventType === "message") {
        handleMessageEvent(event);
      } else if (eventType === "postback") {
        handleAdminCommands(event);
      }
    }
  }

  context.response.status = 200;
  context.response.body = { message: "OK" };
});

console.log(`Server is running on http://localhost:${port}`);
await app.listen({ port });
