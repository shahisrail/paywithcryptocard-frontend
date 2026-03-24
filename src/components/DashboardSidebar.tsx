"use client";

import { usePathname, useRouter } from "next/navigation";
import { CreditCard, ArrowUpRight, ArrowDownLeft, LogOut, Settings, Home, User, X, Menu } from "lucide-react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { logoutUser } from "@/redux/slices/authSlice";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoggingOut } = useAppSelector((state) => state.auth);
  const [showBalance, setShowBalance] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-900 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isOpen ? 'fixed' : 'hidden'}
        md:static md:block
        inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200 flex-shrink-0 relative
        ${isOpen ? 'translate-x-0' : ''}
        transition-transform duration-300 ease-in-out
      `}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-black tracking-tight" onClick={closeMenu}>
            PayWithCryptoCard
          </Link>
          <button
            onClick={closeMenu}
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
              <p className="text-xs text-gray-500 truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Balance</span>
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
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white font-medium"
                    : "text-gray-600 hover:text-black hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 px-4 py-4 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            {isLoggingOut ? "Signing Out..." : "Sign Out"}
          </button>
        </div>
      </aside>
    </>
  );
}
