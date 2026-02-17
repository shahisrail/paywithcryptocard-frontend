"use client";

import { useState } from "react";
import {
  Wallet,
  CheckCircle,
  XCircle,
  Loader2,
  Bitcoin,
  AlertCircle,
  Info,
} from "lucide-react";
import { useGetPendingDepositsQuery } from "@/redux/services/adminApi";
import { useApproveDepositMutation } from "@/redux/services/adminApi";
import { useRejectDepositMutation } from "@/redux/services/adminApi";

const CRYPTOCURRENCIES = {
  BTC: { name: "Bitcoin", icon: Bitcoin, color: "text-orange-500" },
  ETH: { name: "Ethereum", icon: Wallet, color: "text-blue-500" },
  USDT_ERC20: { name: "USDT (ERC20)", icon: Wallet, color: "text-green-500" },
  USDT_TRC20: { name: "USDT (TRC20)", icon: Wallet, color: "text-red-500" },
  XMR: { name: "Monero", icon: Wallet, color: "text-gray-500" },
};

export default function AdminDepositsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [approveAmounts, setApproveAmounts] = useState<Record<string, string>>({});
  const [rejectReasons, setRejectReasons] = useState<Record<string, string>>({});
  const [rejectModal, setRejectModal] = useState<string | null>(null);

  const { data: depositsData, isLoading, refetch } = useGetPendingDepositsQuery({ limit: 50 });
  const [approveDeposit, { isLoading: approving }] = useApproveDepositMutation();
  const [rejectDeposit, { isLoading: rejecting }] = useRejectDepositMutation();

  const deposits = depositsData?.data?.deposits || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleApprove = async (depositId: string) => {
    const amount = approveAmounts[depositId];
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid USD amount");
      return;
    }

    try {
      setErrorMessage("");
      await approveDeposit({ depositId, usdAmount: parseFloat(amount) }).unwrap();
      setSuccessMessage("Deposit approved successfully!");
      setApproveAmounts({ ...approveAmounts, [depositId]: "" });
      refetch();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to approve deposit");
    }
  };

  const handleReject = async (depositId: string) => {
    const reason = rejectReasons[depositId];
    if (!reason || reason.trim().length < 10) {
      setErrorMessage("Please provide a reason (min 10 characters)");
      return;
    }

    try {
      setErrorMessage("");
      await rejectDeposit({ depositId, reason }).unwrap();
      setSuccessMessage("Deposit rejected successfully!");
      setRejectModal(null);
      setRejectReasons({ ...rejectReasons, [depositId]: "" });
      refetch();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to reject deposit");
    }
  };

  if (isLoading) {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Deposit Management</h1>
        <p className="text-gray-600">Review and approve/reject user deposit requests</p>
      </div>

      {/* Messages */}
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
            <p className="font-medium mb-1">Deposit Approval Process</p>
            <ul className="space-y-1 text-blue-800 list-disc list-inside">
              <li>Review the transaction hash on the blockchain</li>
              <li>Enter the USD amount to credit the user</li>
              <li>Approve to credit user balance automatically</li>
              <li>Reject if the transaction is invalid or insufficient</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deposits List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {deposits.length === 0 ? (
          <div className="p-16 text-center">
            <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No pending deposits</p>
            <p className="text-sm text-gray-500">
              Deposits awaiting review will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">User</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Cryptocurrency</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Amount</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">TX Hash</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Wallet Address</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Date</th>
                  <th className="text-center p-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deposits.map((deposit: any) => {
                  const crypto = CRYPTOCURRENCIES[deposit.currency as keyof typeof CRYPTOCURRENCIES];
                  const Icon = crypto?.icon || Wallet;

                  return (
                    <tr key={deposit._id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {deposit.user?.fullName || "Unknown User"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {deposit.user?.email || deposit.userId}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${crypto?.color || "text-gray-500"}`} />
                          <span className="text-sm font-medium text-gray-900">
                            {deposit.currency}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-900 font-medium">
                          {deposit.amount} {deposit.currency}
                        </p>
                        {deposit.usdAmount && (
                          <p className="text-xs text-gray-500">
                            ≈ {formatCurrency(deposit.usdAmount)}
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        {deposit.txHash ? (
                          <p
                            className="text-xs text-gray-600 font-mono cursor-pointer hover:text-gray-900"
                            title={deposit.txHash}
                            onClick={() => {
                              navigator.clipboard.writeText(deposit.txHash);
                              setSuccessMessage("TX Hash copied!");
                              setTimeout(() => setSuccessMessage(""), 2000);
                            }}
                          >
                            {deposit.txHash.substring(0, 16)}...
                            <span className="ml-2 text-gray-400">(click to copy)</span>
                          </p>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Not provided</span>
                        )}
                      </td>
                      <td className="p-4">
                        <p
                          className="text-xs text-gray-600 font-mono cursor-pointer hover:text-gray-900 truncate max-w-[200px]"
                          title={deposit.walletAddress}
                          onClick={() => {
                            navigator.clipboard.writeText(deposit.walletAddress);
                            setSuccessMessage("Address copied!");
                            setTimeout(() => setSuccessMessage(""), 2000);
                          }}
                        >
                          {deposit.walletAddress.substring(0, 20)}...
                          <span className="ml-2 text-gray-400">(click to copy)</span>
                        </p>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {formatDate(deposit.createdAt)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="USD"
                            value={approveAmounts[deposit._id] || ""}
                            onChange={(e) =>
                              setApproveAmounts({
                                ...approveAmounts,
                                [deposit._id]: e.target.value,
                              })
                            }
                            className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <button
                            onClick={() => handleApprove(deposit._id)}
                            disabled={approving || !approveAmounts[deposit._id]}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectModal(deposit._id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Deposit</h3>
            <textarea
              value={rejectReasons[rejectModal] || ""}
              onChange={(e) =>
                setRejectReasons({ ...rejectReasons, [rejectModal]: e.target.value })
              }
              placeholder="Enter reason for rejection (min 10 characters)&#10;Example: Transaction not found on blockchain, insufficient confirmations, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setRejectModal(null);
                  setRejectReasons({ ...rejectReasons, [rejectModal]: "" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(rejectModal)}
                disabled={rejecting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
