import { redirect } from "next/navigation";
import { getCart } from "@/lib/api/customer/cart";
import CheckoutClient from "@/components/main/checkout/CheckoutClient";

export default async function CheckoutPage() {
  let cart = null;

  try {
    const data = await getCart();
    cart = data.cart;
  } catch (err) {
    if (err.status === 401) redirect("/signin");
    cart = { items: [], total: 0 };
  }

  if (!cart.items || cart.items.length === 0) {
    redirect("/cart");
  }

  return <CheckoutClient cart={cart} />;
}