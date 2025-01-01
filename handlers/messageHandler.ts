import { replyToUser } from "../utils/apiUtils.ts";

export async function handleMessageEvent(event: any) {
  const replyToken = event.replyToken;
  const message = event.message?.text;

  if (!replyToken || !message) return;

  // スパムメッセージやキーワードを検出して反応する例
  const spamKeywords = ["spam", "advertisement"];
  for (const keyword of spamKeywords) {
    if (message.includes(keyword)) {
      await replyToUser(replyToken, "This message is detected as spam and will be ignored.");
      break;
    }
  }
}
