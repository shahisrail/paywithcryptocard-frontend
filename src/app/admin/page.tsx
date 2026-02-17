"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  CreditCard,
  DollarSign,
  Activity,
  Eye,
  Ban,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { useGetDashboardStatsQuery } from "@/redux/services/adminApi";
import { useGetAllUsersQuery } from "@/redux/services/adminApi";
import { useGetPendingDepositsQuery } from "@/redux/services/adminApi";
import { useApproveDepositMutation } from "@/redux/services/adminApi";
import { useRejectDepositMutation } from "@/redux/services/adminApi";
import { useToggleUserStatusMutation } from "@/redux/services/adminApi";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  // API hooks
  const { data: statsData, isLoading: statsLoading, refetch: refetchStats } = useGetDashboardStatsQuery();
  const { data: usersData, isLoading: usersLoading, refetch: refetchUsers } = useGetAllUsersQuery({ limit: 5 });
  const { data: depositsData, isLoading: depositsLoading, refetch: refetchDeposits } = useGetPendingDepositsQuery({ limit: 5 });

  const [approveDeposit, { isLoading: approving }] = useApproveDepositMutation();
  const [rejectDeposit, { isLoading: rejecting }] = useRejectDepositMutation();
  const [toggleUserStatus] = useToggleUserStatusMutation();

  const [approveAmounts, setApproveAmounts] = useState<Record<string, string>>({});
  const [rejectReasons, setRejectReasons] = useState<Record<string, string>>({});
  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const stats = statsData?.data || {
    totalUsers: 0,
    activeUsers: 0,
    totalBalance: 0,
    totalCards: 0,
    totalDeposits: 0,
    pendingDeposits: 0,
  };

  const users = usersData?.data?.users || [];
  const pendingDeposits = depositsData?.data?.deposits || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
      refetchStats();
      refetchDeposits();
      refetchUsers();
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
      refetchStats();
      refetchDeposits();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to reject deposit");
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      setErrorMessage("");
      await toggleUserStatus({ userId, isActive: !currentStatus }).unwrap();
      setSuccessMessage(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      refetchStats();
      refetchUsers();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to update user status");
    }
  };

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div>
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{stats.activeUsers} active</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Balance</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalBalance)}</p>
          <p className="text-xs text-gray-500 mt-1">Across all users</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Cards</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalCards}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Pending Deposits</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.pendingDeposits}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/users"
            className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <Users className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Manage Users</p>
            <p className="text-sm text-gray-500">View and manage user accounts</p>
          </Link>
          <Link
            href="/admin/deposits"
            className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <Activity className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Deposit Reviews</p>
            <p className="text-sm text-gray-500">Approve or reject deposits</p>
          </Link>
          <Link
            href="/admin/settings"
            className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <AlertTriangle className="w-6 h-6 text-orange-600 mb-2" />
            <p className="font-medium text-gray-900">Settings</p>
            <p className="text-sm text-gray-500">Configure platform settings</p>
          </Link>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
          <Link
            href="/admin/users"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            View All Users →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {usersLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No users yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">User</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">Balance</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">Joined</th>
                    <th className="text-center p-4 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user: any) => (
                    <tr key={user._id || user.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">{user.fullName || 'Unknown'}</p>
                          <p className="text-sm text-gray-500">{user.email || 'No email'}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-900 font-medium">
                        {formatCurrency(user.balance || 0)}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {user.isActive ? "active" : "suspended"}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">{formatDate(user.createdAt || user.created)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/users?userId=${user._id || user.id}`}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="View User"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </Link>
                          <button
                            onClick={() => handleToggleUserStatus(user._id || user.id, user.isActive)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title={user.isActive ? "Suspend" : "Activate"}
                          >
                            <Ban className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pending Deposits */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Pending Deposits</h2>
          <Link
            href="/admin/deposits"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            View All Deposits →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {depositsLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          ) : pendingDeposits.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No pending deposits
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">User</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">Currency</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">TX Hash</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-center p-4 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingDeposits.map((deposit: any) => {
                    const userEmail = typeof deposit.user === 'object'
                      ? deposit.user?.email
                      : deposit.user;
                    const userName = typeof deposit.user === 'object'
                      ? deposit.user?.fullName
                      : 'Unknown';

                    return (
                      <tr key={deposit._id || deposit.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{userName || 'Unknown'}</p>
                            <p className="text-sm text-gray-500">{userEmail || deposit.userId}</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-900">{deposit.currency}</td>
                        <td className="p-4 text-sm text-gray-900">{deposit.amount}</td>
                        <td className="p-4">
                          <p className="text-xs text-gray-600 font-mono truncate max-w-xs" title={deposit.txHash}>
                            {deposit.txHash ? `${deposit.txHash.substring(0, 10)}...` : 'Pending'}
                          </p>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{formatDate(deposit.createdAt)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              placeholder="USD"
                              value={approveAmounts[deposit._id] || ""}
                              onChange={(e) => setApproveAmounts({ ...approveAmounts, [deposit._id]: e.target.value })}
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
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Deposit</h3>
            <textarea
              value={rejectReasons[rejectModal] || ""}
              onChange={(e) => setRejectReasons({ ...rejectReasons, [rejectModal]: e.target.value })}
              placeholder="Enter reason for rejection (min 10 characters)"
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
