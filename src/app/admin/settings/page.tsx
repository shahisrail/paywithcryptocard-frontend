"use client";

import { useState, useEffect } from "react";
import {
  Settings,
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

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">Crypto Deposit Addresses</p>
            <p className="text-blue-800">
              These are the wallet addresses where users will send their cryptocurrency deposits.
              When users select a cryptocurrency, they will see the corresponding address from this page.
              Make sure to update these addresses with your actual wallet addresses.
            </p>
          </div>
        </div>
      </div>

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
                <div key={crypto.key} className="space-y-2">
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

        {/* Platform Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-black" />
            <h2 className="text-xl font-semibold text-gray-900">Platform Settings</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Deposit Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={localSettings.minimumDeposit}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        minimumDeposit: parseFloat(e.target.value) || 0,
                      })
                    }
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Minimum amount users can deposit
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Issuance Fee (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={localSettings.cardIssuanceFee}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        cardIssuanceFee: parseFloat(e.target.value) || 0,
                      })
                    }
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Fee charged when users create virtual cards
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Platform Status</p>
                <p className="text-sm text-gray-500">
                  {localSettings.isActive ? "Platform is active" : "Platform is disabled"}
                </p>
              </div>
              <button
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    isActive: !localSettings.isActive,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.isActive ? "bg-black" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-900">
              <p className="font-medium mb-2">Important Notice</p>
              <ul className="space-y-1 text-amber-800">
                <li>• Only update these addresses if you have access to the corresponding wallets</li>
                <li>• Users will send deposits to these addresses</li>
                <li>• Changing addresses will immediately affect what users see</li>
                <li>• Make sure addresses are correct before saving</li>
                <li>• Always test with small amounts first</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
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
