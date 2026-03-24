"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logoutUser() as any);
    router.push("/");
    setMobileMenuOpen(false);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // First check if the element exists on current page
    const element = document.getElementById(targetId);

    if (element) {
      // Element exists on current page, scroll to it
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Element doesn't exist on current page, redirect to home page with hash
      if (typeof window !== 'undefined') {
        window.location.href = '/#' + targetId;
      }
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
    { href: "#support", label: "Support" },
  ];

  return (
    <header className="bg-gray-200 border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl sm:text-3xl md:text-3xl font-bold text-black tracking-tight">
              PayWithCryptoCard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href.substring(1))}
                  className="text-sm sm:text-base font-medium text-black hover:text-gray-700 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm sm:text-base font-medium text-black hover:text-gray-700 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3 sm:gap-4">
            {isAuthenticated && user ? (
              <>
                {user.role === "admin" ? (
                  <Link
                    href="/admin"
                    className="px-5 sm:px-6 py-2.5 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/topup"
                    className="px-5 sm:px-6 py-2.5 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 sm:px-6 py-2.5 text-sm font-medium text-black border border-gray-300 rounded-lg hover:border-black transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 sm:px-6 py-2.5 text-sm font-semibold text-black border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 sm:px-6 py-2.5 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-300 bg-gray-200">
          <div className="px-3 sm:px-6 lg:px-8 py-4 space-y-3">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleScroll(e, link.href.substring(1));
                    setMobileMenuOpen(false);
                  }}
                  className="block py-2 text-base font-medium text-black hover:text-gray-700 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-black hover:text-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}

            {/* Auth Buttons */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {isAuthenticated && user ? (
                <>
                  {user.role === "admin" ? (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-5 py-3 text-center text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard/topup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-5 py-3 text-center text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3 text-sm font-medium text-black border border-gray-300 rounded-lg hover:border-black transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-5 py-3.5 text-center text-base font-semibold text-black border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-5 py-3.5 text-center text-base font-semibold text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
