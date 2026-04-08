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
  ArrowDownLeft,
  Loader2,
  Bitcoin,
  Wallet,
  CreditCard,
  Download,
} from "lucide-react";
import { useGetAllTransactionsQuery } from "@/redux/services/adminApi";
import { useGetAllDepositsQuery } from "@/redux/services/adminApi";

export default function AdminTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showDeposits, setShowDeposits] = useState(true); // Toggle between deposits and transactions

  const { data: transactionsData, isLoading: txLoading, error: txError } = useGetAllTransactionsQuery({
    limit: 100,
    status: statusFilter === "all" ? undefined : statusFilter,
    type: typeFilter === "all" ? undefined : typeFilter,
  });

  const { data: depositsData, isLoading: depLoading } = useGetAllDepositsQuery({
    limit: 100,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const transactions = transactionsData?.data?.transactions || [];
  const deposits = depositsData?.data?.deposits || [];

  const isLoading = txLoading || depLoading;

  // Combine transactions and all deposits (not just pending)
  const combinedItems = [
    ...transactions.map((t: any) => ({ ...t, itemType: 'transaction' })),
    ...deposits.map((d: any) => ({
      ...d,
      itemType: 'deposit',
      description: `Crypto deposit: ${d.currency} ${d.amount}`,
      type: 'deposit',
      amount: d.usdAmount || d.amount || 0,
      status: d.status
    }))
  ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredItems = combinedItems.filter((item: any) => {
    const matchesSearch =
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.itemType === 'deposit' && item.currency?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter || (typeFilter === 'deposit' && item.itemType === 'deposit');

    return matchesSearch && matchesStatus && matchesType;
  });

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

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ['Type', 'ID', 'User Name', 'User Email', 'Description', 'Amount', 'Currency', 'Status', 'Date'];
    const rows = filteredItems.map((item: any) => {
      const { date } = formatDate(item.createdAt);
      return [
        item.itemType === 'deposit' ? 'Deposit' : 'Transaction',
        item._id || 'N/A',
        item.userId?.fullName || item.user?.fullName || 'Unknown',
        item.userId?.email || item.user?.email || 'Unknown',
        item.description || item.type || 'N/A',
        item.amount?.toString() || '0',
        item.currency || 'USD',
        item.status || 'unknown',
        date,
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: combinedItems.length,
    completed: combinedItems.filter((t: any) => t.status === "completed").length,
    pending: combinedItems.filter((t: any) => t.status === "pending").length,
    rejected: combinedItems.filter((t: any) => t.status === "rejected").length,
    approved: combinedItems.filter((t: any) => t.status === "approved").length,
    totalVolume: Math.abs(transactions.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)),
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (txError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-900 font-medium">Failed to load transactions</p>
        </div>
      </div>
    );
  }

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
          <h3 className="text-gray-500 text-sm mb-1">Total Items</h3>
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
          <h3 className="text-gray-500 text-sm mb-1">Approved</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
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
          <h3 className="text-gray-500 text-sm mb-1">Rejected</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
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
                placeholder="Search transactions by ID, user, description..."
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
              <option value="completed">Completed</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="payment">Payment</option>
              <option value="card_creation">Card Creation</option>
              <option value="card_funding">Card Funding</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button
              onClick={handleExportCSV}
              disabled={filteredItems.length === 0}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
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
                <th className="text-center p-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-center p-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item: any, index: number) => {
                const { date, time } = formatDate(item.createdAt);
                const isDeposit = item.itemType === 'deposit';
                const isPositive = item.type === "deposit" || item.amount > 0;

                return (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isDeposit
                              ? "bg-yellow-100 text-yellow-600"
                              : isPositive
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {isDeposit ? (
                            <Bitcoin className="w-5 h-5" />
                          ) : isPositive ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {String(item._id.slice(-8).toUpperCase())}
                            {isDeposit && <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Deposit</span>}
                          </p>
                          <p className="text-sm text-gray-500">{String(item.description || item.type)}</p>
                          {item.cardId && (
                            <p className="text-xs text-gray-400">
                              Card: {typeof item.cardId === 'object' ? String(item.cardId.cardNumber?.slice(-4) || '????') : String(item.cardId.slice(-4))}
                            </p>
                          )}
                          {isDeposit && item.txHash && (
                            <p className="text-xs text-gray-400">TX: {String(item.txHash.slice(0, 10))}...</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {String(item.userId?.fullName || item.user?.fullName || "Unknown User")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {String(item.userId?.email || item.user?.email || "No email")}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <div>{date}</div>
                      <div className="text-xs text-gray-400">{time}</div>
                    </td>
                    <td
                      className={`p-4 text-right font-medium ${
                        isDeposit ? "text-yellow-600" : isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isDeposit ? (
                        <span>{String(item.currency)} {String(item.amount)}</span>
                      ) : (
                        <>
                          {isPositive ? "+" : ""}
                          {formatCurrency(item.amount || 0)}
                        </>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "approved" || item.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {String(item.status.charAt(0).toUpperCase() + item.status.slice(1))}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredItems.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <ArrowRightLeft className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No transactions or deposits found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
