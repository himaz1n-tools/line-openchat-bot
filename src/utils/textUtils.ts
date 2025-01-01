export function extractUserId(message: string): string | null {
  const match = message.match(/@(\w+)/); // メンションされたIDを抽出
  return match ? match[1] : null;
}
