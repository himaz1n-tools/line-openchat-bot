import { config } from "../config.ts";

export async function replyToUser(replyToken: string, message: string) {
  console.log(`[LOG] Sending reply: ${message}`);
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.channelAccessToken}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text: message }],
    }),
  });
}

export async function verifySignature(body: any, signature: string) {
  const crypto = await import("crypto");
  const hash = crypto.createHmac("sha256", config.channelSecret)
                     .update(body)
                     .digest("base64");
  return hash === signature;
}
