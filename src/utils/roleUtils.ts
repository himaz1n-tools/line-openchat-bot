const admins: Set<string> = new Set();
const subAdmins: Set<string> = new Set();

export function addAdmin(userId: string): void {
  admins.add(userId);
  console.log(`[LOG] Admin added: ${userId}`);
}

export function removeAdmin(userId: string): void {
  admins.delete(userId);
  console.log(`[LOG] Admin removed: ${userId}`);
}

export function isAdmin(userId: string): boolean {
  return admins.has(userId);
}

export function addSubAdmin(userId: string): void {
  subAdmins.add(userId);
  console.log(`[LOG] Sub-admin added: ${userId}`);
}

export function removeSubAdmin(userId: string): void {
  subAdmins.delete(userId);
  console.log(`[LOG] Sub-admin removed: ${userId}`);
}

export function isSubAdmin(userId: string): boolean {
  return subAdmins.has(userId);
}
