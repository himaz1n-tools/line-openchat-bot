import { replyToUser } from "../utils/apiUtils.ts";

export async function handleJoinEvent(event: any) {
  const replyToken = event.replyToken;
  const userId = event.source?.userId;

  if (!replyToken || !userId) return;

  // 新規参加者の挨拶とルール通知
  const welcomeMessage = `Welcome to the group, ${userId}! Please follow the group rules.`;
  await replyToUser(replyToken, welcomeMessage);
}
