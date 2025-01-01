import { serve } from "https://deno.land/x/oak/mod.ts";
import { config } from "./config.ts";
import { handleAdminCommands } from "./handlers/adminHandler.ts";
import { handleJoinEvent } from "./handlers/joinHandler.ts";
import { handleMessageEvent } from "./handlers/messageHandler.ts";
import { verifySignature } from "./utils/apiUtils.ts";

const port = 8080;

const app = new Application();

// リクエストがLINEのWebhookから来た場合
app.use(async (context, next) => {
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

// Webhookエンドポイント
app.use(async (context) => {
  const body = await context.request.body().value;
  if (body.events) {
    for (const event of body.events) {
      const eventType = event.type;

      // 新規参加者の挨拶とルール通知
      if (eventType === "join") {
        handleJoinEvent(event);
      }

      // メッセージの処理（管理者コマンドなど）
      else if (eventType === "message") {
        handleMessageEvent(event);
      }

      // 管理者によるコマンド処理
      else if (eventType === "postback") {
        handleAdminCommands(event);
      }
    }
  }

  context.response.status = 200;
  context.response.body = { message: "OK" };
});

// サーバーを起動
console.log(`Server is running on http://localhost:${port}`);
await serve(app.listen({ port }));
