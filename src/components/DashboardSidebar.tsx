"use client";

import { usePathname, useRouter } from "next/navigation";
import { CreditCard, ArrowUpRight, ArrowDownLeft, LogOut, Settings, Home, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [showBalance, setShowBalance] = useState(true);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "My Cards",
      href: "/dashboard/cards",
      icon: CreditCard,
    },
    {
      name: "Add Funds",
      href: "/dashboard/topup",
      icon: ArrowDownLeft,
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

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
      <div className="p-6">
        <Link href="/" className="text-xl font-bold text-black tracking-tight">
          PayWithCryptoCard
        </Link>
      </div>

      <nav className="px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
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
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

