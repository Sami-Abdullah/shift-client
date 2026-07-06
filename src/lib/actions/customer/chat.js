"use server";

import { serverFetch } from "@/lib/core/server";

export async function sendChatMessage(messages) {
  return serverFetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });
}