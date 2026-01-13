"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  PlusCircle,
  History,
  Settings,
  User,
  Wallet,
  ArrowRightLeft,
  LogOut,
  Menu,
  X,
  Bell,
  Shield,
  FileText
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser, selectUserBalance, logoutUser } from "@/redux/slices/authSlice";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }: DashboardSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // Get user data from Redux
  const user = useAppSelector(selectUser);
  const balance = useAppSelector(selectUserBalance);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
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
      href: "/dashboard",
      icon: Home,
      color: "text-gray-600",
    },
    {
      name: "My Cards",
      href: "/dashboard/cards",
      icon: CreditCard,
      color: "text-indigo-600",
      badge: 3,
    },
    {
      name: "Create Card",
      href: "/dashboard/create-card",
      icon: PlusCircle,
      color: "text-emerald-600",
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: History,
      color: "text-blue-600",
    },
    {
      name: "Top Up",
      href: "/dashboard/topup",
      icon: ArrowRightLeft,
      color: "text-purple-600",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
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
    <>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PayWithCrypto</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
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
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : item.color}`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-lg">
                    {item.badge}
                  </span>
                )}
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
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {user?.fullName ? getInitials(user.fullName) : <User className="w-6 h-6 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user?.fullName || 'Loading...'}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email || ''}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Balance</p>
              <p className="font-bold text-gray-900">{formatCurrency(balance || 0)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Role</p>
              <p className="font-bold text-gray-900 capitalize">{user?.role || 'User'}</p>
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
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};

export default DashboardSidebar;