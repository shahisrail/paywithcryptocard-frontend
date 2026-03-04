"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logoutUser() as any);
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-black tracking-tight">PayWithCryptoCard</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-black hover:text-gray-700 transition-colors">
              Home
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-black hover:text-gray-700 transition-colors">
              How It Works
            </Link>
            <Link href="#faq" className="text-sm font-medium text-black hover:text-gray-700 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Auth Buttons - Desktop Only */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                {/* Show Dashboard button if logged in */}
                {user.role === "admin" ? (
                  <Link
                    href="/admin"
                    className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:border-black transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:border-black transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
