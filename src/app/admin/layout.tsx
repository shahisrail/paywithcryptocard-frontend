"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  Users,
  CreditCard,
  ArrowRightLeft,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  Shield,
  FileText,
  UserCog,
  DollarSign
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser, logoutUser } from "@/redux/slices/authSlice";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";
import ProtectedRoute from "@/components/ProtectedRoute";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Get user data from Redux
  const user = useAppSelector(selectUser);

  // Fetch current user data
  const { data: currentUserData, refetch } = useGetCurrentUserQuery();

  // Update user data in Redux when fetched from API
  useEffect(() => {
    if (currentUserData?.data) {
      dispatch({
        type: 'auth/updateUser',
        payload: currentUserData.data,
      });
    }
  }, [currentUserData, dispatch]);

  // Refetch user data on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect to login even if API call fails
      router.push('/login');
    }
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Activity,
      color: "text-indigo-600",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      color: "text-blue-600",
    },
    {
      name: "Admin Management",
      href: "/admin/admins",
      icon: UserCog,
      color: "text-purple-600",
    },
    {
      name: "Deposits",
      href: "/admin/deposits",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      name: "Transactions",
      href: "/admin/transactions",
      icon: ArrowRightLeft,
      color: "text-orange-600",
    },
    {
      name: "Cards",
      href: "/admin/cards",
      icon: CreditCard,
      color: "text-pink-600",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      color: "text-gray-600",
    },
  ];

  const bottomItems = [
    {
      name: "Privacy Policy",
      href: "/privacy",
      icon: Shield,
      color: "text-gray-600",
    },
    {
      name: "Terms",
      href: "/terms",
      icon: FileText,
      color: "text-gray-600",
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : item.color}`} />
                <span className="ml-3 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Policy Links */}
        <div className="border-t border-gray-200 p-4">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {user?.fullName ? getInitials(user.fullName) : 'AD'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user?.fullName || 'Admin User'}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email || 'admin@paywithcryptocard.net'}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Role</p>
              <p className="font-bold text-gray-900 capitalize">{user?.role || 'Admin'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Balance</p>
              <p className="font-bold text-gray-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(user?.balance || 0)}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="responsive-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {sidebarItems.find(item => item.href === pathname)?.name || "Admin Dashboard"}
                  </h1>
                  <p className="text-sm text-gray-500">Manage your crypto card platform</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {user?.fullName ? getInitials(user.fullName) : 'AD'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
};

export default function AdminLayoutWrapper({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
