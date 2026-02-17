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
} from "lucide-react";
import { useGetMyTransactionsQuery } from "@/redux/services/transactionApi";
import { useGetMyCardsQuery } from "@/redux/services/cardApi";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const { data: transactionsData, isLoading, error } = useGetMyTransactionsQuery({
    limit: 100,
    status: statusFilter === "all" ? undefined : statusFilter,
    type: typeFilter === "all" ? undefined : typeFilter,
  });

  const { data: cardsData } = useGetMyCardsQuery();
  const cards = cardsData?.data || [];
  const transactions = transactionsData?.data?.transactions || [];

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

  const filteredTransactions = transactions.filter((transaction: any) => {
    const matchesSearch =
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction._id?.toLowerCase().includes(searchTerm.toLowerCase());

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

  const getTransactionIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      deposit: ArrowDownLeft,
      card_load: ArrowDownLeft,
      card_create: ArrowUpRight,
      purchase: ArrowUpRight,
      withdrawal: ArrowUpRight,
    };
    return iconMap[type] || ArrowRightLeft;
  };

  const getCategoryColor = (type: string) => {
    const colorMap: Record<string, string> = {
      deposit: "from-green-500 to-emerald-500",
      card_load: "from-blue-500 to-cyan-500",
      card_create: "from-purple-500 to-pink-500",
      purchase: "from-orange-400 to-red-500",
      withdrawal: "from-gray-400 to-gray-500",
    };
    return colorMap[type] || "from-gray-400 to-gray-500";
  };

  const getCategoryIcon = (type: string) => {
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

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <p className="text-red-900 font-medium">Failed to load transactions</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black flex items-center gap-3">
          <ArrowRightLeft className="w-7 h-7 text-cyan-500" />
          Transactions
        </h1>
        <div className="flex items-center gap-3">
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
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="flex gap-3 items-center">
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
                {filteredTransactions.map((transaction: any, index: number) => {
                  const { date, time } = formatDate(transaction.createdAt);
                  const card = transaction.cardId ? getCardById(transaction.cardId) : null;
                  const Icon = getTransactionIcon(transaction.type);

                  return (
                    <motion.tr
                      key={transaction._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.03 * index }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <td className="p-5 bg-white">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-medium shadow ${getCategoryColor(
                              transaction.type
                            )}`}
                          >
                            <span className="text-xl">{getCategoryIcon(transaction.type)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {transaction.description || transaction.type.replace("_", " ")}
                            </p>
                            <p className="text-sm text-slate-500">
                              {transaction._id.slice(-8).toUpperCase()}
                            </p>
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
                        ) : (
                          <span className="text-sm text-slate-500">-</span>
                        )}
                      </td>

                      <td
                        className={`p-5 bg-white text-right font-semibold text-lg ${
                          transaction.amount > 0 ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount || 0)}
                      </td>

                      <td className="p-5 bg-white text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.status === "completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : transaction.status === "pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : "bg-rose-50 text-rose-700 border border-rose-100"
                          }`}
                        >
                          {transaction.status === "completed"
                            ? "Completed"
                            : transaction.status === "pending"
                            ? "Pending"
                            : "Failed"}
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

        {filteredTransactions.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 text-slate-500"
          >
            <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p>No transactions found matching your criteria.</p>
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
