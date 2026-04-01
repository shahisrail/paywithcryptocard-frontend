"use client";

import { ReactNode, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAppSelector } from "@/redux/hooks";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-30">
          <Link href="/dashboard" className="text-xl font-bold text-black tracking-tight">
            PayWithCryptoCard
          </Link>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <DashboardSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-4 md:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
