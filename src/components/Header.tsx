"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    dispatch(logoutUser() as any);
    router.push("/");
    setMobileMenuOpen(false);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // Special handling for Support link - open chat widget AND scroll to support section
    if (targetId === 'support') {
      // Open the chat widget
      window.dispatchEvent(new CustomEvent('open-chat-widget'));

      // Also scroll to support section if it exists on current page
      const element = document.getElementById(targetId);
      if (element) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300); // Slight delay to let chat widget open first
      }

      setMobileMenuOpen(false);
      return;
    }

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
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Close button */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-black">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  link.href.startsWith('#') ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        handleScroll(e, link.href.substring(1));
                        setMobileMenuOpen(false);
                      }}
                      className="block py-3 px-4 text-base font-medium text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 px-4 text-base font-medium text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
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
        </>
      )}
    </header>
  );
};

export default Header;
