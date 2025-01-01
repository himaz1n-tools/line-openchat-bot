import { addSubAdmin, removeSubAdmin, isSubAdmin } from "../src/utils/roleUtils.ts";

Deno.test("Sub-admin management", () => {
  addSubAdmin("user2");
  console.assert(isSubAdmin("user2"), "User2 should be sub-admin");

  removeSubAdmin("user2");
  console.assert(!isSubAdmin("user2"), "User2 should not be sub-admin");
});
