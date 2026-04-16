"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Lock,
  Ban,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminStatusMutation,
  useDeleteAdminMutation,
  useUpdateAdminPasswordMutation,
} from "@/redux/services/adminApi";
import { useAppSelector } from "@/redux/hooks";

export default function AdminManagementPage() {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form state
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [newPassword, setNewPassword] = useState("");

  // API hooks
  const { data: adminsData, isLoading, refetch } = useGetAllAdminsQuery({
    search,
    limit: 50,
    skip: 0,
  });

  const [createAdmin, { isLoading: creating }] = useCreateAdminMutation();
  const [updateAdminStatus, { isLoading: updatingStatus }] =
    useUpdateAdminStatusMutation();
  const [deleteAdmin, { isLoading: deleting }] = useDeleteAdminMutation();
  const [updateAdminPassword, { isLoading: updatingPassword }] =
    useUpdateAdminPasswordMutation();

  const admins = adminsData?.data?.admins || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAdmin.email || !newAdmin.password || !newAdmin.fullName) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (newAdmin.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setErrorMessage("");
      await createAdmin(newAdmin).unwrap();
      setSuccessMessage("Admin created successfully!");
      setShowCreateModal(false);
      setNewAdmin({ email: "", password: "", fullName: "" });
      refetch();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to create admin");
    }
  };

  const handleToggleStatus = async (adminId: string, currentStatus: boolean) => {
    try {
      setErrorMessage("");
      await updateAdminStatus({ id: adminId, isActive: !currentStatus }).unwrap();
      setSuccessMessage(`Admin ${!currentStatus ? "activated" : "deactivated"} successfully!`);
      refetch();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to update admin status");
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    try {
      setErrorMessage("");
      await deleteAdmin(adminId).unwrap();
      setSuccessMessage("Admin deleted successfully!");
      setShowDeleteModal(null);
      refetch();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to delete admin");
    }
  };

  const handleUpdatePassword = async (adminId: string) => {
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setErrorMessage("");
      await updateAdminPassword({ id: adminId, newPassword }).unwrap();
      setSuccessMessage("Password updated successfully!");
      setShowPasswordModal(null);
      setNewPassword("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.data?.message || "Failed to update password");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8  text-black" />
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage admin accounts and permissions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 "
        >
          <Plus className="w-4 h-4" />
          Add New Admin
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2  -/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search admins by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      {/* Admins List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {admins.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No admins found</p>
            <p className="text-sm mt-1">
              {search ? "Try a different search term" : "Create your first admin"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Admin
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Created
                  </th>
                  <th className="text-center p-4 text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {admins.map((admin: any) => (
                  <tr key={admin._id || admin.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {admin.fullName?.charAt(0).toUpperCase() || "A"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {admin.fullName || "Unknown"}
                          </p>
                          {admin._id === currentUser?.id && (
                            <span className="text-xs text-purple-600 font-medium">
                              (You)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{admin.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          admin.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {formatDate(admin.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Update Password */}
                        <button
                          onClick={() => setShowPasswordModal(admin._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg "
                          title="Change Password"
                        >
                          <Lock className="w-4 h-4 text-gray-600" />
                        </button>

                        {/* Toggle Status - Can't disable yourself */}
                        {admin._id !== currentUser?.id && (
                          <button
                            onClick={() =>
                              handleToggleStatus(admin._id, admin.isActive)
                            }
                            disabled={updatingStatus}
                            className="p-2 hover:bg-gray-100 rounded-lg  disabled:opacity-50"
                            title={admin.isActive ? "Deactivate" : "Activate"}
                          >
                            <Ban className="w-4 h-4 text-orange-600" />
                          </button>
                        )}

                        {/* Delete - Can't delete yourself */}
                        {admin._id !== currentUser?.id && (
                          <button
                            onClick={() => setShowDeleteModal(admin._id)}
                            className="p-2 hover:bg-red-50 rounded-lg "
                            title="Delete Admin"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Create New Admin
            </h2>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newAdmin.fullName}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  minLength={6}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewAdmin({ email: "", password: "", fullName: "" });
                    setErrorMessage("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  minLength={6}
                  placeholder="Enter new password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowPasswordModal(null);
                    setNewPassword("");
                    setErrorMessage("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdatePassword(showPasswordModal)}
                  disabled={updatingPassword}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  {updatingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Delete Admin
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this admin? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAdmin(showDeleteModal)}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
