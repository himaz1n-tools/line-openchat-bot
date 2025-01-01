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

export async function kickUser(userId: string) {
  console.log(`[LOG] Kicking user: ${userId}`);
  await fetch(`https://api.line.me/v2/bot/group/${config.groupId}/member/${userId}/leave`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.channelAccessToken}`,
    },
  });
}
