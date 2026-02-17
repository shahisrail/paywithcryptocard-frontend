"use client";

import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  ArrowRight,
  Save,
} from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: any;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs: Tab[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notification", label: "Notification", icon: Bell },
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
                  className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
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
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-xl font-semibold text-black mb-8">Update Profile</h2>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      First name:
                    </label>
                    <input
                      type="text"
                      defaultValue="Sandra"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Last name:
                    </label>
                    <input
                      type="text"
                      defaultValue="Drake"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Username:
                    </label>
                    <input
                      type="text"
                      defaultValue="solimylax"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Update
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-xl font-semibold text-black mb-8">Security Settings</h2>

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
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Update Password
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {activeTab === "notification" && (
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-xl font-semibold text-black mb-8">Notification Preferences</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-black">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive updates about your account via email</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-black transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-black">Push Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications on your device</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-black">Transaction Alerts</p>
                      <p className="text-sm text-gray-600">Get notified for every transaction</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-black transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
    </>
  );
}
