"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 flex-shrink-0">
            <div className="px-8">
              <div className="flex items-center justify-between h-16">
                <h1 className="text-xl font-semibold text-black">Dashboard</h1>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.fullName?.charAt(0) || "U"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
