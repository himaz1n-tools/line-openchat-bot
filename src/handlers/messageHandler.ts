import { replyToUser } from "../utils/apiUtils.ts";

export async function handleMessageEvent(event: any) {
  const replyToken = event.replyToken;
  const message = event.message?.text;

  if (!replyToken || !message) return;

  // メッセージを受け取った際の処理（例: spam判定等）
  console.log(`[LOG] Message received: ${message}`);

  // ここにスパムや不適切なメッセージのチェックを追加できます
  // 例: if (isSpam(message)) { ... }
}
