"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownLeft,
  Copy,
  Check,
  Bitcoin,
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useGetDepositAddressesQuery } from "@/redux/services/depositApi";
import { useCreateDepositMutation } from "@/redux/services/depositApi";
import { useGetMyDepositsQuery } from "@/redux/services/depositApi";
import { convertUsdToCrypto } from "@/utils/coingecko";

const CRYPTOCURRENCIES = {
  BTC: {
    name: "Bitcoin",
    icon: Bitcoin,
    color: "from-orange-400 to-orange-600",
  },
  ETH: {
    name: "Ethereum",
    icon: Wallet,
    color: "from-blue-400 to-blue-600",
  },
  USDT_ERC20: {
    name: "USDT (ERC20)",
    icon: Wallet,
    color: "from-green-400 to-green-600",
  },
  USDT_TRC20: {
    name: "USDT (TRC20)",
    icon: Wallet,
    color: "from-red-400 to-red-600",
  },
  XMR: {
    name: "Monero",
    icon: Wallet,
    color: "from-gray-400 to-gray-600",
  },
};

type CryptoCurrency = keyof typeof CRYPTOCURRENCIES;

export default function TopUpPage() {
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [amount, setAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<"deposit" | "history">("deposit");
  const [step, setStep] = useState<1 | 2>(1); // 1: Select crypto, 2: Submit deposit
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Convert USD to crypto when amount or crypto changes
  useEffect(() => {
    const convertAmount = async () => {
      if (!amount || !selectedCrypto) {
        setCryptoAmount(null);
        return;
      }

      const usdAmount = parseFloat(amount);
      if (isNaN(usdAmount) || usdAmount <= 0) {
        setCryptoAmount(null);
        return;
      }

      setIsConverting(true);
      try {
        const converted = await convertUsdToCrypto(usdAmount, selectedCrypto);
        setCryptoAmount(converted);
      } catch (err) {
        console.error('Conversion error:', err);
        setCryptoAmount(null);
      } finally {
        setIsConverting(false);
      }
    };

    convertAmount();
  }, [amount, selectedCrypto]);

  // API calls
  const { data: addressesData, isLoading: addressesLoading } = useGetDepositAddressesQuery();
  const { data: depositsData, isLoading: depositsLoading, refetch } = useGetMyDepositsQuery({
    limit: 20,
  });
  const [createDeposit, { isLoading: isCreating }] = useCreateDepositMutation();

  // API returns addresses directly with uppercase keys: BTC, ETH, USDT_ERC20, etc.
  const cryptoAddresses = addressesData?.data || {
    BTC: "",
    ETH: "",
    USDT_ERC20: "",
    USDT_TRC20: "",
    XMR: "",
    minimumDeposit: 10,
  };
  const minimumDeposit = cryptoAddresses.minimumDeposit || 10;
  const deposits = depositsData?.data?.deposits || [];

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleGenerateAddress = () => {
    if (!selectedCrypto || !amount) return;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < minimumDeposit) {
      setError(`Minimum deposit is $${minimumDeposit}`);
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmitDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrypto || !amount || !txHash || !cryptoAmount) {
      setError("Please fill in all fields");
      return;
    }

    const usdAmount = parseFloat(amount);
    // API uses uppercase keys matching the currency enum
    const walletAddress = cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses] as string;

    if (!walletAddress) {
      setError("Deposit address not available. Please contact support.");
      return;
    }

    try {
      setError("");
      // Send crypto amount and USD amount
      await createDeposit({
        currency: selectedCrypto,
        amount: cryptoAmount, // Send the crypto amount
        walletAddress: walletAddress,
        txHash,
        usdAmount: usdAmount, // Send the USD amount for admin to see
      }).unwrap();

      setSuccess("Deposit request submitted successfully!");
      setStep(1);
      setSelectedCrypto(null);
      setAmount("");
      setCryptoAmount(null);
      setTxHash("");
      refetch();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err: any) {
      setError(err.data?.message || "Failed to submit deposit. Please try again.");
    }
  };

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
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
            activeTab === "deposit" ? "text-black" : "text-gray-600 hover:text-black"
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
            activeTab === "history" ? "text-black" : "text-gray-600 hover:text-black"
          }`}
        >
          History
          {activeTab === "history" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
          )}
        </button>
      </div>

      {activeTab === "deposit" && (
        <>
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-900 font-medium">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-900 font-medium">{error}</p>
              </div>
            </div>
          )}

          {addressesLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          ) : step === 1 ? (
            /* Step 1: Select Crypto & Amount */
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Amount Input */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-black mb-4">Enter Amount</h2>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      USD Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                        $
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min={minimumDeposit}
                        className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg text-2xl font-bold text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Minimum deposit: ${minimumDeposit}
                    </p>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[50, 100, 250, 500].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
                        className="py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-black font-medium transition-all"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  {/* Conversion Display */}
                  {cryptoAmount !== null && selectedCrypto && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-700 font-medium mb-1">
                            You will send
                          </p>
                          <p className="text-2xl font-bold text-green-900">
                            {isConverting ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Converting...
                              </span>
                            ) : (
                              <>
                                {cryptoAmount < 0.01
                                  ? cryptoAmount.toFixed(8)
                                  : cryptoAmount.toFixed(6)}{' '}
                                {selectedCrypto}
                              </>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-700 font-medium mb-1">
                            Current value
                          </p>
                          <p className="text-lg font-bold text-green-900">
                            ${parseFloat(amount)}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-green-700 mt-2">
                        ✓ Real-time conversion using CoinGecko API
                      </p>
                    </div>
                  )}

                  {/* Crypto Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Cryptocurrency
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(CRYPTOCURRENCIES).map(([key, crypto]) => {
                        const Icon = crypto.icon;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedCrypto(key as CryptoCurrency)}
                            className={`p-4 rounded-lg border transition-all ${
                              selectedCrypto === key
                                ? "bg-black text-white border-black"
                                : "bg-white border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className={`w-8 h-8 bg-gradient-to-br ${crypto.color} rounded-lg flex items-center justify-center`}
                              >
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <p
                                  className={`font-semibold text-sm ${
                                    selectedCrypto === key ? "text-white" : "text-black"
                                  }`}
                                >
                                  {crypto.name}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateAddress}
                  disabled={!selectedCrypto || !amount}
                  className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowDownLeft className="w-5 h-5" />
                  Generate Deposit Address
                </button>
              </div>

              {/* Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 sticky top-24">
                  <div className="flex items-start gap-2 mb-4">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Deposit Instructions
                      </h3>
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li>1. Select cryptocurrency</li>
                        <li>2. Enter USD amount</li>
                        <li>3. Get deposit address</li>
                        <li>4. Send crypto to address</li>
                        <li>5. Submit transaction hash</li>
                        <li>6. Wait for admin approval</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-900">
                      <strong>Important:</strong> Deposits are manually reviewed by admin.
                      Approval typically takes 1-24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Deposit Address & Submit */
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Deposit Address Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-black mb-4">
                    Deposit {CRYPTOCURRENCIES[selectedCrypto!].name}
                  </h2>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Send {selectedCrypto} to this address:
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-white border border-gray-300 rounded-lg">
                      <div className="flex-1 font-mono text-xs text-gray-600 break-all">
                        {(cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses] as string) || "Address not configured"}
                      </div>
                      <button
                        onClick={() =>
                          handleCopyAddress(
                            (cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses] as string) || ""
                          )
                        }
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded transition-all flex-shrink-0"
                        disabled={!cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses]}
                      >
                        {copiedAddress ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                    {!(cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses] as string) && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-xs text-yellow-800">
                          ⚠️ Deposit address not configured. Please contact support or try again later.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit Transaction Hash */}
                  <form onSubmit={handleSubmitDeposit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Hash (TXID) *
                      </label>
                      <input
                        type="text"
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        placeholder="Paste your transaction hash here"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        You can find this in your wallet after sending the transaction
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-yellow-900">
                          <p className="font-medium mb-1">Before submitting:</p>
                          <ul className="space-y-1 text-yellow-800">
                            <li>• Send exactly {formatCurrency(parseFloat(amount))}</li>
                            <li>• Use the correct network</li>
                            <li>• Copy the transaction hash from your wallet</li>
                            <li>• Deposit will be reviewed by admin</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setError("");
                        }}
                        className="flex-1 px-6 py-3 border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isCreating}
                        className="flex-1 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                      >
                        {isCreating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Submit Deposit
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Summary Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
                  <h3 className="font-semibold text-black mb-4">Deposit Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cryptocurrency</span>
                      <span className="text-sm font-medium text-black flex items-center gap-2">
                        {CRYPTOCURRENCIES[selectedCrypto!].name}
                        {(cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses] as string) ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">You send</span>
                      <span className="text-sm font-bold text-black">
                        {cryptoAmount !== null
                          ? `${cryptoAmount < 0.01
                              ? cryptoAmount.toFixed(8)
                              : cryptoAmount.toFixed(6)} ${selectedCrypto}`
                          : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">USD Value</span>
                      <span className="text-sm font-medium text-black">
                        {formatCurrency(parseFloat(amount))}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-black">You will receive</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(parseFloat(amount))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "history" && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {depositsLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          ) : deposits.length === 0 ? (
            <div className="p-16 text-center">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No deposit history yet.</p>
              <button
                onClick={() => setActiveTab("deposit")}
                className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
              >
                Make Your First Deposit
              </button>
            </div>
          ) : (
            <div>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">Deposit History</h3>
                <div className="text-sm text-gray-500">
                  Total: {deposits.length} deposit{deposits.length !== 1 ? 's' : ''}
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {deposits.map((deposit: any) => {
                  const crypto = CRYPTOCURRENCIES[deposit.currency as CryptoCurrency];
                  const Icon = crypto?.icon || Wallet;

                  // Status badge colors
                  const getStatusBadge = (status: string) => {
                    switch (status) {
                      case "approved":
                        return "bg-green-100 text-green-700 border-green-200";
                      case "rejected":
                        return "bg-red-100 text-red-700 border-red-200";
                      case "pending":
                      default:
                        return "bg-yellow-100 text-yellow-700 border-yellow-200";
                    }
                  };

                  // Status icon
                  const getStatusIcon = (status: string) => {
                    switch (status) {
                      case "approved":
                        return <CheckCircle className="w-4 h-4" />;
                      case "rejected":
                        return <XCircle className="w-4 h-4" />;
                      case "pending":
                      default:
                        return <Clock className="w-4 h-4" />;
                    }
                  };

                  return (
                    <div key={deposit._id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${crypto?.color || "from-gray-500 to-gray-700"} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-black">{crypto?.name || deposit.currency}</p>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                                  deposit.status
                                )}`}
                              >
                                {getStatusIcon(deposit.status)}
                                {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">
                              {deposit.amount} {deposit.currency}
                            </p>
                            {deposit.txHash && (
                              <p className="text-xs text-gray-500 font-mono truncate max-w-md mt-1" title={deposit.txHash}>
                                TX: {deposit.txHash}
                              </p>
                            )}
                            {deposit.walletAddress && (
                              <p className="text-xs text-gray-500 font-mono truncate max-w-md mt-1" title={deposit.walletAddress}>
                                To: {deposit.walletAddress}
                              </p>
                            )}
                            {deposit.rejectionReason && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                <p className="text-xs text-red-700 font-medium flex items-center gap-1">
                                  <XCircle className="w-3 h-3" />
                                  Rejection Reason: {deposit.rejectionReason}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-500">{formatDate(deposit.createdAt)}</p>
                          {deposit.usdAmount && (
                            <p className="text-sm font-semibold text-green-600 mt-1">
                              +{formatCurrency(deposit.usdAmount)}
                            </p>
                          )}
                          {deposit.status === 'pending' && (
                            <p className="text-xs text-yellow-600 mt-1">
                              ⏳ Awaiting approval
                            </p>
                          )}
                          {deposit.status === 'approved' && (
                            <p className="text-xs text-green-600 mt-1">
                              ✓ Approved
                            </p>
                          )}
                          {deposit.status === 'rejected' && (
                            <p className="text-xs text-red-600 mt-1">
                              ✗ Rejected
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
