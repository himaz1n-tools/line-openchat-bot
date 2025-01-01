export function extractUserId(message: string): string | null {
  // メンションからユーザーIDを抽出するための例
  const match = message.match(/@([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
