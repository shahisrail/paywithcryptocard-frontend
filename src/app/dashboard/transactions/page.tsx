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
  ChevronDown,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "topup" | "payment" | "refund";
  amount: number;
  description: string;
  merchant: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "failed";
  cardId: string;
  cardName: string;
  cardLastFour: string;
  category: string;
  fee: number;
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [transactions] = useState<Transaction[]>([
    {
      id: "TRX001",
      type: "topup",
      amount: 500.0,
      description: "Bitcoin Deposit",
      merchant: "Bitcoin Network",
      date: "2024-12-10",
      time: "14:23:45",
      status: "completed",
      cardId: "1",
      cardName: "Shopping Card",
      cardLastFour: "8901",
      category: "Crypto",
      fee: 15.0,
    },
    {
      id: "TRX002",
      type: "payment",
      amount: -29.99,
      description: "Netflix Subscription",
      merchant: "Netflix",
      date: "2024-12-09",
      time: "09:15:22",
      status: "completed",
      cardId: "2",
      cardName: "Subscription Card",
      cardLastFour: "2345",
      category: "Entertainment",
      fee: 0.0,
    },
    {
      id: "TRX003",
      type: "payment",
      amount: -125.5,
      description: "Amazon Purchase",
      merchant: "Amazon",
      date: "2024-12-08",
      time: "16:45:10",
      status: "pending",
      cardId: "1",
      cardName: "Shopping Card",
      cardLastFour: "8901",
      category: "Shopping",
      fee: 0.0,
    },
    {
      id: "TRX004",
      type: "payment",
      amount: -89.99,
      description: "Steam Game Purchase",
      merchant: "Steam",
      date: "2024-12-07",
      time: "11:30:55",
      status: "completed",
      cardId: "3",
      cardName: "Travel Card",
      cardLastFour: "3456",
      category: "Gaming",
      fee: 0.0,
    },
    {
      id: "TRX005",
      type: "payment",
      amount: -12.99,
      description: "Spotify Premium",
      merchant: "Spotify",
      date: "2024-12-06",
      time: "08:20:18",
      status: "completed",
      cardId: "2",
      cardName: "Subscription Card",
      cardLastFour: "2345",
      category: "Entertainment",
      fee: 0.0,
    },
    {
      id: "TRX006",
      type: "payment",
      amount: -45.67,
      description: "Uber Ride",
      merchant: "Uber",
      date: "2024-12-05",
      time: "19:45:30",
      status: "completed",
      cardId: "4",
      cardName: "Business Expenses",
      cardLastFour: "4567",
      category: "Transport",
      fee: 0.0,
    },
    {
      id: "TRX007",
      type: "topup",
      amount: 1000.0,
      description: "Ethereum Deposit",
      merchant: "Ethereum Network",
      date: "2024-12-04",
      time: "13:12:45",
      status: "failed",
      cardId: "1",
      cardName: "Shopping Card",
      cardLastFour: "8901",
      category: "Crypto",
      fee: 30.0,
    },
    {
      id: "TRX008",
      type: "refund",
      amount: 29.99,
      description: "Netflix Refund",
      merchant: "Netflix",
      date: "2024-12-03",
      time: "22:15:00",
      status: "completed",
      cardId: "2",
      cardName: "Subscription Card",
      cardLastFour: "2345",
      category: "Entertainment",
      fee: 0.0,
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );
  const netBalance = totalIncome - totalExpenses;
  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Entertainment: "🎬",
      Shopping: "🛍️",
      Gaming: "🎮",
      Transport: "🚗",
      Crypto: "₿",
      Food: "🍔",
      Travel: "✈️",
    };
    return icons[category] || "💳";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Entertainment: "from-purple-500 to-pink-500",
      Shopping: "from-blue-500 to-cyan-500",
      Gaming: "from-green-500 to-emerald-500",
      Transport: "from-orange-400 to-red-500",
      Crypto: "from-yellow-400 to-orange-500",
      Food: "from-red-500 to-pink-500",
      Travel: "from-indigo-500 to-purple-500",
    };
    return colors[category] || "from-gray-400 to-gray-500";
  };

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
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Income</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(totalIncome)}
                    </p>
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
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Expenses</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(totalExpenses)}
                    </p>
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
                    <CreditCard className="w-6 h-6" />
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
                    <p className="text-sm text-slate-500">Total Fees</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(totalFees)}
                    </p>
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
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
              </div>

              <div className="flex gap-3 items-center">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-100 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="all">All Types</option>
                  <option value="topup">Top-up</option>
                  <option value="payment">Payment</option>
                  <option value="refund">Refund</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-100 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
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
                              transaction.category
                            )}`}
                          >
                            <span className="text-xl">
                              {getCategoryIcon(transaction.category)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-slate-500">
                              {transaction.merchant}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-5 bg-white">
                        <div>
                          <p className="text-sm text-slate-700">
                            {transaction.date}
                          </p>
                          <p className="text-xs text-slate-500">
                            {transaction.time}
                          </p>
                        </div>
                      </td>

                      <td className="p-5 bg-white">
                        <div className="flex items-center gap-2 text-slate-700">
                          <CreditCard className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">
                            {transaction.cardName}
                          </span>
                          <span className="text-xs text-slate-500">
                            • • • • {transaction.cardLastFour}
                          </span>
                        </div>
                      </td>

                      <td
                        className={`p-5 bg-white text-right font-semibold text-lg ${
                          transaction.amount > 0
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredTransactions.length === 0 && (
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
                  <h3 className="text-lg font-semibold text-slate-900">
                    Transaction Details
                  </h3>
                  <button
                    onClick={() => setSelectedTransaction(null)}
                    className="p-1 text-slate-500 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Description</span>
                    <span>{selectedTransaction.description}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Merchant</span>
                    <span>{selectedTransaction.merchant}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Amount</span>
                    <span
                      className={`font-semibold ${
                        selectedTransaction.amount > 0
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {selectedTransaction.amount > 0 ? "+" : ""}
                      {formatCurrency(selectedTransaction.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Fee</span>
                    <span>{formatCurrency(selectedTransaction.fee)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Date</span>
                    <span>{selectedTransaction.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Time</span>
                    <span>{selectedTransaction.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Card</span>
                    <span>
                      {selectedTransaction.cardName} ••••
                      {selectedTransaction.cardLastFour}
                    </span>
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
