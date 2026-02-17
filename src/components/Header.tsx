"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-50 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-black tracking-tight">PayWithCryptoCard</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-base font-medium text-black hover:text-gray-700 transition-colors">
              HOME
            </Link>
            <Link href="#how-it-works" className="text-base font-medium text-black hover:text-gray-700 transition-colors">
              HOW IT WORKS
            </Link>
            <Link href="#support" className="text-base font-medium text-black hover:text-gray-700 transition-colors">
              SUPPORT
            </Link>
            <Link href="#faq" className="text-base font-medium text-black hover:text-gray-700 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Auth Buttons - Desktop Only */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2.5 text-base font-medium text-black border border-gray-200 rounded-lg hover:border-black transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
