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
  Download
} from "lucide-react";

interface Card {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  cardNumber: string;
  name: string;
  balance: number;
  status: "active" | "expired" | "frozen";
  spent: number;
  limit: number;
  expiryDate: string;
  createdAt: string;
  lastUsed?: string;
  cardType: "virtual" | "physical";
  currency: string;
}

export default function AdminCardsPage() {
  const [cards] = useState<Card[]>([
    {
      id: "CRD001",
      userId: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      cardNumber: "4532 1234 5678 8901",
      name: "Shopping Card",
      balance: 450.00,
      status: "active",
      spent: 550,
      limit: 1000,
      expiryDate: "12/26",
      createdAt: "2024-10-15",
      lastUsed: "2024-12-10",
      cardType: "virtual",
      currency: "USD"
    },
    {
      id: "CRD002",
      userId: "2",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      cardNumber: "4532 1234 5678 2345",
      name: "Subscription Card",
      balance: 25.50,
      status: "active",
      spent: 974.50,
      limit: 1000,
      expiryDate: "03/27",
      createdAt: "2024-11-20",
      lastUsed: "2024-12-09",
      cardType: "virtual",
      currency: "USD"
    },
    {
      id: "CRD003",
      userId: "3",
      userName: "Bob Johnson",
      userEmail: "bob@example.com",
      cardNumber: "4532 1234 5678 3456",
      name: "Travel Card",
      balance: 0,
      status: "frozen",
      spent: 1000,
      limit: 1000,
      expiryDate: "09/26",
      createdAt: "2024-09-05",
      lastUsed: "2024-12-01",
      cardType: "virtual",
      currency: "USD"
    },
    {
      id: "CRD004",
      userId: "4",
      userName: "Alice Brown",
      userEmail: "alice@example.com",
      cardNumber: "4532 1234 5678 4567",
      name: "Business Expenses",
      balance: 890.00,
      status: "active",
      spent: 210,
      limit: 2000,
      expiryDate: "06/27",
      createdAt: "2024-08-12",
      lastUsed: "2024-12-08",
      cardType: "virtual",
      currency: "USD"
    },
    {
      id: "CRD005",
      userId: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      cardNumber: "4532 1234 5678 5678",
      name: "Gaming Card",
      balance: 125.00,
      status: "expired",
      spent: 1875,
      limit: 2000,
      expiryDate: "11/24",
      createdAt: "2024-05-10",
      lastUsed: "2024-11-15",
      cardType: "virtual",
      currency: "USD"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredCards = cards.filter((card: Card) => {
    const matchesSearch =
      card.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.cardNumber.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || card.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: cards.length,
    active: cards.filter((c: Card) => c.status === "active").length,
    frozen: cards.filter((c: Card) => c.status === "frozen").length,
    expired: cards.filter((c: Card) => c.status === "expired").length,
    totalBalance: cards.reduce((sum: number, card: Card) => sum + card.balance, 0),
    totalSpent: cards.reduce((sum: number, card: Card) => sum + card.spent, 0)
  };

  const handleFreezeCard = (cardId: string) => {
    console.log("Freeze card:", cardId);
    // Handle freeze logic
  };

  const handleUnfreezeCard = (cardId: string) => {
    console.log("Unfreeze card:", cardId);
    // Handle unfreeze logic
  };

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
                placeholder="Search cards by user, name, or card number..."
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
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
              <option value="expired">Expired</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
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
              {filteredCards.map((card: Card, index: number) => (
                <motion.tr
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        card.status === "active"
                          ? "bg-green-100 text-green-600"
                          : card.status === "frozen"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{card.name}</p>
                        <p className="text-sm text-gray-500 font-mono">•••• {card.cardNumber.slice(-4)}</p>
                        <p className="text-xs text-gray-400">{card.cardType} • {card.currency}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">{card.userName}</p>
                      <p className="text-sm text-gray-500">{card.userEmail}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{formatCurrency(card.balance)}</p>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(card.spent)}</p>
                      <p className="text-xs text-gray-500">of {formatCurrency(card.limit)}</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full"
                          style={{ width: `${Math.min((card.spent / card.limit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      card.status === "active"
                        ? "bg-green-100 text-green-700"
                        : card.status === "frozen"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {card.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{card.expiryDate}</td>
                  <td className="p-4 text-sm text-gray-600">{card.createdAt}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      {card.status === "active" ? (
                        <button
                          onClick={() => handleFreezeCard(card.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Freeze Card"
                        >
                          <Ban className="w-4 h-4 text-blue-600" />
                        </button>
                      ) : card.status === "frozen" ? (
                        <button
                          onClick={() => handleUnfreezeCard(card.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Unfreeze Card"
                        >
                          <RefreshCw className="w-4 h-4 text-green-600" />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No cards found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}