import { addAdmin, removeAdmin, isAdmin } from "../src/utils/roleUtils.ts";

Deno.test("Admin management", () => {
  addAdmin("user1");
  console.assert(isAdmin("user1"), "User1 should be admin");

  removeAdmin("user1");
  console.assert(!isAdmin("user1"), "User1 should not be admin");
});
