"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  Save,
  CheckCircle,
  XCircle,
  Loader2,
  Bitcoin,
  Info,
} from "lucide-react";
import { useGetAdminSettingsQuery } from "@/redux/services/adminApi";
import { useUpdateAdminSettingsMutation } from "@/redux/services/adminApi";

const CRYPTOCURRENCIES = [
  { key: "btc", name: "Bitcoin (BTC)", icon: Bitcoin, color: "text-orange-500" },
  { key: "eth", name: "Ethereum (ETH)", icon: Wallet, color: "text-blue-500" },
  { key: "usdtErc20", name: "USDT (ERC20)", icon: Wallet, color: "text-green-500" },
  { key: "usdtTrc20", name: "USDT (TRC20)", icon: Wallet, color: "text-red-500" },
  { key: "usdcErc20", name: "USDC (ERC20)", icon: Wallet, color: "text-blue-400" },
  { key: "xmr", name: "Monero (XMR)", icon: Wallet, color: "text-gray-500" },
];

export default function AdminSettingsPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // API hooks
  const { data: settingsData, isLoading: settingsLoading, refetch } = useGetAdminSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateAdminSettingsMutation();

  const settings = settingsData?.data || {
    cryptoAddresses: {
      btc: "",
      eth: "",
      usdtErc20: "",
      usdtTrc20: "",
      usdcErc20: "",
      xmr: "",
    },
    minimumDeposit: 10,
    cardIssuanceFee: 5,
    isActive: true,
  };

  const [localSettings, setLocalSettings] = useState(settings);

  // Update local settings when data loads
  useEffect(() => {
    if (settingsData?.data) {
      setLocalSettings(settingsData.data);
    }
  }, [settingsData]);

  const handleAddressChange = (cryptoKey: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      cryptoAddresses: {
        ...prev.cryptoAddresses,
        [cryptoKey]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      await updateSettings(localSettings).unwrap();

      setSuccessMessage("Settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      refetch();
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to save settings");
    }
  };

  if (settingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Settings</h1>
        <p className="text-gray-600">Configure crypto deposit addresses and platform settings</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-900 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-900 font-medium">{errorMessage}</p>
          </div>
        </div>
      )}

  

      <div className="space-y-8">
        {/* Crypto Addresses Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="w-6 h-6 text-black" />
            <h2 className="text-xl font-semibold text-gray-900">Crypto Deposit Addresses</h2>
          </div>

          <div className="space-y-6">
            {CRYPTOCURRENCIES.map((crypto) => {
              const Icon = crypto.icon;
              return (
                <div key={crypto.key} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Icon className={`w-5 h-5 ${crypto.color}`} />
                    {crypto.name} Address
                  </label>
                  <input
                    type="text"
                    value={localSettings.cryptoAddresses[crypto.key as keyof typeof localSettings.cryptoAddresses] || ""}
                    onChange={(e) => handleAddressChange(crypto.key, e.target.value)}
                    placeholder={`Enter your ${crypto.name} wallet address`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    Users will see this address when they select {crypto.name} for deposits
                  </p>
                </div>
              );
            })}
          </div>
        </div>

    
      

        {/* Save Button */}
        <div className="flex justify-center pb-24 lg:pb-8">
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
