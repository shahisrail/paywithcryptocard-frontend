"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";

interface Card {
  id: string;
  name: string;
  cardNumber: string;
  expiryDate: string;
  balance: number;
  status: "active" | "frozen" | "expired";
}

export default function CardsPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [copiedCard, setCopiedCard] = useState<string | null>(null);

  const [cards] = useState<Card[]>([
    {
      id: "1",
      name: "My Card",
      cardNumber: "4532 1234 5678 8901",
      expiryDate: "12/28",
      balance: 450.00,
      status: "active",
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/, "$1 **** **** $4");
  };

  const copyCardNumber = (cardNumber: string) => {
    navigator.clipboard.writeText(cardNumber);
    setCopiedCard(cardNumber);
    setTimeout(() => setCopiedCard(null), 2000);
  };

  return (
    <>
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
          <Link
            href="/dashboard/create-card"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Card
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Card Front */}
            <div className="relative p-6 h-48 flex flex-col bg-gradient-to-br from-gray-900 to-black">
              <div className="flex items-start justify-between mb-8">
                <span className="text-white font-bold text-xl">VISA</span>
                <span className="text-gray-400 text-xs font-medium border border-gray-600 px-3 py-1 rounded-full">
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
                  <p className="text-white text-sm font-medium">{card.name}</p>
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-16">
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">You don't have any cards yet</p>
          <Link
            href="/dashboard/create-card"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Your First Card
          </Link>
        </div>
      )}
    </>
  );
}
