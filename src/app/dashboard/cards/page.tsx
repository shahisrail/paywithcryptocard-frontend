"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Search,
  Filter,
  Plus,
  Eye,
  Copy,
  Check,
  MoreVertical,
  Lock,
  Unlock,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";
import CryptoCard from "@/components/CryptoCard";

interface Card {
  id: string;
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  limit: number;
  spent: number;
  status: "active" | "frozen" | "expired";
  cardType: "virtual" | "physical";
  createdAt: string;
  lastUsed?: string;
  color: string;
}

export default function CardsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [copiedCard, setCopiedCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [cards] = useState<Card[]>([
    {
      id: "1",
      name: "Shopping Card",
      cardNumber: "4532 1234 5678 8901",
      expiryDate: "12/26",
      cvv: "123",
      balance: 450.0,
      limit: 1000,
      spent: 550,
      status: "active",
      cardType: "virtual",
      createdAt: "2024-10-15",
      lastUsed: "2024-12-10",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "2",
      name: "Subscription Card",
      cardNumber: "4532 1234 5678 2345",
      expiryDate: "03/27",
      cvv: "456",
      balance: 25.5,
      limit: 1000,
      spent: 974.5,
      status: "active",
      cardType: "virtual",
      createdAt: "2024-11-20",
      lastUsed: "2024-12-09",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "3",
      name: "Travel Card",
      cardNumber: "4532 1234 5678 3456",
      expiryDate: "09/26",
      cvv: "789",
      balance: 890.0,
      limit: 1000,
      spent: 110,
      status: "frozen",
      cardType: "virtual",
      createdAt: "2024-09-05",
      lastUsed: "2024-12-01",
      color: "from-emerald-600 to-teal-600",
    },
    {
      id: "4",
      name: "Business Expenses",
      cardNumber: "4532 1234 5678 4567",
      expiryDate: "06/27",
      cvv: "012",
      balance: 1250.0,
      limit: 2000,
      spent: 750,
      status: "active",
      cardType: "virtual",
      createdAt: "2024-08-12",
      lastUsed: "2024-12-08",
      color: "from-orange-600 to-red-600",
    },
    {
      id: "5",
      name: "Gaming Card",
      cardNumber: "4532 1234 5678 5678",
      expiryDate: "11/24",
      cvv: "345",
      balance: 0,
      limit: 1000,
      spent: 1000,
      status: "expired",
      cardType: "virtual",
      createdAt: "2024-05-10",
      lastUsed: "2024-11-15",
      color: "from-indigo-600 to-purple-600",
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.replace(
      /(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/,
      "$1 **** **** $4"
    );
  };

  const copyCardNumber = (cardNumber: string) => {
    navigator.clipboard.writeText(cardNumber);
    setCopiedCard(cardNumber);
    setTimeout(() => setCopiedCard(null), 2000);
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.cardNumber.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || card.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);
  const totalSpent = cards.reduce((sum, card) => sum + card.spent, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Sidebar */}
      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 relative">
        {/* Glassmorphic Header */}
        <header className="bg-white/70 backdrop-blur sticky top-0 z-40 border-b border-slate-100 sticky top-0 z-40">
          <div className="responsive-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                  My Cards
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200 group"
                >
                  {showBalance ? (
                    <svg
                      className="w-5 h-5 text-slate-900 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-slate-900 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
                <Link
                  href="/dashboard/create-card"
                  className="group relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-slate-900 font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Card
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-100">
                    <CreditCard className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-500/20">
                    <span className="text-purple-400 text-sm font-medium">
                      {cards.length} Cards
                    </span>
                  </div>
                </div>
                <h3 className="text-slate-500 text-sm mb-1 font-medium">
                  Total Balance
                </h3>
                <p className="text-2xl font-bold text-slate-900">
                  {showBalance ? formatCurrency(totalBalance) : "••••••"}
                </p>
              </div>
            </motion.div>

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
              <div className="absolute inset-0 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-all duration-300"></div>
              <div className="relative bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center border border-blue-200">
                    <Activity className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-500/20">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-medium">
                      Active
                    </span>
                  </div>
                </div>
                <h3 className="text-slate-500 text-sm mb-1 font-medium">
                  Active Cards
                </h3>
                <p className="text-2xl font-bold text-slate-900">
                  {cards.filter((card) => card.status === "active").length}
                </p>
              </div>
            </motion.div>

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
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200">
                    <ArrowDownLeft className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-emerald-500/20">
                    <span className="text-emerald-400 text-sm font-medium">
                      Total
                    </span>
                  </div>
                </div>
                <h3 className="text-slate-500 text-sm mb-1 font-medium">
                  Total Spent
                </h3>
                <p className="text-2xl font-bold text-slate-900">
                  {showBalance ? formatCurrency(totalSpent) : "••••••"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center border border-orange-200">
                    <Lock className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full border border-orange-500/20">
                    <span className="text-orange-400 text-sm font-medium">
                      Security
                    </span>
                  </div>
                </div>
                <h3 className="text-slate-500 text-sm mb-1 font-medium">
                  Frozen Cards
                </h3>
                <p className="text-2xl font-bold text-slate-900">
                  {cards.filter((card) => card.status === "frozen").length}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search cards by name or number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all" className="bg-gray-800">
                    All Status
                  </option>
                  <option value="active" className="bg-gray-800">
                    Active
                  </option>
                  <option value="frozen" className="bg-gray-800">
                    Frozen
                  </option>
                  <option value="expired" className="bg-gray-800">
                    Expired
                  </option>
                </select>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200 group">
                  <Filter className="w-5 h-5 text-gray-300 group-hover:text-slate-900" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 * index + 0.5,
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{ y: -10, rotateX: -5 }}
                className="group relative preserve-3d"
                style={{ perspective: "1000px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

                {/* Card Front - Exact Design from Images */}
                <div
                  className="relative rounded-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-300"
                  style={{
                    background: card.color.includes("purple")
                      ? "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f43f5e 100%)"
                      : card.color.includes("blue")
                      ? "linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #22d3ee 100%)"
                      : card.color.includes("emerald")
                      ? "linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #22d3ee 100%)"
                      : card.color.includes("orange")
                      ? "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%)"
                      : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                  }}
                >
                  {/* Background Pattern/Decoration */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  </div>

                  {/* Card Content Container */}
                  <div className="relative p-6 h-56 flex flex-col">
                    {/* Top Row - CREDIT Label */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="text-white text-xs font-bold tracking-widest uppercase opacity-90">
                          CREDIT
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            card.status === "active"
                              ? "bg-emerald-300 animate-pulse"
                              : card.status === "frozen"
                              ? "bg-blue-300"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span className="text-white/90 text-xs font-medium capitalize">
                          {card.status}
                        </span>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="mb-auto">
                      <p className="text-white text-2xl font-bold tracking-[0.2em] font-mono">
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
                          {copiedCard === card.cardNumber ? (
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
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.8 }}
                  className="mt-4 backdrop-blur-xl bg-white  text-black border border-white/10 rounded-2xl p-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-black text-sm font-medium">
                        Balance
                      </span>
                      <span className="text-black font-bold text-lg">
                        {showBalance ? formatCurrency(card.balance) : "••••"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black text-sm font-medium">
                        Spent
                      </span>
                      <span className="text-black font-semibold">
                        {showBalance ? formatCurrency(card.spent) : "••••"}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full  rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(card.spent / card.limit) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-black">
                      <span>Limit: {formatCurrency(card.limit)}</span>
                      <span>
                        {Math.round((card.spent / card.limit) * 100)}% Used
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      {card.status === "active" && (
                        <button className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium text-slate-900/80 hover:text-slate-900 transition-all duration-200 flex items-center justify-center gap-1">
                          <Lock className="w-3 h-3" />
                          Freeze
                        </button>
                      )}
                      {card.status === "frozen" && (
                        <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-xs font-medium text-blue-400 hover:text-blue-300 transition-all duration-200 flex items-center justify-center gap-1">
                          <Unlock className="w-3 h-3" />
                          Unfreeze
                        </button>
                      )}
                      <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 transition-all duration-200 flex items-center justify-center gap-1">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {filteredCards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                No cards found matching your criteria.
              </p>
              <Link
                href="/dashboard/create-card"
                className="inline-flex items-center mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-slate-900 font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Card
              </Link>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
