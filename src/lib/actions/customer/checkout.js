"use server";

import { serverFetch } from "@/lib/core/server";

export async function createPaymentIntent(shippingAddress) {
  return serverFetch("/api/checkout/create-payment-intent", {
    method: "POST",
    body: JSON.stringify({ shippingAddress }),
  });
}