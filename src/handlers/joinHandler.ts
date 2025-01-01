import { replyToUser } from "../utils/apiUtils.ts";

export async function handleJoinEvent(event: any) {
  const replyToken = event.replyToken;
  const userId = event.source?.userId;

  if (!replyToken || !userId) return;

  // 新規参加者に挨拶を送る
  await replyToUser(replyToken, `Welcome to the group, ${userId}! Please read the rules.`);
}
