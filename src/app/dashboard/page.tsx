"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Check,
  Wallet,
  Activity,
  Menu,
  Bell,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  ArrowRightLeft,
} from "lucide-react";
import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";
import CryptoCard from "@/components/CryptoCard";

interface Card {
  id: string;
  name: string;
  balance: number;
  cardNumber: string;
  expiryDate: string;
  status: "active" | "expired";
  spent: number;
  limit: number;
}

interface Transaction {
  id: string;
  type: "topup" | "payment";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending";
  merchant?: string;
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [copiedCard, setCopiedCard] = useState<string | null>(null);

  const [cards] = useState<Card[]>([
    {
      id: "1",
      name: "Shopping Card",
      balance: 450.0,
      cardNumber: "4532 1234 5678 8901",
      expiryDate: "12/26",
      status: "active",
      spent: 550,
      limit: 1000,
    },
    {
      id: "2",
      name: "Subscription Card",
      balance: 25.5,
      cardNumber: "4532 1234 5678 2345",
      expiryDate: "03/27",
      status: "active",
      spent: 974.5,
      limit: 1000,
    },
    {
      id: "3",
      name: "Travel Card",
      balance: 890.0,
      cardNumber: "4532 1234 5678 3456",
      expiryDate: "09/26",
      status: "active",
      spent: 110,
      limit: 1000,
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "topup",
      amount: 500.0,
      description: "Bitcoin Deposit",
      date: "2024-12-09",
      status: "completed",
      merchant: "Bitcoin Network",
    },
    {
      id: "2",
      type: "payment",
      amount: -29.99,
      description: "Netflix Subscription",
      date: "2024-12-08",
      status: "completed",
      merchant: "Netflix",
    },
    {
      id: "3",
      type: "payment",
      amount: -45.0,
      description: "Amazon Purchase",
      date: "2024-12-07",
      status: "completed",
      merchant: "Amazon",
    },
    {
      id: "4",
      type: "payment",
      amount: -12.99,
      description: "Spotify Premium",
      date: "2024-12-06",
      status: "completed",
      merchant: "Spotify",
    },
    {
      id: "5",
      type: "payment",
      amount: -89.5,
      description: "Uber Rides",
      date: "2024-12-05",
      status: "completed",
      merchant: "Uber",
    },
  ]);

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalSpent = cards.reduce((sum, card) => sum + card.spent, 0);
  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);

  const copyCardNumber = (cardNumber: string) => {
    const formattedNumber = cardNumber.replace(
      /(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/,
      "$1 **** **** $4"
    );
    // write full number to clipboard (as before)
    navigator.clipboard.writeText(cardNumber);
    setCopiedCard(formattedNumber);
    setTimeout(() => setCopiedCard(null), 2000);
  };

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.replace(
      /(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/,
      "$1 **** **** $4"
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 relative">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur sticky top-0 z-40 border-b border-slate-100">
          <div className="responsive-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                >
                  <Menu className="w-5 h-5 text-slate-700" />
                </button>
                <h1 className="text-xl font-semibold text-slate-900">
                  Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200 group"
                  aria-label="Toggle balance visibility"
                >
                  {showBalance ? (
                    <EyeOff className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform" />
                  )}
                </button>
                <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg relative transition-all duration-200 group">
                  <Bell className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                </button>
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                  <span className="text-white font-bold text-sm">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  Welcome back, John
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </h2>
                <p className="text-sm text-slate-500">
                  Your crypto empire awaits — here’s a concise snapshot of your
                  finances.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-100">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-amber-700 text-sm font-medium">
                  System Active
                </span>
              </div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="group relative"
            >
              <div className="relative bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:bg-slate-50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 text-sm font-medium">
                      +12.5%
                    </span>
                  </div>
                </div>
                <h3 className="text-sm mb-1 font-medium text-slate-500">
                  Total Balance
                </h3>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {showBalance ? formatCurrency(totalBalance) : "••••••"}
                </p>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" />
                </div>
              </div>
            </motion.div>

            {/* Virtual Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative"
            >
              <div className="relative bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:bg-slate-50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-rose-50 rounded-full border border-rose-100">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    <span className="text-rose-600 text-sm font-medium">
                      {cards.length} Active
                    </span>
                  </div>
                </div>
                <h3 className="text-sm mb-1 font-medium text-slate-500">
                  Virtual Cards
                </h3>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {cards.length}
                </p>
                <div className="flex items-center gap-2">
                  {[...Array(cards.length)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Total Spent */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative"
            >
              <div className="relative bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:bg-slate-50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-rose-50 rounded-full border border-rose-100">
                    <Activity className="w-4 h-4 text-rose-500" />
                    <span className="text-rose-600 text-sm font-medium">
                      This Month
                    </span>
                  </div>
                </div>
                <h3 className="text-sm mb-1 font-medium text-slate-500">
                  Total Spent
                </h3>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {showBalance ? formatCurrency(totalSpent) : "••••••"}
                </p>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min((totalSpent / 2000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cards Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-violet-500" />
                Your Virtual Cards
              </h2>
              <Link
                href="/dashboard/create-card"
                className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-2xl hover:from-indigo-600 hover:to-violet-700 transition-all duration-300 hover:scale-105 shadow"
              >
                <Plus className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Create New Card</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform relative z-10" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 80,
                  }}
                  whileHover={{ y: -10, rotateX: -5 }}
                  className="group relative preserve-3d"
                  style={{ perspective: "1000px" }}
                >
                  <div className="absolute inset-0 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-all duration-300"></div>

                  {/* Card Front - Exact Design from Images */}
                  <div
                    className="relative rounded-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f43f5e 100%)",
                    }}
                  >
                    {/* Background Pattern/Decoration */}
                    <div className="absolute inset-0">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    </div>

                    {/* Card Content Container */}
                    <div className="relative p-6 h-48 flex flex-col">
                      {/* Top Row - CREDIT Label */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className="text-white text-xs font-bold tracking-widest uppercase opacity-90">
                            CREDIT
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                          <span className="text-white/90 text-xs font-medium capitalize">
                            {card.status}
                          </span>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="mb-auto">
                        <p className="text-white text-xl font-bold tracking-[0.2em] font-mono">
                          {maskCardNumber(card.cardNumber)}
                        </p>
                      </div>

                      {/* Bottom Row - Chip, Card Holder, Expiry */}
                      <div className="flex items-end justify-between">
                        {/* Left - Card Holder */}
                        <div className="flex items-center gap-3">
                          {/* Chip */}
                          <div className="bg-gradient-to-br from-yellow-300/90 to-yellow-500/90 w-11 h-9 rounded-lg flex items-center justify-center shadow-md border border-yellow-200/50 flex-shrink-0">
                            <CreditCard className="w-5 h-5 text-yellow-700/60" />
                          </div>
                          <div>
                            <p className="text-white/60 text-[9px] uppercase tracking-wider mb-0.5">
                              Card Holder
                            </p>
                            <p className="text-white text-sm font-semibold tracking-wide">
                              {card.name}
                            </p>
                          </div>
                        </div>

                        {/* Right - Expiry & Actions */}
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-white/60 text-[9px] uppercase tracking-wider mb-0.5">
                              Expires
                            </p>
                            <p className="text-white text-sm font-semibold tracking-wide">
                              {card.expiryDate}
                            </p>
                          </div>
                          <button
                            onClick={() => copyCardNumber(card.cardNumber)}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200"
                          >
                            {copiedCard === maskCardNumber(card.cardNumber) ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <Copy className="w-4 h-4 text-white/90" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                    className="mt-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-500">
                        Balance
                      </span>
                      <span className="text-slate-900 font-bold text-lg">
                        {showBalance ? formatCurrency(card.balance) : "••••"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${(card.balance / card.limit) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Limit: {formatCurrency(card.limit)}</span>
                      <span>
                        {Math.round((card.balance / card.limit) * 100)}%
                        Available
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ArrowRightLeft className="w-6 h-6 text-cyan-500" />
                Recent Transactions
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-3 bg-white border border-slate-100 rounded-xl transition-all duration-200 hover:shadow-sm">
                  <Search className="w-4 h-4 text-slate-700" />
                </button>
                <button className="p-3 bg-white border border-slate-100 rounded-xl transition-all duration-200 hover:shadow-sm">
                  <Filter className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left p-6 text-sm font-medium text-slate-500">
                        Transaction
                      </th>
                      <th className="text-left p-6 text-sm font-medium text-slate-500">
                        Date
                      </th>
                      <th className="text-right p-6 text-sm font-medium text-slate-500">
                        Amount
                      </th>
                      <th className="text-center p-6 text-sm font-medium text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((transaction, index) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.1 * index + 0.6,
                        }}
                        className="hover:bg-slate-50 transition-colors duration-150"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:scale-110 ${
                                transaction.type === "topup"
                                  ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-100"
                                  : "bg-gradient-to-br from-rose-50 to-rose-100 border-rose-100"
                              }`}
                            >
                              {transaction.type === "topup" ? (
                                <ArrowDownLeft className="w-6 h-6 text-emerald-500" />
                              ) : (
                                <ArrowUpRight className="w-6 h-6 text-rose-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 mb-1">
                                {transaction.description}
                              </p>
                              <p className="text-sm text-slate-500">
                                {transaction.merchant}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-sm text-slate-500">
                          {transaction.date}
                        </td>
                        <td
                          className={`p-6 text-right font-bold text-lg ${
                            transaction.amount > 0
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="p-6 text-center">
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 inline-block ${
                              transaction.status === "completed"
                                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                : "bg-amber-50 border-amber-100 text-amber-700"
                            }`}
                          >
                            {transaction.status === "completed"
                              ? "✓ Completed"
                              : "⏳ Pending"}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
