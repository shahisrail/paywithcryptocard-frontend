"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  DollarSign,
  Globe,
  LogOut,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Copy,
  Smartphone,
  Mail,
  Lock,
  HelpCircle
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

interface SettingsSection {
  id: string;
  title: string;
  icon: any;
  description: string;
}

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoLock, setAutoLock] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);

  const settingsSections: SettingsSection[] = [
    {
      id: "profile",
      title: "Profile",
      icon: User,
      description: "Manage your personal information"
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
      description: "Password, 2FA, and security settings"
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      description: "Email and push notification preferences"
    },
    {
      id: "cards",
      title: "Card Settings",
      icon: CreditCard,
      description: "Default card and spending preferences"
    },
  
    
  ];

  const handleSave = async () => {
    setSaveStatus("saving");

    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-white border border-slate-100 shadow-sm rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">JD</span>
              </div>
              <div>
                <h3 className="text-slate-900 font-semibold text-lg">John Doe</h3>
                <p className="text-slate-500">john.doe@example.com</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Verified
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Premium
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-xl">
              <h3 className="text-slate-900 font-semibold text-lg mb-4">Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-xl">
              <h3 className="text-slate-900 font-semibold text-lg mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-900 font-medium">Enable 2FA</p>
                  <p className="text-slate-500 text-sm">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    twoFactorEnabled ? "bg-purple-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {twoFactorEnabled && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">2FA is enabled</span>
                  </div>
                  <p className="text-slate-600 text-sm">Authenticator app: Google Authenticator</p>
                  <p className="text-slate-600 text-sm">Backup codes: Available</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-xl">
              <h3 className="text-slate-900 font-semibold text-lg mb-4">Device Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 font-medium">Biometric Login</p>
                    <p className="text-slate-500 text-sm">Use fingerprint or Face ID</p>
                  </div>
                  <button
                    onClick={() => setBiometricLogin(!biometricLogin)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      biometricLogin ? "bg-purple-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        biometricLogin ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 font-medium">Auto-Lock</p>
                    <p className="text-slate-500 text-sm">Lock account after inactivity</p>
                  </div>
                  <button
                    onClick={() => setAutoLock(!autoLock)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoLock ? "bg-purple-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        autoLock ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-xl">
              <h3 className="text-slate-900 font-semibold text-lg mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                Email Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 font-medium">Transaction Alerts</p>
                    <p className="text-slate-500 text-sm">Get notified for card transactions</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailNotifications ? "bg-purple-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        emailNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 font-medium">Marketing Emails</p>
                    <p className="text-slate-500 text-sm">Updates about new features</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 font-medium">Security Alerts</p>
                    <p className="text-slate-500 text-sm">Important security notifications</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-xl">
              <h3 className="text-slate-900 font-semibold text-lg mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-green-500" />
                Push Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 font-medium">Push Notifications</p>
                    <p className="text-slate-500 text-sm">Receive notifications on your device</p>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      pushNotifications ? "bg-purple-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        pushNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                {pushNotifications && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-700 font-medium">Mobile device connected</span>
                    </div>
                    <p className="text-slate-600 text-sm">iPhone 14 Pro • Safari • Last active: 2 minutes ago</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "cards":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-xl">
              <h3 className="text-slate-900 font-semibold text-lg mb-4">Default Card Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Default Card for New Purchases</label>
                  <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
                    <option>Shopping Card (•••• 8901)</option>
                    <option>Subscription Card (•••• 2345)</option>
                    <option>Travel Card (•••• 3456)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Default Currency</label>
                  <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-xl">
              <h3 className="text-slate-900 font-semibold text-lg mb-4">Spending Limits</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Daily Transaction Limit</label>
                  <input
                    type="number"
                    defaultValue="500"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Transaction Limit</label>
                  <input
                    type="number"
                    defaultValue="5000"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        );

   
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 relative">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur sticky top-0 z-40 border-b border-slate-100">
          <div className="responsive-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-500" />
                  Settings
                </h1>
              </div>

              <div className="flex items-center gap-4">
                {saveStatus === "saved" && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">Saved</span>
                  </div>
                )}
                <button
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  className="px-6 py-2 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                >
                  {saveStatus === "saving" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <nav className="space-y-2">
                  {settingsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <div className="flex-1">
                        <p className="font-medium">{section.title}</p>
                        <p className="text-xs text-slate-400">{section.description}</p>
                      </div>
                    </button>
                  ))}
                </nav>

                <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-red-700 font-medium">Danger Zone</p>
                  </div>
                  <button className="w-full p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium transition-all duration-200">
                    Delete Account
                  </button>
                </div>
              </div>

              {/* Content */}
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8">
                  {renderSectionContent()}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}