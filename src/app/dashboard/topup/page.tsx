"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowDownLeft,
  Copy,
  Check,
  CheckCircle,
  AlertCircle,
  Loader2,
  XCircle,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import {
  useGetDepositAddressesQuery,
  useCreateDepositMutation,
  useGetMyDepositsQuery,
  Deposit,
} from "@/redux/services/depositApi";
import { convertUsdToCrypto } from "@/utils/coingecko";

const CRYPTOCURRENCIES = {
  BTC: {
    name: "Bitcoin",
    icon: "/deposit/bitcoin-removebg-preview.webp",
  },
  ETH: {
    name: "Ethereum",
    icon: "/deposit/ETH__2_-removebg-preview.webp",
  },
  USDT_ERC20: {
    name: "Tether (ERC20)",
    icon: "/deposit/trx.webp",
  },
  USDT_TRC20: {
    name: "Tether (TRC20)",
    icon: "/deposit/images__2_-removebg-preview.webp",
  },
  USDC_ERC20: {
    name: "USD Coin (ERC20)",
    icon: "/logos/usd-coin-usdc-logo.webp",
  },
  XMR: {
    name: "Monero",
    icon: "/deposit/XMR__1_-removebg-preview.webp",
  },
};

type CryptoCurrency = keyof typeof CRYPTOCURRENCIES;

