"use client";

import { useState } from "react";
import {
  User,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/slices/authSlice";

interface Tab {
  id: string;
  label: string;
  icon: any;
}

function SettingsPageContent() {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useAppDispatch();

  const { data: userData } = useGetCurrentUserQuery();
  const user = userData?.data;

  const tabs: Tab[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Settings</h1>
      </div>

      {/* Page Content */}
      <div className="max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="flex mb-8 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 pb-3 text-sm font-medium  relative ${
                    activeTab === tab.id
                      ? "text-black"
                      : "text-black hover:text-black"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "profile" && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-8">
                <h2 className="text-xl font-semibold text-black mb-6 md:mb-8">Profile Information</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-black cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user?.fullName || ""}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-black cursor-not-allowed"
                    />
                  </div>

                  
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-8">
                <h2 className="text-xl font-semibold text-black mb-6 md:mb-8">Security Settings</h2>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Current Password:
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      New Password:
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Confirm New Password:
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 "
                  >
                    Update Password
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
    </>
  );
}

export default function SettingsPage() {
  return <SettingsPageContent />;
}
