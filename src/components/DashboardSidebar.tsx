"use client";

import { usePathname, useRouter } from "next/navigation";
import { CreditCard, ArrowUpRight, ArrowDownLeft, LogOut, Settings, Home, User, X, Menu } from "lucide-react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useState, useEffect } from "react";
import { logoutUser } from "@/redux/slices/authSlice";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoggingOut } = useAppSelector((state) => state.auth);
  const [showBalance, setShowBalance] = useState(true);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigation = [
    {
      name: "Add Funds",
      href: "/dashboard/topup",
      icon: ArrowDownLeft,
    },
    {
      name: "My Cards",
      href: "/dashboard/cards",
      icon: CreditCard,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: ArrowUpRight,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-full
        transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-6 flex items-center justify-between flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-black tracking-tight" onClick={onClose}>
              PayWithCryptoCard
            </Link>
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>


        {/* User Info */}
        <div className="px-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">
                {user?.fullName || "User"}
              </p>
              <p className="text-xs text-black truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-black uppercase tracking-wide">Balance</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-black">
                  {showBalance
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(user?.balance || 0)
                    : "••••••"}
                </span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-black hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showBalance ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <nav className="px-4 space-y-2 mt-8">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white font-medium"
                    : "text-black hover:text-black hover:bg-gray-50 font-medium"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

          <div className="mt-auto p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-4 py-4 text-black hover:text-black hover:bg-gray-50 rounded-lg transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <LogOut className="w-5 h-5" />
              {isLoggingOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
