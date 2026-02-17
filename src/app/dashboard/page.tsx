"use client";

import { useState } from "react";
import { Plus, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGetMyCardsQuery } from "@/redux/services/cardApi";
import { useGetMyTransactionsQuery } from "@/redux/services/transactionApi";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);

  // Fetch user data
  const { data: userData, isLoading: userLoading } = useGetCurrentUserQuery();
  const { data: cardsData, isLoading: cardsLoading } = useGetMyCardsQuery();
  const { data: transactionsData, isLoading: transactionsLoading } = useGetMyTransactionsQuery({
    limit: 5
  });

  const cards = cardsData?.data || [];
  const transactions = transactionsData?.data?.transactions || [];
  const user = userData?.data;
  const totalBalance = user?.balance || 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})\s?(\d{4})\s?(\d{4})\s?(\d{4})/, "$1 **** **** $4");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
      case "card_load":
        return <ArrowDownLeft className="w-5 h-5 text-black" />;
      case "card_create":
      case "purchase":
      case "withdrawal":
        return <ArrowUpRight className="w-5 h-5 text-black" />;
      default:
        return <ArrowDownLeft className="w-5 h-5 text-black" />;
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

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
          <h2 className="text-lg font-semibold text-black">
            Your Cards {cards.length > 0 && `(${cards.length})`}
          </h2>
          <Link
            href="/dashboard/create-card"
            className="text-sm text-black hover:underline"
          >
            Create new card
          </Link>
        </div>

        {cardsLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
          </div>
        ) : cards.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-600 mb-4">You don't have any cards yet.</p>
            <Link
              href="/dashboard/create-card"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Your First Card
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card: any) => (
              <div key={card._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Card Front */}
                <div className="relative p-6 h-48 flex flex-col bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-white font-bold text-xl">VISA</span>
                    <span className={`text-xs font-medium border px-3 py-1 rounded-full ${
                      card.status === 'active'
                        ? 'border-green-500 text-green-400'
                        : card.status === 'frozen'
                        ? 'border-blue-500 text-blue-400'
                        : 'border-red-500 text-red-400'
                    }`}>
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
                    <div className="text-right">
                      <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Expires</p>
                      <p className="text-white text-sm font-medium">{card.expiryDate}</p>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
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
                </div>
              </div>
            ))}
          </div>
        )}
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

        {transactionsLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-600">No transactions yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction: any) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-black">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? "text-green-600" : "text-black"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className={`text-xs ${
                      transaction.status === 'completed'
                        ? 'text-green-600'
                        : transaction.status === 'pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
