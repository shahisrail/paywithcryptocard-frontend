"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Calendar,
  Loader2,
  Eye,
  CreditCard,
  Clock,
  Bitcoin,
  Wallet,
} from "lucide-react";
import { useGetMyTransactionsQuery } from "@/redux/services/transactionApi";
import { useGetMyCardsQuery } from "@/redux/services/cardApi";
import { useGetMyDepositsQuery } from "@/redux/services/depositApi";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const { data: transactionsData, isLoading: txLoading, error: txError } = useGetMyTransactionsQuery({
    limit: 100,
    status: statusFilter === "all" ? undefined : statusFilter,
    type: typeFilter === "all" ? undefined : typeFilter,
  });

  const { data: depositsData, isLoading: depLoading } = useGetMyDepositsQuery({
    limit: 100,
  });

  const { data: cardsData } = useGetMyCardsQuery();
  const cards = cardsData?.data || [];
  const transactions = transactionsData?.data?.transactions || [];
  const deposits = depositsData?.data?.deposits || [];

  const isLoading = txLoading || depLoading;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // Combine transactions and pending deposits
  const combinedItems = [
    ...transactions.map((t: any) => ({ ...t, itemType: 'transaction' })),
    ...deposits
      .filter((d: any) => d.status === 'pending') // Only show pending deposits
      .map((d: any) => ({
        ...d,
        itemType: 'deposit',
        description: `Crypto deposit: ${d.currency} ${d.amount}`,
        type: 'deposit',
        amount: d.usdAmount || 0,
        status: 'pending'
      }))
  ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredItems = combinedItems.filter((item: any) => {
    const matchesSearch =
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.itemType === 'deposit' && item.currency?.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const totalIncome = transactions
    .filter((t: any) => t.amount > 0)
    .reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
  const totalExpenses = Math.abs(
    transactions
      .filter((t: any) => t.amount < 0)
      .reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
  );
  const netBalance = totalIncome - totalExpenses;

  // Crypto icons map
  const CRYPTO_ICONS: Record<string, any> = {
    BTC: Bitcoin,
    ETH: Wallet,
    USDT_ERC20: Wallet,
    USDT_TRC20: Wallet,
    XMR: Wallet,
  };

  const getTransactionIcon = (type: string, itemType: string, currency?: string) => {
    if (itemType === 'deposit' && currency) {
      return CRYPTO_ICONS[currency] || Bitcoin;
    }
    const iconMap: Record<string, any> = {
      deposit: ArrowDownLeft,
      card_load: ArrowDownLeft,
      card_create: ArrowUpRight,
      purchase: ArrowUpRight,
      withdrawal: ArrowUpRight,
    };
    return iconMap[type] || ArrowRightLeft;
  };

  const getCategoryColor = (type: string, itemType: string, currency?: string) => {
    if (itemType === 'deposit') {
      const colorMap: Record<string, string> = {
        BTC: "from-orange-500 to-orange-600",
        ETH: "from-blue-500 to-blue-600",
        USDT_ERC20: "from-green-500 to-green-600",
        USDT_TRC20: "from-red-500 to-red-600",
        XMR: "from-gray-500 to-gray-600",
      };
      return colorMap[currency || "BTC"] || "from-gray-500 to-gray-600";
    }
    const colorMap: Record<string, string> = {
      deposit: "from-green-500 to-emerald-500",
      card_load: "from-blue-500 to-cyan-500",
      card_create: "from-purple-500 to-pink-500",
      purchase: "from-orange-400 to-red-500",
      withdrawal: "from-gray-400 to-gray-500",
    };
    return colorMap[type] || "from-gray-400 to-gray-500";
  };

  const getCategoryIcon = (type: string, itemType: string, currency?: string) => {
    if (itemType === 'deposit') {
      return "💰";
    }
    const iconMap: Record<string, string> = {
      deposit: "💰",
      card_load: "💳",
      card_create: "🎴",
      purchase: "🛒",
      withdrawal: "📤",
    };
    return iconMap[type] || "💳";
  };

  const getCardById = (cardId: string) => {
    return cards.find((c: any) => c._id === cardId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-black flex items-center gap-3">
          <ArrowRightLeft className="w-7 h-7 text-cyan-500" />
          Transactions
        </h1>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button className="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
            <Calendar className="w-5 h-5 text-slate-700" />
          </button>
          <button className="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
            <Download className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow">
                  <ArrowDownLeft className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Income</p>
                  <p className="text-lg font-semibold text-slate-900">{formatCurrency(totalIncome)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white shadow">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Expenses</p>
                  <p className="text-lg font-semibold text-slate-900">{formatCurrency(totalExpenses)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center text-white shadow">
                  <ArrowRightLeft className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Net Balance</p>
                  <p
                    className={`text-lg font-semibold ${
                      netBalance >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {formatCurrency(netBalance)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white shadow">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Transactions</p>
                  <p className="text-lg font-semibold text-slate-900">{transactions.length}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-100 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="card_create">Card Creation</option>
                <option value="card_load">Card Load</option>
                <option value="purchase">Purchase</option>
                <option value="withdrawal">Withdrawal</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-100 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <button className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                <Filter className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-5 text-sm font-medium text-slate-600">
                    Transaction
                  </th>
                  <th className="text-left p-5 text-sm font-medium text-slate-600">
                    Date & Time
                  </th>
                  <th className="text-left p-5 text-sm font-medium text-slate-600">
                    Card
                  </th>
                  <th className="text-right p-5 text-sm font-medium text-slate-600">
                    Amount
                  </th>
                  <th className="text-center p-5 text-sm font-medium text-slate-600">
                    Status
                  </th>
                  <th className="text-center p-5 text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item: any, index: number) => {
                  const { date, time } = formatDate(item.createdAt);
                  const card = item.cardId ? getCardById(item.cardId) : null;
                  const Icon = getTransactionIcon(item.type, item.itemType, item.currency);
                  const isDeposit = item.itemType === 'deposit';

                  return (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.03 * index }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedTransaction(item)}
                    >
                      <td className="p-5 bg-white">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-medium shadow ${getCategoryColor(
                              item.type,
                              item.itemType,
                              item.currency
                            )}`}
                          >
                            <span className="text-xl">{getCategoryIcon(item.type, item.itemType, item.currency)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {item.description || item.type.replace("_", " ")}
                            </p>
                            <p className="text-sm text-slate-500">
                              {item._id.slice(-8).toUpperCase()}
                              {isDeposit && <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Pending Deposit</span>}
                            </p>
                            {isDeposit && item.txHash && (
                              <p className="text-xs text-slate-500 font-mono truncate max-w-xs mt-1">
                                TX: {item.txHash}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-5 bg-white">
                        <div>
                          <p className="text-sm text-slate-700">{date}</p>
                          <p className="text-xs text-slate-500">{time}</p>
                        </div>
                      </td>

                      <td className="p-5 bg-white">
                        {card ? (
                          <div className="flex items-center gap-2 text-slate-700">
                            <CreditCard className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">{card.cardHolder}</span>
                            <span className="text-xs text-slate-500">•••• {card.cardNumber?.slice(-4)}</span>
                          </div>
                        ) : isDeposit ? (
                          <div className="flex items-center gap-2 text-slate-700">
                            <Bitcoin className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">{item.currency}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-500">-</span>
                        )}
                      </td>

                      <td
                        className={`p-5 bg-white text-right font-semibold text-lg ${
                          isDeposit ? "text-yellow-600" : (item.amount > 0 ? "text-emerald-600" : "text-rose-600")
                        }`}
                      >
                        {isDeposit ? (
                          <span className="text-yellow-600">⏳ Pending</span>
                        ) : (
                          <>
                            {item.amount > 0 ? "+" : ""}
                            {formatCurrency(item.amount || 0)}
                          </>
                        )}
                      </td>

                      <td className="p-5 bg-white text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            isDeposit
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : item.status === "completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : item.status === "pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : "bg-rose-50 text-rose-700 border border-rose-100"
                          }`}
                        >
                          {isDeposit ? "Pending Approval" : (
                            item.status === "completed"
                            ? "Completed"
                            : item.status === "pending"
                            ? "Pending"
                            : "Failed"
                          )}
                        </span>
                      </td>

                      <td className="p-5 bg-white text-center">
                        <button className="p-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100">
                          <Eye className="w-4 h-4 text-slate-700" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredItems.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 text-slate-500"
          >
            <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className="text-lg text-gray-600 mb-2">You haven't made any transactions yet.</p>
            <p className="text-sm text-gray-500">Your recent transactions will appear here.</p>
          </motion.div>
        )}

        {/* Detail Modal */}
        {selectedTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedTransaction(null)}
          >
            <motion.div
              initial={{ scale: 0.98, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Transaction Details</h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-1 text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Type</span>
                  <span className="font-medium">{selectedTransaction.type?.replace("_", " ") || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Description</span>
                  <span>{selectedTransaction.description || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Amount</span>
                  <span
                    className={`font-semibold ${
                      selectedTransaction.amount > 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {selectedTransaction.amount > 0 ? "+" : ""}
                    {formatCurrency(selectedTransaction.amount || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Date</span>
                  <span>{formatDate(selectedTransaction.createdAt).date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Time</span>
                  <span>{formatDate(selectedTransaction.createdAt).time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedTransaction.status === "completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : selectedTransaction.status === "pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}
