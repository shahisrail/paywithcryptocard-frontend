"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  Ban,
  AlertCircle
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  cards: number;
  status: "active" | "suspended" | "pending";
  joinDate: string;
  lastActivity: string;
}

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: "topup" | "payment" | "withdrawal";
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  merchant?: string;
  description?: string;
}

interface Card {
  id: string;
  userId: string;
  userName: string;
  cardNumber: string;
  name: string;
  balance: number;
  status: "active" | "expired" | "frozen";
  spent: number;
  limit: number;
  expiryDate: string;
}

export default function AdminDashboard() {

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      balance: 2450.00,
      cards: 3,
      status: "active",
      joinDate: "2024-10-15",
      lastActivity: "2024-12-10"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      balance: 1250.50,
      cards: 2,
      status: "active",
      joinDate: "2024-11-20",
      lastActivity: "2024-12-09"
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      balance: 890.00,
      cards: 1,
      status: "suspended",
      joinDate: "2024-09-05",
      lastActivity: "2024-12-01"
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      balance: 3200.00,
      cards: 5,
      status: "active",
      joinDate: "2024-08-12",
      lastActivity: "2024-12-10"
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      type: "topup",
      amount: 500.00,
      status: "completed",
      date: "2024-12-10",
      merchant: "Bitcoin Network"
    },
    {
      id: "2",
      userId: "2",
      userName: "Jane Smith",
      type: "payment",
      amount: -29.99,
      status: "completed",
      date: "2024-12-09",
      merchant: "Netflix"
    },
    {
      id: "3",
      userId: "3",
      userName: "Bob Johnson",
      type: "payment",
      amount: -125.50,
      status: "pending",
      date: "2024-12-08",
      merchant: "Amazon"
    },
    {
      id: "4",
      userId: "1",
      userName: "John Doe",
      type: "payment",
      amount: -89.99,
      status: "completed",
      date: "2024-12-07",
      merchant: "Steam"
    },
  ]);

  const [cards] = useState<Card[]>([
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      cardNumber: "4532 1234 5678 8901",
      name: "Shopping Card",
      balance: 450.00,
      status: "active",
      spent: 550,
      limit: 1000,
      expiryDate: "12/26"
    },
    {
      id: "2",
      userId: "2",
      userName: "Jane Smith",
      cardNumber: "4532 1234 5678 2345",
      name: "Subscription Card",
      balance: 25.50,
      status: "active",
      spent: 974.50,
      limit: 1000,
      expiryDate: "03/27"
    },
    {
      id: "3",
      userId: "3",
      userName: "Bob Johnson",
      cardNumber: "4532 1234 5678 3456",
      name: "Travel Card",
      balance: 0,
      status: "frozen",
      spent: 1000,
      limit: 1000,
      expiryDate: "09/26"
    },
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u: User) => u.status === "active").length,
    pendingVerifications: users.filter((u: User) => u.status === "pending").length,
    suspendedUsers: users.filter((u: User) => u.status === "suspended").length,
    totalBalance: users.reduce((sum: number, user: User) => sum + user.balance, 0),
    totalTransactions: transactions.length,
    pendingTransactions: transactions.filter((t: Transaction) => t.status === "pending").length,
    totalCards: cards.length,
    activeCards: cards.filter((c: Card) => c.status === "active").length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-green-600 text-sm font-medium">+12.5%</span>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{stats.activeUsers} active</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-green-600 text-sm font-medium">+8.2%</span>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">Total Balance</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalBalance)}</p>
              <p className="text-xs text-gray-500 mt-1">Across all users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-green-600 text-sm font-medium">+5.1%</span>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">Total Cards</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCards}</p>
              <p className="text-xs text-gray-500 mt-1">{stats.activeCards} active</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-yellow-600 text-sm font-medium">{stats.pendingTransactions}</span>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">Total Transactions</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</p>
              <p className="text-xs text-gray-500 mt-1">{stats.pendingTransactions} pending</p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Manage Users</p>
                <p className="text-sm text-gray-500">View and manage user accounts</p>
              </button>
              <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left">
                <CreditCard className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Card Management</p>
                <p className="text-sm text-gray-500">Monitor and control virtual cards</p>
              </button>
              <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left">
                <Activity className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">Transaction Review</p>
                <p className="text-sm text-gray-500">Review pending transactions</p>
              </button>
              <button className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left">
                <AlertCircle className="w-6 h-6 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">Security Alerts</p>
                <p className="text-sm text-gray-500">Monitor suspicious activity</p>
              </button>
            </div>
          </div>

          {/* Recent Users Table */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                View All Users →
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-gray-700">User</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-700">Balance</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-700">Cards</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-700">Last Activity</th>
                      <th className="text-center p-4 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user: User, index: number) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-900 font-medium">
                          {formatCurrency(user.balance)}
                        </td>
                        <td className="p-4 text-sm text-gray-900">{user.cards}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : user.status === "suspended"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">{user.lastActivity}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Ban className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pending Transactions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Pending Transactions</h2>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                View All Transactions →
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-gray-700">Transaction</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-700">User</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-700">Date</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-700">Amount</th>
                      <th className="text-center p-4 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-center p-4 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.filter((t: Transaction) => t.status === "pending").map((transaction: Transaction, index: number) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              transaction.type === "topup"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}>
                              {transaction.type === "topup" ? (
                                <ArrowDownLeft className="w-5 h-5" />
                              ) : (
                                <ArrowUpRight className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.type === "topup" ? "Top-up" : "Payment"}</p>
                              <p className="text-sm text-gray-500">{transaction.merchant}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-900">{transaction.userName}</td>
                        <td className="p-4 text-sm text-gray-600">{transaction.date}</td>
                        <td className={`p-4 text-right font-medium ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.amount > 0 ? "+" : ""}{formatCurrency(transaction.amount)}
                        </td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            pending
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200">
                              Approve
                            </button>
                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200">
                              Reject
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </div>
  );
}