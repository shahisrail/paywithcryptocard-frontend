"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useGetMyCardsQuery } from "@/redux/services/cardApi";
import { useGetMyTransactionsQuery } from "@/redux/services/transactionApi";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/slices/authSlice";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showBalance, setShowBalance] = useState(true);
  const [cardSuccess, setCardSuccess] = useState(false);
  const [cardError, setCardError] = useState("");

  // Fetch user data
  const { data: userData, isLoading: userLoading, refetch: refetchUser } = useGetCurrentUserQuery();
  const { data: cardsData, isLoading: cardsLoading } = useGetMyCardsQuery();
  const { data: transactionsData, isLoading: transactionsLoading } = useGetMyTransactionsQuery({
    limit: 5
  });

  // Import mutation hook
  const [createCard, { isLoading: isCreatingCard }] = require('@/redux/services/cardApi').useCreateCardMutation();

  // Refetch user data on mount to get latest balance
  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  // Update Redux state when user data changes
  useEffect(() => {
    if (userData?.data) {
      dispatch(updateUser(userData.data));
    }
  }, [userData, dispatch]);

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
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">Total Balance</p>
            <p className="text-3xl md:text-4xl font-bold text-black">
              {showBalance ? formatCurrency(totalBalance) : "••••••"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors self-center sm:self-auto"
            >
              {showBalance ? (
                <EyeOff className="w-5 h-5 text-gray-600" />
              ) : (
                <Eye className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {/* Dynamic Primary Action */}
            {totalBalance === 0 ? (
              <Link
                href="/dashboard/topup"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors text-sm sm:text-base flex-1 sm:flex-initial"
              >
                <Plus className="w-5 h-5" />
                Add Funds
              </Link>
            ) : (
              <button
                onClick={handleCreateCard}
                disabled={isCreatingCard}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base flex-1 sm:flex-initial"
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
            )}
          </div>
        </div>
        {/* Balance warning */}
        {totalBalance === 0 && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Step 1:</span> Add funds to your account to create a virtual card.
            </p>
          </div>
        )}

        {/* Card creation feedback */}
        {cardSuccess && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-black" />
              <p className="text-sm text-black font-medium">Card created successfully! Check your cards below.</p>
            </div>
          </div>
        )}

        {cardError && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-black" />
              <p className="text-sm text-black font-medium">{cardError}</p>
            </div>
          </div>
        )}
      </div>

      {/* Cards Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h2 className="text-lg font-semibold text-black">
            Your Cards {cards.length > 0 && `(${cards.length})`}
          </h2>
          {totalBalance > 0 ? (
            <button
              onClick={handleCreateCard}
              disabled={isCreatingCard}
              className="text-sm text-black hover:underline disabled:opacity-50 disabled:cursor-not-allowed self-start sm:self-auto"
            >
              {isCreatingCard ? "Creating..." : "Create new card"}
            </button>
          ) : (
            <span className="text-sm text-gray-400 cursor-not-allowed">
              Create new card
            </span>
          )}
        </div>

        {cardsLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
          </div>
        ) : cards.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            {totalBalance === 0 ? (
              <>
                <p className="text-gray-600 mb-4">Add funds to create your first virtual card.</p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-500 font-medium rounded-lg cursor-not-allowed">
                  <Plus className="w-5 h-5" />
                  Create Your First Card
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Add funds first to unlock card creation
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">You don't have any cards yet.</p>
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
                      Create Your First Card
                    </>
                  )}
                </button>
              </>
            )}
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
                        ? 'border-gray-500 text-gray-400'
                        : card.status === 'frozen'
                        ? 'border-gray-500 text-gray-400'
                        : 'border-gray-500 text-gray-400'
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h2 className="text-lg font-semibold text-black">Recent Transactions</h2>
          <Link
            href="/dashboard/transactions"
            className="text-sm text-black hover:underline self-start sm:self-auto"
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
                      transaction.amount > 0 ? "text-black" : "text-black"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className={`text-xs ${
                      transaction.status === 'completed'
                        ? 'text-black'
                        : transaction.status === 'pending'
                        ? 'text-gray-600'
                        : 'text-black'
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
