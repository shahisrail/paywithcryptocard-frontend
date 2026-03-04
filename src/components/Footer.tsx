"use client";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-black">PayWithCryptoCard</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Turn cryptocurrency into a virtual Visa card for online payments.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-black">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-gray-600 text-sm hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 text-sm hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-black">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="text-gray-600 text-sm hover:text-black transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 text-sm hover:text-black transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {currentYear} PayWithCryptoCard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;