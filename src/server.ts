import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { handleJoinEvent } from "./handlers/joinHandler.ts";
import { handleMessageEvent } from "./handlers/messageHandler.ts";
import { handleAdminCommands } from "./handlers/adminHandler.ts";

serve(async (req) => {
  if (req.method === "POST") {
    const body = await req.json();
    const events = body.events;

    for (const event of events) {
      const type = event.type;

      console.log(`[LOG] Event received: ${type}`);

      switch (type) {
        case "join":
          await handleJoinEvent(event);
          break;
        case "message":
          if (event.message?.text.startsWith("/")) {
            await handleAdminCommands(event);
          } else {
            await handleMessageEvent(event);
          }
          break;
        default:
          console.log(`[LOG] Unhandled event type: ${type}`);
      }
    }

    return new Response("OK");
  }

  return new Response("Invalid Request", { status: 400 });
});

console.log("[LOG] Server is running...");
