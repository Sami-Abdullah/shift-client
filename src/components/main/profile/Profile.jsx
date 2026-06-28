'use client'
import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import AccountDetails from './AccountDetails';
import OrderHistory from './OrderHistory';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start mt-6">
          
          {/* Dashboard Left Tab Pipeline Controller */}
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Active Work Panels Content Switcher */}
          {activeTab === "details" && <AccountDetails />}
          {activeTab === "orders" && <OrderHistory />}
          
        </div>
      </div>
    </div>
  );
};

export default Profile;