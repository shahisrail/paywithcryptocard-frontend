"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  Copy,
  Check,
  Bitcoin,
  Wallet,
  TrendingUp,
  TrendingDown,
  QrCode,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  DollarSign,
  Info
} from "lucide-react";

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

  const calculateCryptoAmount = (usdAmount: number, crypto: CryptoCurrency) => {
    return usdAmount / crypto.currentPrice;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Add Funds</h1>
        <p className="text-gray-600">Top up your account with cryptocurrency</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("deposit")}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === "deposit"
              ? "text-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Deposit
          {activeTab === "deposit" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === "history"
              ? "text-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          History
          {activeTab === "history" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
          )}
        </button>
      </div>

      {activeTab === "deposit" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Amount & Crypto Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Amount Input Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Enter Amount
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">USD Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                  <input
                    type="number"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg text-2xl font-bold text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[50, 100, 250, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopupAmount(amount.toString())}
                    className="py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-black font-medium transition-all"
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Crypto Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Cryptocurrency</label>
                <div className="grid grid-cols-2 gap-3">
                  {cryptoCurrencies.map((crypto) => (
                    <motion.div
                      key={crypto.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCrypto(crypto)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedCrypto?.id === crypto.id
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${crypto.color} rounded-lg flex items-center justify-center`}>
                          <crypto.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${selectedCrypto?.id === crypto.id ? "text-white" : "text-black"}`}>{crypto.name}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`text-xs ${selectedCrypto?.id === crypto.id ? "text-gray-300" : "text-gray-600"}`}>{crypto.symbol}</p>
                        <div className="flex items-center gap-1">
                          <span className={`text-sm font-semibold ${selectedCrypto?.id === crypto.id ? "text-white" : "text-black"}`}>
                            {formatCurrency(crypto.currentPrice)}
                          </span>
                          {crypto.change24h >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Conversion Info */}
            {selectedCrypto && topupAmount && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">You will receive:</span>
                  <span className="text-xl font-bold text-black">
                    {formatCrypto(calculateCryptoAmount(parseFloat(topupAmount), selectedCrypto), selectedCrypto.symbol)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Network fee:</span>
                  <span>
                    {formatCrypto(selectedCrypto.networkFee, selectedCrypto.symbol)} ≈ {formatCurrency(selectedCrypto.networkFee * selectedCrypto.currentPrice)}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleTopUp}
              disabled={!selectedCrypto || !topupAmount}
              className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <ArrowDownLeft className="w-5 h-5" />
              Generate Deposit Address
            </motion.button>
          </div>

          {/* Right Column - Deposit Address */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            {selectedCrypto && topupAmount ? (
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-black mb-4">Deposit Address</h2>

                {/* QR Code Placeholder */}
                <div className="flex justify-center mb-4">
                  <div className="w-48 h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send {selectedCrypto.symbol} to this address:
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex-1 font-mono text-xs text-gray-600 truncate">
                      {selectedCrypto.address}
                    </div>
                    <button
                      onClick={() => handleCopyAddress(selectedCrypto.address)}
                      className="p-2 bg-white hover:bg-gray-100 border border-gray-200 rounded transition-all"
                    >
                      {copiedAddress ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-black">Send exact amount</p>
                      <p className="text-gray-600">
                        {formatCrypto(calculateCryptoAmount(parseFloat(topupAmount), selectedCrypto), selectedCrypto.symbol)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-black">Network confirmations</p>
                      <p className="text-gray-600">Credited after network confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-black">Minimum deposit</p>
                      <p className="text-gray-600">{formatCrypto(selectedCrypto.minAmount, selectedCrypto.symbol)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-900">
                      <strong>Important:</strong> Only send {selectedCrypto.name} to this address. Sending other cryptocurrencies may result in permanent loss.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black mb-2">Ready to Top Up?</h3>
                <p className="text-sm text-gray-600">
                  Select a cryptocurrency and enter amount to generate your deposit address.
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
        >
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {transactions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-black">Recent Top-ups</h3>
                </div>
                {transactions.map((transaction) => {
                  const crypto = cryptoCurrencies.find(c => c.id === transaction.cryptoId);
                  return (
                    <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 bg-gradient-to-br ${crypto?.color || "from-gray-500 to-gray-700"} rounded-lg flex items-center justify-center`}>
                            {crypto && <crypto.icon className="w-5 h-5 text-white" />}
                          </div>
                          <div>
                            <p className="font-semibold text-black">{formatCrypto(transaction.amount, crypto?.symbol || "")}</p>
                            <p className="text-sm text-gray-600">{formatCurrency(transaction.usdAmount)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {transaction.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{new Date(transaction.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-16 text-center">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No top-up history yet.</p>
                <button
                  onClick={() => setActiveTab("deposit")}
                  className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Make Your First Deposit
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
