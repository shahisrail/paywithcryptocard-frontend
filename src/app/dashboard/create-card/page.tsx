"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Plus, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useCreateCardMutation } from "@/redux/services/cardApi";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";

export default function CreateCardPage() {
  const router = useRouter();
  const [cardName, setCardName] = useState("");
  const [spendingLimit, setSpendingLimit] = useState("10000");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { data: userData } = useGetCurrentUserQuery();
  const [createCard, { isLoading }] = useCreateCardMutation();

  const user = userData?.data;
  const userBalance = user?.balance || 0;

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) {
      setError("Please enter a card name");
      return;
    }

    const limit = parseFloat(spendingLimit);
    if (isNaN(limit) || limit <= 0) {
      setError("Please enter a valid spending limit");
      return;
    }

    try {
      setError("");
      await createCard({
        cardHolder: cardName,
        spendingLimit: limit,
      }).unwrap();

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/cards");
      }, 2000);
    } catch (err: any) {
      setError(err.data?.message || "Failed to create card. Please try again.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Create Virtual Card</h1>
        <p className="text-gray-600">Get a virtual card for online purchases</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-900 font-medium">
              Card created successfully! Redirecting to your cards...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-900 font-medium">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleCreateCard} className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-2">Create New Card</h2>
          <p className="text-gray-600">Fill in the details to create your virtual card</p>
        </div>

        <div className="space-y-6">
          {/* Card Type Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-5 h-5 text-black" />
              <p className="font-semibold text-black">Virtual Visa Card</p>
            </div>
            <p className="text-sm text-gray-600">
              Instant virtual card for online purchases. No physical card required.
            </p>
          </div>

          {/* Card Name */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Card Name *
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="e.g., Shopping Card, Business Expenses"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
              required
            />
            <p className="mt-2 text-sm text-gray-600">
              A nickname to help you identify this card
            </p>
          </div>

          {/* Card Holder Name (Read-only from user profile) */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Card Holder Name
            </label>
            <input
              type="text"
              value={user?.fullName || ""}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
            <p className="mt-2 text-sm text-gray-600">
              Your name will appear on the card
            </p>
          </div>

          {/* Spending Limit */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Spending Limit *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={spendingLimit}
                onChange={(e) => setSpendingLimit(e.target.value)}
                placeholder="10000"
                min="1"
                step="1"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Maximum spending limit for this card
            </p>
          </div>

          {/* Balance Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-900 font-medium">Your Available Balance</p>
                <p className="text-xs text-blue-700">
                  You can load funds to this card after creation
                </p>
              </div>
              <p className="text-lg font-bold text-blue-900">
                {formatCurrency(userBalance)}
              </p>
            </div>
          </div>

          {/* Card Preview */}
          <div className="bg-black rounded-lg p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-white font-bold text-xl">VISA</span>
              <CreditCard className="w-8 h-8 text-white/70" />
            </div>
            <p className="text-white/90 font-mono text-lg tracking-wider mb-6">
              4532 •••• •••• ••••
            </p>
            <div className="flex justify-between">
              <div>
                <p className="text-white/60 text-xs">Card Holder</p>
                <p className="text-white font-medium">{user?.fullName || "Your Name"}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Expires</p>
                <p className="text-white font-medium">
                  {new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000)
                    .toLocaleDateString("en-US", {
                      month: "2-digit",
                      year: "2-digit",
                    })
                    .replace("/", "/")}
                </p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> Card details (number, CVV, expiry) will be generated after creation.
              This is a simulated virtual card for Phase 1.
            </p>
          </div>

          {/* Submit Buttons */}
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
              disabled={isLoading || !cardName.trim()}
              className="flex-1 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Card
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
