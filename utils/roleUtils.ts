// ダミーデータ: 実際にはデータベースやファイルシステムを使用するのが一般的
let admins: Set<string> = new Set();
let subAdmins: Set<string> = new Set();

export function addAdmin(userId: string) {
  admins.add(userId);
}

export function removeAdmin(userId: string) {
  admins.delete(userId);
}

export function isAdmin(userId: string) {
  return admins.has(userId);
}

export function addSubAdmin(userId: string) {
  subAdmins.add(userId);
}

export function removeSubAdmin(userId: string) {
  subAdmins.delete(userId);
}
