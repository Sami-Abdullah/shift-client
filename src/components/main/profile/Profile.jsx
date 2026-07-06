"use client";
import React, { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import AccountDetails from "./AccountDetails";
import OrderHistory from "./OrderHistory";
import SavedItems from "./SavedItems";

export default function Profile({ user, orders, wishlist }) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-eyebrow mb-1">My Account</p>
          <h1 className="text-display" style={{ fontSize: "36px" }}>
            {user?.name || "Welcome"}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
          <div>
            {activeTab === "details" && <AccountDetails user={user} />}
            {activeTab === "orders" && <OrderHistory orders={orders} />}
            {activeTab === "saved" && <SavedItems items={wishlist} />}
          </div>
        </div>
      </div>
    </div>
  );
}