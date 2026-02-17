"use client";

import { useState } from "react";
import { Plus, Eye, EyeOff, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Link from "next/link";

interface Card {
  id: string;
  name: string;
  balance: number;
  cardNumber: string;
  expiryDate: string;
  status: "active" | "expired";
}

interface Transaction {
  id: string;
  type: "topup" | "payment";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending";
}

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);

  const [cards] = useState<Card[]>([
    {
      id: "1",
      name: "My Card",
      balance: 450.00,
      cardNumber: "4532 1234 5678 8901",
      expiryDate: "12/28",
      status: "active",
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "topup",
      amount: 500.00,
      description: "Bitcoin Deposit",
      date: "Jan 15, 2026",
      status: "completed",
    },
    {
      id: "2",
      type: "payment",
      amount: -29.99,
      description: "Netflix Subscription",
      date: "Jan 14, 2026",
      status: "completed",
    },
    {
      id: "3",
      type: "payment",
      amount: -45.00,
      description: "Amazon Purchase",
      date: "Jan 13, 2026",
      status: "completed",
    },
  ]);

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/, "$1 **** **** $4");
  };

  return (
    <>
      {/* Balance Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Balance</p>
            <p className="text-4xl font-bold text-black">
              {showBalance ? formatCurrency(totalBalance) : "••••••"}
            </p>
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
              href="/dashboard/topup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Funds
            </Link>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Your Card</h2>
          <Link
            href="/dashboard/create-card"
            className="text-sm text-black hover:underline"
          >
            Create new card
          </Link>
        </div>

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
                  <div className="text-right">
                    <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Expires</p>
                    <p className="text-white text-sm font-medium">{card.expiryDate}</p>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Balance</span>
                  <span className="text-lg font-semibold text-black">
                    {showBalance ? formatCurrency(card.balance) : "••••"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Recent Transactions</h2>
          <Link
            href="/dashboard/transactions"
            className="text-sm text-black hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-200">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "topup"
                        ? "bg-gray-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {transaction.type === "topup" ? (
                      <ArrowDownLeft className="w-5 h-5 text-black" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-black" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-black">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-black`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
