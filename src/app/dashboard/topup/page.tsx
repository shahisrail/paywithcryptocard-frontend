"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Copy,
  Check,
  Search,
  Bitcoin,
  Wallet,
  TrendingUp,
  TrendingDown,
  QrCode,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  icon: any;
  address: string;
  currentPrice: number;
  change24h: number;
  networkFee: number;
  minAmount: number;
  color: string;
}

interface TopUpTransaction {
  id: string;
  cryptoId: string;
  amount: number;
  usdAmount: number;
  status: "pending" | "completed" | "failed";
  timestamp: string;
  txHash?: string;
}

export default function TopUpPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [topupAmount, setTopupAmount] = useState("");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState("deposit");
  const [transactions, setTransactions] = useState<TopUpTransaction[]>([]);

  const cryptoCurrencies: CryptoCurrency[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      icon: Bitcoin,
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      currentPrice: 94350.25,
      change24h: 2.5,
      networkFee: 0.0001,
      minAmount: 0.0001,
      color: "from-orange-400 to-orange-600"
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      icon: Wallet,
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      currentPrice: 3380.50,
      change24h: -1.2,
      networkFee: 0.01,
      minAmount: 0.01,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      icon: Wallet,
      address: "TRXNHfqEradKHuJf6HkqUEjXKyJKTEEEzv",
      currentPrice: 1.00,
      change24h: 0.1,
      networkFee: 1.0,
      minAmount: 10,
      color: "from-green-400 to-green-600"
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      icon: Wallet,
      address: "0xA0b86a33E6441b8e8C7C7b0b8e8e8C7C7b0b8e8e",
      currentPrice: 1.00,
      change24h: 0.0,
      networkFee: 0.5,
      minAmount: 10,
      color: "from-blue-400 to-indigo-600"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatCrypto = (amount: number, symbol: string) => {
    return `${amount.toFixed(6)} ${symbol}`;
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleTopUp = () => {
    if (!selectedCrypto || !topupAmount) return;

    const amount = parseFloat(topupAmount);
    const newTransaction: TopUpTransaction = {
      id: `TX${Date.now()}`,
      cryptoId: selectedCrypto.id,
      amount: amount / selectedCrypto.currentPrice,
      usdAmount: amount,
      status: "pending",
      timestamp: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);
  };

  const calculateUSDAmount = (cryptoAmount: number, crypto: CryptoCurrency) => {
    return cryptoAmount * crypto.currentPrice;
  };

  const calculateCryptoAmount = (usdAmount: number, crypto: CryptoCurrency) => {
    return usdAmount / crypto.currentPrice;
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
        {/* Glassmorphic Header */}
        <header className="bg-white/70 backdrop-blur sticky top-0 z-40 border-b border-slate-100 sticky top-0 z-40">
          <div className="responsive-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 bg-slate-50 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ArrowDownLeft className="w-6 h-6 text-green-400" />
                  Top Up
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-gold-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gold-200 text-sm font-medium">Deposit Active</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200">
                <button
                  onClick={() => setActiveTab("deposit")}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === "deposit"
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 border border-green-500/20"
                      : "text-gray-400 hover:text-gray-900 hover:bg-white/5"
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4 inline mr-2" />
                  Deposit
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === "history"
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-600/20 text-blue-400 border border-blue-500/20"
                      : "text-gray-400 hover:text-gray-900 hover:bg-white/5"
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  History
                </button>
              </div>
            </motion.div>

            {activeTab === "deposit" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Amount Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="backdrop-blur-xl bg-white/5 border border-gray-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-gold-400" />
                      Enter Amount
                    </h2>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300/70 mb-2">USD Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">$</span>
                        <input
                          type="number"
                          value={topupAmount}
                          onChange={(e) => setTopupAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full pl-10 pr-4 py-4 bg-slate-50 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 text-2xl font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-3 mb-8">
                      {[50, 100, 250, 500].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setTopupAmount(amount.toString())}
                          className="py-3 bg-slate-50 hover:bg-gray-200 border border-gray-200 rounded-xl text-gray-900 font-medium transition-all duration-200 hover:scale-105"
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>

                    {/* Crypto Selection */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-300/70 mb-4">Select Cryptocurrency</label>
                      <div className="space-y-3">
                        {cryptoCurrencies.map((crypto) => (
                          <motion.div
                            key={crypto.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedCrypto(crypto)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                              selectedCrypto?.id === crypto.id
                                ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-500/30"
                                : "bg-white/5 border-white/20 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${crypto.color} rounded-xl flex items-center justify-center`}>
                                  <crypto.icon className="w-5 h-5 text-gray-900" />
                                </div>
                                <div>
                                  <p className="text-gray-900 font-semibold">{crypto.name}</p>
                                  <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-gray-900 font-semibold">{formatCurrency(crypto.currentPrice)}</p>
                                <p className={`text-sm flex items-center gap-1 ${
                                  crypto.change24h >= 0 ? "text-green-400" : "text-red-400"
                                }`}>
                                  {crypto.change24h >= 0 ? (
                                    <TrendingUp className="w-3 h-3" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3" />
                                  )}
                                  {Math.abs(crypto.change24h)}%
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Conversion Display */}
                    {selectedCrypto && topupAmount && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-xl"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">You will receive:</span>
                          <span className="text-gray-900 font-bold text-lg">
                            {formatCrypto(calculateCryptoAmount(parseFloat(topupAmount), selectedCrypto), selectedCrypto.symbol)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-sm">
                          <span className="text-gray-400">Network fee:</span>
                          <span className="text-gray-300">
                            {formatCrypto(selectedCrypto.networkFee, selectedCrypto.symbol)} ≈ {formatCurrency(selectedCrypto.networkFee * selectedCrypto.currentPrice)}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleTopUp}
                      disabled={!selectedCrypto || !topupAmount}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-gray-900 font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ArrowDownLeft className="w-5 h-5" />
                      Generate Deposit Address
                    </motion.button>
                  </div>
                </motion.div>

                {/* Right Column - Deposit Address */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {selectedCrypto && topupAmount ? (
                    <div className="backdrop-blur-xl bg-white/5 border border-gray-200 rounded-3xl p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Deposit Address</h2>

                      {/* QR Code Placeholder */}
                      <div className="flex justify-center mb-6">
                        <div className="w-48 h-48 bg-slate-50 backdrop-blur-sm border-2 border-dashed border-white/30 rounded-2xl flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-gray-400" />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300/70 mb-2">
                          Send {selectedCrypto.symbol} to this address:
                        </label>
                        <div className="flex items-center gap-2 p-3 bg-slate-50 backdrop-blur-sm border border-gray-200 rounded-xl">
                          <div className="flex-1 font-mono text-sm text-gray-300 truncate">
                            {selectedCrypto.address}
                          </div>
                          <button
                            onClick={() => handleCopyAddress(selectedCrypto.address)}
                            className="p-2 bg-slate-50 hover:bg-gray-200 rounded-lg transition-all duration-200"
                          >
                            {copiedAddress ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900 font-medium">Send exact amount</p>
                            <p className="text-gray-400 text-sm">Send {formatCrypto(calculateCryptoAmount(parseFloat(topupAmount), selectedCrypto), selectedCrypto.symbol)} to this address</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900 font-medium">Network confirmation</p>
                            <p className="text-gray-400 text-sm">Your deposit will be credited after {selectedCrypto.networkFee} network confirmations</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900 font-medium">Minimum amount</p>
                            <p className="text-gray-400 text-sm">Minimum deposit is {formatCrypto(selectedCrypto.minAmount, selectedCrypto.symbol)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border border-blue-500/20 rounded-xl">
                        <p className="text-blue-400 text-sm text-center">
                          <strong>Important:</strong> Only send {selectedCrypto.name} to this address. Sending other cryptocurrencies may result in permanent loss.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="backdrop-blur-xl bg-white/5 border border-gray-200 rounded-3xl p-8 text-center">
                      <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Top Up?</h3>
                      <p className="text-gray-400">
                        Select a cryptocurrency and enter the amount to generate your deposit address.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            )}

            {activeTab === "history" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="backdrop-blur-xl bg-white/5 border border-gray-200 rounded-3xl overflow-hidden">
                  {transactions.length > 0 ? (
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Top-ups</h3>
                      <div className="space-y-4">
                        {transactions.map((transaction) => {
                          const crypto = cryptoCurrencies.find(c => c.id === transaction.cryptoId);
                          return (
                            <div key={transaction.id} className="p-4 bg-white/5 border border-gray-200 rounded-xl">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 bg-gradient-to-br ${crypto?.color || "from-gray-500 to-gray-700"} rounded-xl flex items-center justify-center`}>
                                    {crypto && <crypto.icon className="w-5 h-5 text-gray-900" />}
                                  </div>
                                  <div>
                                    <p className="text-gray-900 font-semibold">{formatCrypto(transaction.amount, crypto?.symbol || "")}</p>
                                    <p className="text-gray-400 text-sm">{formatCurrency(transaction.usdAmount)}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    transaction.status === "completed"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-yellow-500/20 text-yellow-400"
                                  }`}>
                                    {transaction.status}
                                  </span>
                                  <p className="text-gray-400 text-xs mt-1">{new Date(transaction.timestamp).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-16 text-center">
                      <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">No top-up history yet.</p>
                      <button
                        onClick={() => setActiveTab("deposit")}
                        className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-gray-900 font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                      >
                        Make Your First Deposit
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}