import { redirect } from "next/navigation";
import { getCart } from "@/lib/api/customer/cart";
import CartPageClient from "@/components/main/cart/CartPageClient";

export default async function CartPage() {
  let cart = null;

  try {
    const data = await getCart();
    cart = data.cart;
  } catch (err) {
    if (err.status === 401) {
      redirect("/signin");
    }
    cart = { items: [], total: 0, itemCount: 0 };
  }

  return <CartPageClient cart={cart} />;
}