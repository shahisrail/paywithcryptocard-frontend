"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: "topup" | "payment" | "withdrawal";
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
  merchant?: string | null;
  cardLastFour?: string | null;
  fee: number;
  description: string;
}

export default function AdminTransactionsPage() {
  const [transactions] = useState<Transaction[]>([
    {
      id: "TRX001",
      userId: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      type: "topup",
      amount: 500.00,
      status: "completed",
      date: "2024-12-10",
      time: "14:23:45",
      merchant: "Bitcoin Network",
      cardLastFour: undefined,
      fee: 15.00,
      description: "Bitcoin deposit"
    },
    {
      id: "TRX002",
      userId: "2",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      type: "payment",
      amount: -29.99,
      status: "completed",
      date: "2024-12-09",
      time: "09:15:22",
      merchant: "Netflix",
      cardLastFour: "1234",
      fee: 0.00,
      description: "Monthly subscription"
    },
    {
      id: "TRX003",
      userId: "3",
      userName: "Bob Johnson",
      userEmail: "bob@example.com",
      type: "payment",
      amount: -125.50,
      status: "pending",
      date: "2024-12-08",
      time: "16:45:10",
      merchant: "Amazon",
      cardLastFour: "5678",
      fee: 0.00,
      description: "Online purchase"
    },
    {
      id: "TRX004",
      userId: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      type: "payment",
      amount: -89.99,
      status: "completed",
      date: "2024-12-07",
      time: "11:30:55",
      merchant: "Steam",
      cardLastFour: "8901",
      fee: 0.00,
      description: "Game purchase"
    },
    {
      id: "TRX005",
      userId: "4",
      userName: "Alice Brown",
      userEmail: "alice@example.com",
      type: "topup",
      amount: 1000.00,
      status: "failed",
      date: "2024-12-06",
      time: "08:15:30",
      merchant: "Ethereum Network",
      cardLastFour: null,
      fee: 30.00,
      description: "ETH deposit - insufficient gas"
    },
    {
      id: "TRX006",
      userId: "2",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      type: "withdrawal",
      amount: -200.00,
      status: "pending",
      date: "2024-12-05",
      time: "13:22:18",
      merchant: null,
      cardLastFour: null,
      fee: 5.00,
      description: "Withdrawal to external wallet"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredTransactions = transactions.filter((transaction: Transaction) => {
    const matchesSearch =
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.merchant?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: transactions.length,
    completed: transactions.filter((t: Transaction) => t.status === "completed").length,
    pending: transactions.filter((t: Transaction) => t.status === "pending").length,
    failed: transactions.filter((t: Transaction) => t.status === "failed").length,
    totalVolume: Math.abs(transactions.reduce((sum: number, t: Transaction) => sum + t.amount, 0)),
    totalFees: transactions.reduce((sum: number, t: Transaction) => sum + t.fee, 0)
  };

  const handleApproveTransaction = (transactionId: string) => {
    console.log("Approve transaction:", transactionId);
    // Handle approval logic
  };

  const handleRejectTransaction = (transactionId: string) => {
    console.log("Reject transaction:", transactionId);
    // Handle rejection logic
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Management</h1>
        <p className="text-gray-600">Monitor and manage all platform transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Transactions</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Completed</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Pending</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Failed</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.failed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Volume</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalVolume)}</p>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions by ID, user, merchant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="topup">Top-up</option>
              <option value="payment">Payment</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Transaction</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">User</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Date & Time</th>
                <th className="text-right p-4 text-sm font-medium text-gray-700">Amount</th>
                <th className="text-right p-4 text-sm font-medium text-gray-700">Fee</th>
                <th className="text-center p-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-center p-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction: Transaction, index: number) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "topup"
                          ? "bg-green-100 text-green-600"
                          : transaction.type === "withdrawal"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {transaction.type === "topup" ? (
                          <ArrowDownLeft className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.id}</p>
                        <p className="text-sm text-gray-500">{transaction.description}</p>
                        {transaction.merchant && (
                          <p className="text-xs text-gray-400">{transaction.merchant}</p>
                        )}
                        {transaction.cardLastFour && (
                          <p className="text-xs text-gray-400">Card •••• {transaction.cardLastFour}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.userName}</p>
                      <p className="text-sm text-gray-500">{transaction.userEmail}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div>{transaction.date}</div>
                    <div className="text-xs text-gray-400">{transaction.time}</div>
                  </td>
                  <td className={`p-4 text-right font-medium ${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}{formatCurrency(transaction.amount)}
                  </td>
                  <td className="p-4 text-right text-sm text-gray-600">
                    {formatCurrency(transaction.fee)}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      {transaction.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApproveTransaction(transaction.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectTransaction(transaction.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <ArrowRightLeft className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No transactions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}