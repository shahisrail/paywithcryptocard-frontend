"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  ArrowRight,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useRouter } from "next/navigation";

interface CardTemplate {
  id: string;
  name: string;
  description: string;
  limit: number;
  fee: number;
}

export default function CreateCardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [spendingLimit, setSpendingLimit] = useState("");
  const router = useRouter();

  const cardTemplates: CardTemplate[] = [
    {
      id: "virtual",
      name: "Virtual Card",
      description: "Instant virtual card for online purchases",
      limit: 10000,
      fee: 0,
    },
  ];

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) return;

    // Simulate card creation - redirect to cards page
    setTimeout(() => {
      router.push("/dashboard/cards");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 relative">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="responsive-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-xl font-semibold text-black">
                  Create Virtual Card
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleCreateCard} className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-2">Create New Card</h2>
                <p className="text-gray-600">Fill in the details to create your virtual card</p>
              </div>

              <div className="space-y-6">
                {/* Card Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Card Type
                  </label>
                  <div className="space-y-3">
                    {cardTemplates.map((template) => (
                      <label
                        key={template.id}
                        className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                      >
                        <input
                          type="radio"
                          name="cardType"
                          value={template.id}
                          defaultChecked={template.id === "virtual"}
                          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        />
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-black">{template.name}</p>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                        <CreditCard className="w-5 h-5 text-gray-400" />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Card Name */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Card Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="e.g., Shopping Card, Business Expenses"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black"
                    required
                  />
                </div>

                {/* Spending Limit */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Spending Limit
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={spendingLimit}
                      onChange={(e) => setSpendingLimit(e.target.value)}
                      placeholder="10000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Maximum spending limit for this card
                  </p>
                </div>

                {/* Card Preview */}
                <div className="bg-black rounded-lg p-6">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-white font-semibold">anon</span>
                    <CreditCard className="w-8 h-8 text-white/70" />
                  </div>
                  <p className="text-white/90 font-mono text-lg tracking-wider mb-6">
                    4532 •••• •••• ••••
                  </p>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white/60 text-xs">Card Holder</p>
                      <p className="text-white font-medium">{cardName || "Your Name"}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Expires</p>
                      <p className="text-white font-medium">12/26</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!cardName.trim()}
                    className="flex-1 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Card
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}