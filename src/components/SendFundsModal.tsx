"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

interface SendFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SendFundsModal({ isOpen, onClose }: SendFundsModalProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    if (step === 1 && recipient && amount) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSend = () => {
    // Handle send logic here
    setTimeout(() => {
      onClose();
      setStep(1);
      setRecipient("");
      setAmount("");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">
            {step === 1 ? "Send Funds" : "Confirm Transfer"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-6">
              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Enter Ethereum wallet address
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    USDC
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600">Available: 1,234.56 USDC</p>
                  <button
                    onClick={() => setAmount("1234.56")}
                    className="text-sm text-black font-medium hover:underline"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Network Fee */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Network Fee</span>
                  <span className="text-black font-medium">~$2.50</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">From</span>
                  <span className="text-sm font-medium text-black">Your Wallet</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">To</span>
                  <span className="text-sm font-medium text-black text-right max-w-[200px] truncate">
                    {recipient}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-lg font-semibold text-black">
                      {amount} USDC
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Network Fee</span>
                    <span className="text-sm font-medium text-black">~$2.50</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">Total</span>
                    <span className="text-xl font-bold text-black">
                      ${(parseFloat(amount || "0") + 2.50).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Cannot undo this transaction. Please verify the recipient address carefully.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          {step === 1 ? (
            <button
              onClick={handleContinue}
              disabled={!recipient || !amount}
              className="w-full px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSend}
                className="flex-1 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
              >
                Send Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
