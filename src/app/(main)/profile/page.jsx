import { redirect } from "next/navigation";
import { getProfile } from "@/lib/api/customer/profile";
import { getMyOrders } from "@/lib/api/customer/orders";
import { getWishlist } from "@/lib/api/customer/wishlist";
import Profile from "@/components/main/profile/Profile";

export default async function ProfilePage() {
  let user = null;
  let orders = [];
  let wishlist = [];

  try {
    const profileData = await getProfile();
    user = profileData.data;
  } catch (err) {
    if (err.status === 401) redirect("/signin");
  }

  try {
    const ordersData = await getMyOrders();
    orders = ordersData.orders || [];
  } catch {
    orders = [];
  }

  try {
    const wishlistData = await getWishlist();
    wishlist = wishlistData.wishlist || [];
  } catch {
    wishlist = [];
  }

  return <Profile user={user} orders={orders} wishlist={wishlist} />;
}