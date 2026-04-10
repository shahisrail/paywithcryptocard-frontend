"use client";

import { useState } from "react";
import {
  Wallet,
  CheckCircle,
  XCircle,
  Loader2,
  Bitcoin,
  Info,
  Filter,
  Eye,
  Copy,
} from "lucide-react";
import { useGetAllDepositsQuery } from "@/redux/services/adminApi";
import { useApproveDepositMutation } from "@/redux/services/adminApi";
import { useRejectDepositMutation } from "@/redux/services/adminApi";
import { useToast } from "@/contexts/ToastContext";

const CRYPTOCURRENCIES = {
  BTC: { name: "Bitcoin", icon: Bitcoin, color: "text-orange-500" },
  ETH: { name: "Ethereum", icon: Wallet, color: "text-blue-500" },
  USDT_ERC20: { name: "USDT (ERC20)", icon: Wallet, color: "text-green-500" },
  USDT_TRC20: { name: "USDT (TRC20)", icon: Wallet, color: "text-red-500" },
  XMR: { name: "Monero", icon: Wallet, color: "text-gray-500" },
};

type DepositStatus = "all" | "pending" | "approved" | "rejected";

export default function AdminDepositsPage() {
  const { showSuccess, showError, showInfo } = useToast();
  const [statusFilter, setStatusFilter] = useState<DepositStatus>("pending");
  const [rejectReasons, setRejectReasons] = useState<Record<string, string>>(
    {}
  );
  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [viewModal, setViewModal] = useState<any>(null);
  const [copied, setCopied] = useState("");

  const {
    data: depositsData,
    isLoading,
    refetch,
  } = useGetAllDepositsQuery({
    status: statusFilter,
    limit: 50,
  });
  const [approveDeposit, { isLoading: approving }] =
    useApproveDepositMutation();
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

  const handleApprove = async (
    depositId: string,
    usdAmount?: number,
    userEmail?: string
  ) => {
    if (!usdAmount || usdAmount <= 0) {
      showError("Invalid USD amount");
      return;
    }

    try {
      await approveDeposit({ depositId, usdAmount }).unwrap();
      showSuccess(
        `Deposit of $${usdAmount.toFixed(2)} approved for ${
          userEmail || "user"
        }`
      );
      refetch();
    } catch (err: any) {
      showError(err.data?.message || "Failed to approve deposit");
    }
  };

  const handleReject = async (depositId: string) => {
    const reason = rejectReasons[depositId];
    if (!reason || reason.trim().length < 10) {
      showError("Please provide a reason (min 10 characters)");
      return;
    }

    try {
      await rejectDeposit({ depositId, reason }).unwrap();
      showSuccess("Deposit rejected successfully");
      setRejectModal(null);
      setRejectReasons({ ...rejectReasons, [depositId]: "" });
      refetch();
    } catch (err: any) {
      showError(err.data?.message || "Failed to reject deposit");
    }
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    showInfo(`${label} copied to clipboard`);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleViewDetails = (deposit: any) => {
    setViewModal(deposit);
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Deposit Management
        </h1>
        <p className="text-gray-600">
          Review and approve/reject user deposit requests
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Status:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All ({depositsData?.data?.total || 0})
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("approved")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "approved"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setStatusFilter("rejected")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>
      </div>

      {/* Deposits List */}
      <div className="space-y-4">
        {deposits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
            <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No deposits found</p>
            <p className="text-sm text-gray-500">
              {statusFilter === "pending"
                ? "No pending deposits to review"
                : "No deposits match your criteria"}
            </p>
          </div>
        ) : (
          deposits.map((deposit: any) => {
            const crypto =
              CRYPTOCURRENCIES[
                deposit.currency as keyof typeof CRYPTOCURRENCIES
              ];
            const Icon = crypto?.icon || Wallet;

            return (
              <div
                key={deposit._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Section - User & Crypto Info */}
                  <div className="flex-1 space-y-4">
                    {/* User Info */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-600">
                          {(
                            deposit.userId?.fullName ||
                            deposit.user?.fullName ||
                            "U"
                          )
                            ?.charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {deposit.userId?.fullName ||
                            deposit.user?.fullName ||
                            "Unknown User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {deposit.userId?.email ||
                            deposit.user?.email ||
                            "Unknown email"}
                        </p>
                      </div>
                    </div>

                    {/* Crypto & Amount */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <Icon
                          className={`w-5 h-5 ${
                            crypto?.color || "text-gray-500"
                          }`}
                        />
                        <div>
                          <p className="text-xs text-gray-600">
                            Cryptocurrency
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {deposit.currency}
                          </p>
                        </div>
                      </div>

                      <div className="px-3 py-2 bg-gray-50 rounded-lg flex-1">
                        <p className="text-xs text-gray-600">Amount Sent</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {deposit.amount < 0.01
                            ? deposit.amount.toFixed(8)
                            : deposit.amount.toFixed(6)}{" "}
                          {deposit.currency}
                        </p>
                      </div>

                      <div className="px-3 py-2 bg-green-50 rounded-lg flex-1">
                        <p className="text-xs text-gray-600">USD Value</p>
                        <p className="text-sm font-bold text-green-900">
                          {deposit.usdAmount
                            ? formatCurrency(deposit.usdAmount)
                            : "-"}
                        </p>
                        {deposit.usdAmount && <p> </p>}
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Status & Actions */}
                  <div className="flex flex-col lg:items-end gap-3">
                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        deposit.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : deposit.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {deposit.status.charAt(0).toUpperCase() +
                        deposit.status.slice(1)}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleViewDetails(deposit)}
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>

                      {deposit.status === "pending" && (
                        <>
                          <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-xs text-green-600">Credit</p>
                            <p className="text-sm font-bold text-green-700">
                              {formatCurrency(deposit.usdAmount || 0)}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              handleApprove(
                                deposit._id,
                                deposit.usdAmount,
                                deposit.user?.email
                              )
                            }
                            disabled={approving}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                            title={`User sent ${deposit.amount} ${
                              deposit.currency
                            } = ${formatCurrency(deposit.usdAmount || 0)}`}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>

                          <button
                            onClick={() => setRejectModal(deposit._id)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>

                    {/* Date */}
                    <p className="text-xs text-gray-500">
                      {formatDate(deposit.createdAt)}
                    </p>
                  </div>
                </div>

                {/* TX Hash & Wallet - Show in compact row */}
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* TX Hash */}
                  <div className="flex items-start gap-2">
                    <p className="text-xs text-gray-600 flex-shrink-0 mt-0.5">
                      TX Hash:
                    </p>
                    {deposit.txHash ? (
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-mono text-gray-900 cursor-pointer hover:text-blue-600 truncate"
                          title={deposit.txHash}
                          onClick={() =>
                            handleCopyToClipboard(deposit.txHash, "TX Hash")
                          }
                        >
                          {deposit.txHash}
                          <Copy className="w-3 h-3 inline ml-1 text-gray-400" />
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Not provided
                      </span>
                    )}
                  </div>

                  {/* Wallet Address */}
                  <div className="flex items-start gap-2">
                    <p className="text-xs text-gray-600 flex-shrink-0 mt-0.5">
                      Wallet:
                    </p>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-mono text-gray-900 cursor-pointer hover:text-blue-600 truncate"
                        title={deposit.walletAddress}
                        onClick={() =>
                          handleCopyToClipboard(
                            deposit.walletAddress,
                            "Wallet Address"
                          )
                        }
                      >
                        {deposit.walletAddress}
                        <Copy className="w-3 h-3 inline ml-1 text-gray-400" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Reject Deposit
            </h3>
            <textarea
              value={rejectReasons[rejectModal] || ""}
              onChange={(e) =>
                setRejectReasons({
                  ...rejectReasons,
                  [rejectModal]: e.target.value,
                })
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

      {/* View Details Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Deposit Details
              </h2>
              <button
                onClick={() => setViewModal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    viewModal.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : viewModal.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {viewModal.status.charAt(0).toUpperCase() +
                    viewModal.status.slice(1)}
                </span>
              </div>

              {/* User Information */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">User Information</p>
                <p className="text-sm font-semibold text-gray-900">
                  {viewModal.userId?.fullName ||
                    viewModal.user?.fullName ||
                    "Unknown User"}
                </p>
                <p className="text-xs text-gray-600">
                  {viewModal.userId?.email ||
                    viewModal.user?.email ||
                    "No email"}
                </p>
              </div>

              {/* Cryptocurrency & Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Cryptocurrency</p>
                  <p className="text-sm font-bold text-gray-900">
                    {viewModal.currency}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Crypto Amount</p>
                  <p className="text-sm font-bold text-gray-900">
                    {viewModal.amount < 0.01
                      ? viewModal.amount.toFixed(8)
                      : viewModal.amount.toFixed(6)}{" "}
                    {viewModal.currency}
                  </p>
                </div>
              </div>

              {/* USD Amount */}
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">USD Value</p>
                <p className="text-2xl font-bold text-green-900">
                  {viewModal.usdAmount
                    ? formatCurrency(viewModal.usdAmount)
                    : "N/A"}
                </p>
                {viewModal.usdAmount && (
                  <p className="text-xs text-green-700 mt-1">
                    Auto-converted from CoinGecko
                  </p>
                )}
              </div>

              {/* Wallet Address */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-600">Wallet Address</p>
                  <button
                    onClick={() =>
                      handleCopyToClipboard(viewModal.walletAddress, "wallet")
                    }
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    {copied === "wallet" ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs font-mono text-gray-900 break-all">
                  {viewModal.walletAddress}
                </p>
              </div>

              {/* Transaction Hash */}
              {viewModal.txHash && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-600">
                      Transaction Hash (TXID)
                    </p>
                    <button
                      onClick={() =>
                        handleCopyToClipboard(viewModal.txHash, "txhash")
                      }
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {copied === "txhash" ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-mono text-gray-900 break-all">
                    {viewModal.txHash}
                  </p>
                </div>
              )}

              {/* Rejection Reason */}
              {viewModal.status === "rejected" && viewModal.rejectionReason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-700 mb-1">Rejection Reason</p>
                  <p className="text-sm text-red-900">
                    {viewModal.rejectionReason}
                  </p>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Created At</p>
                  <p className="text-xs text-gray-900">
                    {formatDate(viewModal.createdAt)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Updated At</p>
                  <p className="text-xs text-gray-900">
                    {formatDate(viewModal.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setViewModal(null)}
                className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