export default function TopUpPage() {
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(
    null
  );
  const [amount, setAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<"deposit" | "history">("deposit");
  const [step, setStep] = useState<1 | 2>(1); // 1: Select crypto & amount, 2: Show address
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const EXCHANGE_FEE = 0.025; // 2.5% exchange fee
  const PAYMENT_TIMEOUT = 30 * 60; // 30 minutes in seconds

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
        console.error("Conversion error:", err);
        setCryptoAmount(null);
      } finally {
        setIsConverting(false);
      }
    };

    convertAmount();
  }, [amount, selectedCrypto]);

  // Countdown timer for payment expiration
  useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // Reset timer when not in step 2
      setTimeRemaining(PAYMENT_TIMEOUT);
      setIsExpired(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // API calls
  const { data: addressesData, isLoading: addressesLoading } =
    useGetDepositAddressesQuery();
  const {
    data: depositsData,
    isLoading: depositsLoading,
    refetch,
  } = useGetMyDepositsQuery({
    limit: 20,
  });

  // API returns addresses directly with uppercase keys: BTC, ETH, USDT_ERC20, etc.
  const cryptoAddresses = addressesData?.data || {
    BTC: "",
    ETH: "",
    USDT_ERC20: "",
    USDT_TRC20: "",
    USDC_ERC20: "",
    XMR: "",
    minimumDeposit: 10,
  };
  const minimumDeposit = cryptoAddresses.minimumDeposit || 10;
  const deposits = depositsData?.data?.deposits || [];

  // Format amount with appropriate decimals for each cryptocurrency
  const formatAmount = (crypto: string, amount: number | null): string => {
    if (amount === null) return "0";

    const value = parseFloat(amount.toString());

    switch (crypto) {
      case "BTC":
        return value.toFixed(8); // max 8 decimals (Bitcoin standard)
      case "ETH":
        return value.toFixed(6); // UI safe
      case "USDT_ERC20":
        return value.toFixed(2); // stablecoin
      case "USDT_TRC20":
        return value.toFixed(2); // stablecoin
      case "USDC_ERC20":
        return value.toFixed(2); // stablecoin
      case "XMR":
        return value.toFixed(6); // safe for UI
      default:
        return value.toString();
    }
  };

  // Generate QR data for different crypto types
  const getQRData = (
    crypto: string,
    address: string,
    amount: number | null
  ) => {
    // Validate address first
    if (!address || address.trim() === "") {
      return "";
    }

    // Trim address to remove any whitespace
    const trimmedAddress = address.trim();

    // Bitcoin - BIP21 URI scheme
    if (crypto === "BTC") {
      const cleanAmount = formatAmount(crypto, amount);
      return `bitcoin:${trimmedAddress}?amount=${cleanAmount}`;
    }

    // Ethereum - EIP-681 URI scheme
    if (crypto === "ETH") {
      const cleanAmount = formatAmount(crypto, amount);
      return `ethereum:${trimmedAddress}?amount=${cleanAmount}`;
    }

    // USDT (TRC20) - TRON URI scheme
    if (crypto === "USDT_TRC20") {
      const cleanAmount = formatAmount(crypto, amount);
      return `tron:${trimmedAddress}?amount=${cleanAmount}`;
    }

    // USDT (ERC20) - Ethereum URI without amount (user selects token manually)
    if (crypto === "USDT_ERC20") {
      return `ethereum:${trimmedAddress}`;
    }

    // USDC (ERC20) - Ethereum URI without amount (user selects token manually)
    if (crypto === "USDC_ERC20") {
      return `ethereum:${trimmedAddress}`;
    }

    // Monero - Use Monero URI scheme
    if (crypto === "XMR") {
      // Basic validation: should be 95 or 106 characters and start with 4, 8, or 5
      const isValidLength =
        trimmedAddress.length === 95 || trimmedAddress.length === 106;
      const isValidPrefix =
        trimmedAddress.startsWith("4") ||
        trimmedAddress.startsWith("8") ||
        trimmedAddress.startsWith("5");

      // Only validate if clearly invalid (wrong length or doesn't start with correct char)
      // Otherwise allow it - Trust Wallet will validate the actual address
      if (!isValidLength || !isValidPrefix) {
        console.warn("Monero address may be invalid:", {
          address: trimmedAddress,
          length: trimmedAddress.length,
          firstChar: trimmedAddress[0],
        });
      }

      // Return Monero URI even if validation fails - let Trust Wallet validate
      return `monero:${trimmedAddress}`;
    }

    // Fallback to just trimmed address
    return trimmedAddress;
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
          Add Funds
        </h1>
        <p className="text-black">Top up your account with cryptocurrency</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("deposit")}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === "deposit"
              ? "text-black"
              : "text-black hover:text-black"
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
              : "text-black hover:text-black"
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
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              {/* Crypto Selection - FIRST on mobile, SECOND on desktop (via order classes if needed, or just standard grid) */}
              {/* Desktop: Order 2. Mobile: Order 1. */}
              <div className="order-1 lg:order-2 space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <label className="block text-lg font-bold text-black mb-6">
                    1. Select Cryptocurrency
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                    {Object.entries(CRYPTOCURRENCIES).map(([key, crypto]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCrypto(key as CryptoCurrency)}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                          selectedCrypto === key
                            ? "bg-black text-white border-black"
                            : "bg-white border-gray-50 hover:border-gray-200"
                        }`}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white/10 p-1">
                          <img
                            src={crypto.icon}
                            alt={crypto.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p
                            className={`font-bold text-sm sm:text-base truncate ${
                              selectedCrypto === key
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            {crypto.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amount Input - SECOND on mobile, FIRST on desktop */}
              <div className="order-2 lg:order-1 space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold text-black">
                      2. Enter Amount
                    </h2>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-bold text-black mb-3">
                      Amount in USD
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-black">
                        $
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min={minimumDeposit}
                        className="w-full pl-12 pr-6 py-5 border-2 border-gray-50 rounded-xl text-3xl md:text-4xl font-black text-black placeholder-gray-200 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-500">
                      Minimum deposit:{" "}
                      <span className="text-black font-bold">
                        ${minimumDeposit}
                      </span>
                    </p>
                  </div>
                  {/* Quick Amount Buttons */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[100, 250, 500, 1000].map((amt) => (
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
                          <p className="text-xl md:text-2xl font-bold text-green-900">
                            {isConverting ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Converting...
                              </span>
                            ) : (
                              <>
                                {formatAmount(selectedCrypto, cryptoAmount)}{" "}
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
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-700">
                            Exchange Fee (2.5%)
                          </span>
                          <span className="font-semibold text-black">
                            -{formatCurrency(parseFloat(amount) * EXCHANGE_FEE)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-green-700 font-medium">
                            You will receive
                          </span>
                          <span className="text-lg font-bold text-green-900">
                            {formatCurrency(
                              parseFloat(amount) * (1 - EXCHANGE_FEE)
                            )}
                          </span>
                        </div>
                      </div>
                      {/* <p className="text-xs text-green-700 mt-2">
                        ✓ Real-time conversion using CoinGecko API
                      </p> */}
                    </div>
                  )}

                  <button
                    onClick={handleGenerateAddress}
                    disabled={
                      !selectedCrypto ||
                      !amount ||
                      parseFloat(amount) < minimumDeposit ||
                      isConverting
                    }
                    className="w-full px-8 py-5 bg-black text-white font-bold rounded-xl hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-lg shadow-xl shadow-black/10 active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isConverting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : null}
                    {isConverting ? "Converting..." : "Complete Payment"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Deposit Address & QR */
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
                  {/* QR & Address Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-black text-black">
                            Complete Payment
                          </h2>
                          <p className="text-gray-500 font-medium">
                            Scan QR or Copy Address
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div
                            className={`px-4 py-2 rounded-xl font-mono font-bold text-xl ${
                              isExpired
                                ? "bg-red-50 text-red-600"
                                : "bg-black text-white"
                            }`}
                          >
                            {formatTime(timeRemaining)}
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">
                            Payment Window
                          </span>
                        </div>
                      </div>

                      {/* QR Code Section */}
                      <div className="flex flex-col items-center mb-8">
                        <div className="bg-white p-6 rounded-3xl border-4 border-gray-50 shadow-inner mb-4">
                          <QRCodeCanvas
                            value={getQRData(
                              selectedCrypto!,
                              cryptoAddresses[
                                selectedCrypto! as keyof typeof cryptoAddresses
                              ] as string,
                              cryptoAmount || 0
                            )}
                            size={220}
                            level={"H"}
                            includeMargin={false}
                          />
                        </div>
                        <p className="text-sm font-bold text-black bg-gray-100 px-4 py-2 rounded-full">
                          Send exactly{" "}
                          {formatAmount(selectedCrypto!, cryptoAmount)}{" "}
                          {selectedCrypto}
                        </p>
                      </div>

                      {/* Address Section */}
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                          Wallet Address
                        </label>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-gray-200 transition-all group">
                          <div className="flex-1 font-mono text-sm font-bold text-black break-all leading-relaxed">
                            {(cryptoAddresses[
                              selectedCrypto! as keyof typeof cryptoAddresses
                            ] as string) || "Not Set"}
                          </div>
                          <button
                            onClick={() =>
                              handleCopyAddress(
                                cryptoAddresses[
                                  selectedCrypto! as keyof typeof cryptoAddresses
                                ] as string
                              )
                            }
                            className="p-3 bg-white text-black rounded-xl shadow-sm hover:shadow-md active:scale-90 transition-all border border-gray-100"
                            disabled={isExpired}
                          >
                            {copiedAddress ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {(selectedCrypto === "USDT_ERC20" ||
                        selectedCrypto === "USDC_ERC20" ||
                        selectedCrypto === "XMR") && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 text-sm">
                          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <p className="text-blue-900 font-medium leading-relaxed">
                            After scanning, make sure to manually enter the
                            amount:{" "}
                            <span className="font-black underline">
                              {formatAmount(selectedCrypto, cryptoAmount)}{" "}
                              {selectedCrypto}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 px-8 py-4 bg-white border-2 border-gray-200 text-black font-bold rounded-xl hover:bg-gray-50 transition-all"
                      >
                        Change Selection
                      </button>
                      <button
                        onClick={() => router.push("/dashboard/transactions")}
                        className="flex-1 px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-black/10"
                      >
                        I have paid
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary Card Order 1 on mobile, 2 on desktop */}
                <div className="lg:col-span-2 order-1 lg:order-2">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 lg:sticky lg:top-8 shadow-sm">
                    <h3 className="text-xl font-black text-black mb-6 border-b border-gray-100 pb-4">
                      Order Summary
                    </h3>

                    <div className="space-y-5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-bold">Asset</span>
                        <div className="flex items-center gap-2 font-black text-black">
                          <img
                            src={CRYPTOCURRENCIES[selectedCrypto!].icon}
                            className="w-5 h-5 object-contain"
                          />
                          {CRYPTOCURRENCIES[selectedCrypto!].name}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-bold">
                          Total to send
                        </span>
                        <span className="font-black text-black">
                          {formatAmount(selectedCrypto!, cryptoAmount)}{" "}
                          {selectedCrypto}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-bold">
                          USD Value
                        </span>
                        <span className="font-black text-black">
                          {formatCurrency(parseFloat(amount))}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-50">
                        <span className="text-gray-500 font-bold">
                          Credit to wallet
                        </span>
                        <span className="text-xl font-black text-green-600">
                          {formatCurrency(
                            parseFloat(amount) * (1 - EXCHANGE_FEE)
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 bg-black/5 rounded-2xl p-5">
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-xs text-gray-600">
                          <CheckCircle className="w-4 h-4 text-black flex-shrink-0" />
                          <span>
                            Funds will be credited after 1 network confirmation
                          </span>
                        </li>
                        <li className="flex gap-3 text-xs text-gray-600">
                          <CheckCircle className="w-4 h-4 text-black flex-shrink-0" />
                          <span>
                            Exchange rate is locked for {PAYMENT_TIMEOUT / 60}{" "}
                            minutes
                          </span>
                        </li>
                      </ul>
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
              <p className="text-black mb-4">No deposit history yet.</p>
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
                <h3 className="text-lg font-semibold text-black">
                  Deposit History
                </h3>
                <div className="text-sm text-black">
                  Total: {deposits.length} deposit
                  {deposits.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {deposits.map((deposit: Deposit) => {
                  const crypto =
                    CRYPTOCURRENCIES[deposit.currency as CryptoCurrency];

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
                        return <Loader2 className="w-4 h-4 animate-spin" />;
                    }
                  };

                  return (
                    <div
                      key={deposit._id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img
                              src={crypto?.icon || "/deposit/btc.svg"}
                              alt={crypto?.name || deposit.currency}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-black">
                                {crypto?.name || deposit.currency}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                                  deposit.status
                                )}`}
                              >
                                {getStatusIcon(deposit.status)}
                                {deposit.status.charAt(0).toUpperCase() +
                                  deposit.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-black font-medium">
                              {deposit.amount} {deposit.currency}
                            </p>
                            {deposit.txHash && (
                              <p
                                className="text-xs text-black font-mono truncate max-w-md mt-1"
                                title={deposit.txHash}
                              >
                                TX: {deposit.txHash}
                              </p>
                            )}
                            {deposit.walletAddress && (
                              <p
                                className="text-xs text-black font-mono truncate max-w-md mt-1"
                                title={deposit.walletAddress}
                              >
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
                          <p className="text-xs text-black">
                            {formatDate(deposit.createdAt)}
                          </p>
                          {deposit.usdAmount && (
                            <p className="text-sm font-semibold text-green-600 mt-1">
                              +{formatCurrency(deposit.usdAmount)}
                            </p>
                          )}
                          {deposit.status === "pending" && (
                            <p className="text-xs text-yellow-600 mt-1">
                              ⏳ Awaiting approval
                            </p>
                          )}
                          {deposit.status === "approved" && (
                            <p className="text-xs text-green-600 mt-1">
                              ✓ Approved
                            </p>
                          )}
                          {deposit.status === "rejected" && (
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
