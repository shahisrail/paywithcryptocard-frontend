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
import { useToast } from "@/contexts/ToastContext";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";

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
  const { showSuccess, showError } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(
    null
  );
  const [amount, setAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<"deposit" | "history">("deposit");
  const [step, setStep] = useState<1 | 2>(1); // 1: Select crypto, 2: Show address
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "waiting">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const EXCHANGE_FEE = 0.025; // 2.5% exchange fee
  const PAYMENT_TIMEOUT = 30 * 60; // 30 minutes in seconds

  // Load payment status from localStorage on mount
  useEffect(() => {
    const savedStatus = localStorage.getItem("paymentStatus");
    if (savedStatus === "waiting") {
      setPaymentStatus("waiting");
    }
  }, []);

  // Save payment status to localStorage
  useEffect(() => {
    localStorage.setItem("paymentStatus", paymentStatus);
  }, [paymentStatus]);

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
      // Reset timer when entering step 2
      setTimeRemaining(PAYMENT_TIMEOUT);
      setIsExpired(false);

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
      // Reset timer when going back to step 1
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

  // Poll for user balance updates every 10 seconds when on deposit page
  const { data: currentUserData } = useGetCurrentUserQuery(undefined, {
    pollingInterval: 10000, // Refetch every 10 seconds
  });

  const [createDeposit] = useCreateDepositMutation();

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

  const handleCopyAmount = () => {
    if (cryptoAmount !== null && selectedCrypto) {
      const amountText = formatAmount(selectedCrypto, cryptoAmount);
      navigator.clipboard.writeText(amountText);
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    }
  };

  const handleGenerateAddress = () => {
    if (!selectedCrypto || !amount) return;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < minimumDeposit) {
      setError(`Minimum deposit is $${minimumDeposit}`);
      return;
    }
    setError("");
    setPaymentStatus("idle");
    localStorage.removeItem("paymentStatus");
    setStep(2);
  };

  const handlePaymentSent = async () => {
    if (!selectedCrypto || !cryptoAmount) return;

    setIsSubmitting(true);
    setError("");

    try {
      const usdAmount = parseFloat(amount) * (1 - EXCHANGE_FEE);

      await createDeposit({
        currency: selectedCrypto,
        amount: cryptoAmount,
        walletAddress: cryptoAddresses[selectedCrypto],
        usdAmount,
      }).unwrap();

      setPaymentStatus("waiting");
    } catch (err: any) {
      console.error("Deposit error:", err);
      showError(err.data?.message || "Failed to submit payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="space-y-3 md:space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-black">
          Add Funds
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("deposit")}
          className={`px-3 py-2 md:px-4 md:py-2 font-medium transition-colors relative ${
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
          className={`px-3 py-2 md:px-4 md:py-2 font-medium transition-colors relative ${
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 md:p-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-900 font-medium">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 md:p-3">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-900 font-medium">{error}</p>
              </div>
            </div>
          )}

          {addressesLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          ) : step === 1 ? (
            /* Step 1: Select Crypto & Amount */
            <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4">
            <div className="order-2 md:order-1 space-y-3">
                {/* Amount Input */}
                <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
                  <h2 className="text-base font-semibold text-black mb-2 md:mb-3">
                    Enter Amount
                  </h2>

                  <div className="mb-3 md:mb-4">
                    <label className="block text-sm font-medium text-black mb-2">
                      USD Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-black text-base md:text-lg">
                        $
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setSelectedPreset(null);
                        }}
                        placeholder="0.00"
                        min={minimumDeposit}
                        className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-lg md:text-xl font-bold text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <p className="mt-1.5 text-xs md:text-sm text-black">
                      Minimum: ${minimumDeposit}
                    </p>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-3 md:mb-4">
                    {[100, 250, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setAmount(amt.toString());
                          setSelectedPreset(amt);
                        }}
                        className={`py-2 md:py-2.5 rounded-lg font-medium transition-all text-sm ${
                          selectedPreset === amt
                            ? "bg-black text-white border-2 border-black"
                            : "bg-gray-50 text-black border-2 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  {/* Conversion Display */}
                  {cryptoAmount !== null && selectedCrypto && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2 md:p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-green-700 font-medium mb-1">
                            You will send
                          </p>
                          <p className="text-base md:text-lg font-bold text-green-900">
                            {isConverting ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
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
                          <p className="text-xs text-green-700 font-medium mb-1">
                            Current value
                          </p>
                          <p className="text-base md:text-lg font-bold text-green-900">
                            ${parseFloat(amount)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-green-200">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-700">
                            Exchange Fee (2.5%)
                          </span>
                          <span className="font-semibold text-black">
                            -{formatCurrency(parseFloat(amount) * EXCHANGE_FEE)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-green-700 font-medium">
                            You will receive
                          </span>
                          <span className="text-base md:text-lg font-bold text-green-900">
                            {formatCurrency(
                              parseFloat(amount) * (1 - EXCHANGE_FEE)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Crypto Selection */}
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateAddress}
                  disabled={!selectedCrypto || !amount}
                  className="w-full py-2.5 md:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Pay with your chosen crypto
                </button>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Select Cryptocurrency
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(CRYPTOCURRENCIES).map(([key, crypto]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCrypto(key as CryptoCurrency)}
                        className={`p-2 md:p-3 rounded-lg border transition-all ${
                          selectedCrypto === key
                            ? "bg-black text-white border-black"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1.5 md:gap-2">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img
                              src={crypto.icon}
                              alt={crypto.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div className="text-center">
                            <p
                              className={`font-semibold text-xs ${
                                selectedCrypto === key
                                  ? "text-white"
                                  : "text-black"
                              }`}
                            >
                              {crypto.name}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Deposit Address & Submit */
            <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Deposit Address Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h2 className="text-base md:text-lg font-semibold text-black">
                      Deposit {CRYPTOCURRENCIES[selectedCrypto!].name}
                    </h2>
                    {/* Countdown Timer */}
                    <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 border border-gray-300 rounded-lg font-mono font-bold text-base md:text-lg text-black">
                      {isExpired ? (
                        <span>Expired</span>
                      ) : (
                        <span>{formatTime(timeRemaining)}</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                    <label className="block text-sm font-medium text-black mb-2">
                      Send {selectedCrypto} to this address:
                    </label>
                    <div className="flex items-center gap-2 p-2 md:p-3 bg-white border border-gray-300 rounded-lg mb-3">
                      <div className="flex-1 font-mono text-xs text-black break-all">
                        {(cryptoAddresses[
                          selectedCrypto as keyof typeof cryptoAddresses
                        ] as string) || "Address not configured"}
                      </div>
                      <button
                        onClick={() =>
                          handleCopyAddress(
                            (cryptoAddresses[
                              selectedCrypto as keyof typeof cryptoAddresses
                            ] as string) || ""
                          )
                        }
                        className="p-1.5 md:p-2 bg-gray-100 hover:bg-gray-200 rounded transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={
                          !cryptoAddresses[
                            selectedCrypto as keyof typeof cryptoAddresses
                          ] || isExpired
                        }
                      >
                        {copiedAddress ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-black" />
                        )}
                      </button>
                    </div>

                    {/* Amount to send */}
                    {cryptoAmount !== null && selectedCrypto && (
                      <>
                        <label className="block text-sm font-medium text-black mb-2">
                          Amount to send:
                        </label>
                        <div className="flex items-center gap-2 p-2 md:p-3 bg-white border border-gray-300 rounded-lg mb-3">
                          <div className="flex-1 font-mono text-sm md:text-base text-black">
                            {formatAmount(selectedCrypto, cryptoAmount)} {selectedCrypto}
                          </div>
                          <button
                            onClick={handleCopyAmount}
                            className="p-1.5 md:p-2 bg-gray-100 hover:bg-gray-200 rounded transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isExpired}
                          >
                            {copiedAmount ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-black" />
                            )}
                          </button>
                        </div>
                      </>
                    )}

                    {/* QR Code */}
                    {selectedCrypto &&
                      (cryptoAddresses[
                        selectedCrypto as keyof typeof cryptoAddresses
                      ] as string) && (
                        <div className="flex justify-center mt-3 md:mt-4">
                          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 flex flex-col items-center">
                            <QRCodeCanvas
                              value={getQRData(
                                selectedCrypto,
                                cryptoAddresses[
                                  selectedCrypto as keyof typeof cryptoAddresses
                                ] as string,
                                cryptoAmount || 0
                              )}
                              size={160}
                              level={"H"}
                              includeMargin={false}
                            />
                            {/* <p className="text-xs text-black text-center mt-2 md:mt-3">
                              Scan with your crypto wallet app
                            </p> */}
                            {(selectedCrypto === "USDT_ERC20" ||
                              selectedCrypto === "USDT_TRC20" ||
                              selectedCrypto === "XMR") && (
                              <div className="mt-2 md:mt-3 p-2 md:p-3 bg-blue-50 border border-blue-200 rounded text-center w-full">
                                <p className="text-xs text-blue-900 font-medium">
                                  ℹ️ After scanning, manually enter the amount:{" "}
                                  {cryptoAmount !== null
                                    ? formatAmount(selectedCrypto, cryptoAmount)
                                    : "0"}{" "}
                                  {selectedCrypto}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    {/* "Send the exact amount" text */}
                    {selectedCrypto && cryptoAmount !== null && (
                      <div className="mt-3 md:mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                        <p className="text-sm md:text-base font-semibold text-black">
                          Send the exact amount to this address
                        </p>
                      </div>
                    )}

                    {/* Payment Confirmation Button */}
                    {paymentStatus === "idle" ? (
                      <button
                        onClick={handlePaymentSent}
                        disabled={isSubmitting || isExpired}
                        className="w-full mt-3 md:mt-4 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "I have sent the payment"
                        )}
                      </button>
                    ) : (
                      <div className="w-full mt-3 md:mt-4 py-2.5 md:py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-yellow-600" />
                          <p className="text-sm md:text-base font-semibold text-yellow-900">
                            Waiting for your payment
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={() => {
                      setStep(1);
                      setError("");
                      setPaymentStatus("idle");
                      localStorage.removeItem("paymentStatus");
                    }}
                    className="w-full px-4 md:px-6 py-2.5 md:py-3 border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Summary Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 sticky top-24">
                  <h3 className="font-semibold text-black mb-3 md:mb-4">
                    Deposit Summary
                  </h3>

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm text-black">Cryptocurrency</span>
                      <span className="text-xs md:text-sm font-medium text-black flex items-center gap-2">
                        {CRYPTOCURRENCIES[selectedCrypto!].name}
                        {(cryptoAddresses[
                          selectedCrypto as keyof typeof cryptoAddresses
                        ] as string)
                          ? " "
                          : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm text-black">You send</span>
                      <span className="text-xs md:text-sm font-bold text-black">
                        {cryptoAmount !== null
                          ? `${formatAmount(
                              selectedCrypto!,
                              cryptoAmount
                            )} ${selectedCrypto!}`
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm text-black">USD Value</span>
                      <span className="text-xs md:text-sm font-medium text-black">
                        {formatCurrency(parseFloat(amount))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm text-black">
                        Exchange Fee (2.5%)
                      </span>
                      <span className="text-xs md:text-sm font-medium text-black">
                        -{formatCurrency(parseFloat(amount) * EXCHANGE_FEE)}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 md:pt-3">
                      <div className="flex justify-between">
                        <span className="text-xs md:text-sm font-medium text-black">
                          You will receive
                        </span>
                        <span className="text-base md:text-lg font-bold text-black">
                          {formatCurrency(
                            parseFloat(amount) * (1 - EXCHANGE_FEE)
                          )}
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
            <div className="p-12 md:p-16 text-center">
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
              <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold text-black">
                  Deposit History
                </h3>
                <div className="text-xs md:text-sm text-black">
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
                        return <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />;
                      case "rejected":
                        return <XCircle className="w-3 h-3 md:w-4 md:h-4" />;
                      case "pending":
                      default:
                        return <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />;
                    }
                  };

                  return (
                    <div
                      key={deposit._id}
                      className="p-3 md:p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 md:gap-4">
                        <div className="flex items-center gap-3 md:gap-4 flex-1">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
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
                              <p className="font-semibold text-sm md:text-base text-black">
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
                            <p className="text-xs md:text-sm text-black font-medium">
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
                            <p className="text-xs md:text-sm font-semibold text-green-600 mt-1">
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
