"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Search,
  Filter,
  Eye,
  Ban,
  RefreshCw,
  Download,
  Loader2,
} from "lucide-react";
import { useGetAllCardsQuery } from "@/redux/services/adminApi";

export default function AdminCardsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: cardsData, isLoading, error } = useGetAllCardsQuery({
    limit: 100,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const cards = cardsData?.data?.cards || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatExpiry = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      year: "2-digit",
    });
  };

  const filteredCards = cards.filter((card: any) => {
    const matchesSearch =
      card.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.lastFour?.includes(searchTerm);

    return matchesSearch;
  });

  const stats = {
    total: cards.length,
    active: cards.filter((c: any) => c.status === "active").length,
    frozen: cards.filter((c: any) => c.status === "frozen").length,
    expired: cards.filter((c: any) => c.status === "expired").length,
    totalBalance: cards.reduce((sum: number, card: any) => sum + (card.balance || 0), 0),
    totalSpent: cards.reduce((sum: number, card: any) => sum + (card.spent || 0), 0),
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
          <Ban className="w-5 h-5 text-red-600" />
          <p className="text-red-900 font-medium">Failed to load cards</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Card Management</h1>
        <p className="text-gray-600">Manage and monitor all virtual cards on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Cards</h3>
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
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Active Cards</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Balance</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalBalance)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Spent</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSpent)}</p>
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
                placeholder="Search cards by user, name, or last 4 digits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
              <option value="expired">Expired</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Cards Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Card</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">User</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Balance</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Spent/Limit</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Expiry</th>
                <th className="text-left p-4 text-sm font-medium text-gray-700">Created</th>
                <th className="text-center p-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCards.map((card: any, index: number) => {
                const spentPercentage = card.limit
                  ? Math.min(((card.spent || 0) / card.limit) * 100, 100)
                  : 0;

                return (
                  <motion.tr
                    key={card._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            card.status === "active"
                              ? "bg-green-100 text-green-600"
                              : card.status === "frozen"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{card.name || "Unnamed Card"}</p>
                          <p className="text-sm text-gray-500 font-mono">
                            •••• {card.lastFour || "????"
}
                          </p>
                          <p className="text-xs text-gray-400">
                            {card.type || "virtual"} • {card.currency || "USD"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {card.user?.fullName || "Unknown User"}
                        </p>
                        <p className="text-sm text-gray-500">{card.user?.email || card.userId}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(card.balance || 0)}
                      </p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(card.spent || 0)}
                        </p>
                        <p className="text-xs text-gray-500">
                          of {formatCurrency(card.limit || 0)}
                        </p>
                        {card.limit > 0 && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-black h-1.5 rounded-full"
                              style={{ width: `${spentPercentage}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          card.status === "active"
                            ? "bg-green-100 text-green-700"
                            : card.status === "frozen"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {card.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {card.expiryDate ? formatExpiry(card.expiryDate) : "N/A"}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {formatDate(card.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        {card.status === "active" && (
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Freeze Card"
                          >
                            <Ban className="w-4 h-4 text-blue-600" />
                          </button>
                        )}
                        {card.status === "frozen" && (
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Unfreeze Card"
                          >
                            <RefreshCw className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCards.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No cards found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
