"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Check,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useGetMyCardsQuery, useCreateCardMutation } from "@/redux/services/cardApi";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";

export default function CardsPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [copiedCard, setCopiedCard] = useState<string | null>(null);
  const [cardSuccess, setCardSuccess] = useState(false);
  const [cardError, setCardError] = useState("");

  const { data: cardsData, isLoading, error } = useGetMyCardsQuery();
  const { data: userData } = useGetCurrentUserQuery();
  const [createCard, { isLoading: isCreatingCard }] = useCreateCardMutation();

  const cards = cardsData?.data || [];
  const userBalance = userData?.data?.balance || 0;

  const canCreateCard = userBalance > 0;

  const handleCreateCard = async () => {
    try {
      setCardError("");
      await createCard({
        spendingLimit: 10000,
      }).unwrap();
      setCardSuccess(true);
      setTimeout(() => setCardSuccess(false), 3000);
    } catch (err: any) {
      setCardError(err.data?.message || "Failed to create card");
      setTimeout(() => setCardError(""), 5000);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const maskCardNumber = (cardNumber: string) => {
    // Remove spaces and add formatting
    const cleaned = cardNumber.replace(/\s/g, "");
    return cleaned.replace(/(\d{4})/g, "$1 ").trim() || cardNumber;
  };

  const copyCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, "");
    navigator.clipboard.writeText(cleaned);
    setCopiedCard(cardNumber);
    setTimeout(() => setCopiedCard(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <p className="text-black font-medium">Failed to load cards</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Card creation feedback */}
      {cardSuccess && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-black" />
            <p className="text-sm text-black font-medium">Card created successfully!</p>
          </div>
        </div>
      )}

      {cardError && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-black" />
            <p className="text-sm text-black font-medium">{cardError}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">My Cards</h1>
          <p className="text-gray-600 mt-1">Manage your virtual cards</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {showBalance ? (
              <EyeOff className="w-5 h-5 text-gray-600" />
            ) : (
              <Eye className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {canCreateCard ? (
            <button
              onClick={handleCreateCard}
              disabled={isCreatingCard}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreatingCard ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Card
                </>
              )}
            </button>
          ) : (
            <Link
              href="/dashboard/topup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Funds
            </Link>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card: any) => (
          <div key={card._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Card Front */}
            <div className="relative p-6 h-48 flex flex-col bg-gradient-to-br from-gray-900 to-black">
              <div className="flex items-start justify-between mb-8">
                <span className="text-white font-bold text-xl">VISA</span>
                <span
                  className={`text-xs font-medium border px-3 py-1 rounded-full ${
                    card.status === "active"
                      ? "border-green-500 text-green-400"
                      : card.status === "frozen"
                      ? "border-blue-500 text-blue-400"
                      : "border-red-500 text-red-400"
                  }`}
                >
                  {card.status}
                </span>
              </div>

              <div className="mb-auto">
                <p className="text-white text-lg font-mono tracking-wider">
                  {maskCardNumber(card.cardNumber)}
                </p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Card Holder</p>
                  <p className="text-white text-sm font-medium">{card.cardHolder}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Expires</p>
                    <p className="text-white text-sm font-medium">{card.expiryDate}</p>
                  </div>
                  <button
                    onClick={() => copyCardNumber(card.cardNumber)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    {copiedCard === card.cardNumber ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/90" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Card Details */}
            <div className="p-4 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Balance</span>
                  <span className="text-lg font-semibold text-black">
                    {showBalance ? formatCurrency(card.balance) : "••••"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Spending Limit</span>
                  <span className="text-sm font-medium text-black">
                    {formatCurrency(card.spendingLimit)}
                  </span>
                </div>
                {card.spendingLimit > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-black h-1.5 rounded-full"
                      style={{
                        width: `${Math.min((card.balance / card.spendingLimit) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">You don't have any cards yet</p>
          {canCreateCard ? (
            <Link
              href="/dashboard/create-card"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Your First Card
            </Link>
          ) : (
            <>
              <p className="text-gray-600 mb-4">Add funds to create your first virtual card.</p>
              <Link
                href="/dashboard/topup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Funds
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
