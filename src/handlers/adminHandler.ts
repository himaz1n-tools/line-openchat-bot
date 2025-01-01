import { replyToUser } from "../utils/apiUtils.ts";
import { addAdmin, removeAdmin, isAdmin, addSubAdmin, removeSubAdmin } from "../utils/roleUtils.ts";
import { extractUserId } from "../utils/textUtils.ts";

export async function handleAdminCommands(event: any) {
  const replyToken = event.replyToken;
  const userId = event.source?.userId;
  const message = event.message?.text;

  if (!replyToken || !message || !userId) return;

  // /mein コマンド処理
  if (message.startsWith("/mein")) {
    if (message === "/mein") {
      addAdmin(userId);
      await replyToUser(replyToken, "You are now an admin.");
    } else if (message === "/mein off") {
      removeAdmin(userId);
      await replyToUser(replyToken, "You are no longer an admin.");
    }
  }

  // 管理者のみ以下の操作が可能
  if (!isAdmin(userId)) return;

  // /sub コマンド処理
  if (message.startsWith("/sub ")) {
    const targetId = extractUserId(message);
    if (targetId) {
      addSubAdmin(targetId);
      await replyToUser(replyToken, `${targetId} is now a sub-admin.`);
    }
  } else if (message.startsWith("/sub off ")) {
    const targetId = extractUserId(message);
    if (targetId) {
      removeSubAdmin(targetId);
      await replyToUser(replyToken, `${targetId} is no longer a sub-admin.`);
    }
  }
}
