"use client";

import { useState } from "react";
import { X, Copy, Check } from "lucide-react";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${walletAddress}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">Add Funds</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Network Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Network</span>
              <span className="text-sm font-medium text-black">Ethereum (ERC-20)</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Token</span>
              <span className="text-sm font-medium text-black">USDC</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-48 h-48"
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
              Scan QR code to send USDC
            </p>
          </div>

          {/* Wallet Address */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Wallet Address
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-mono truncate">
                {walletAddress}
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Only send USDC on Ethereum network. Sending other tokens may result in permanent loss.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
