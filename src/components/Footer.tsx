"use client";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 lg:py-20 text-center">

        {/* Top Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm mb-8 sm:mb-10">
          <Link
            href="/#support"
            className="text-black hover:text-gray-600 px-2 py-1 cursor-pointer"
          >
            Support
          </Link>

          <Link
            href="/#faq"
            className="text-black hover:text-gray-600 px-2 py-1 cursor-pointer"
          >
            FAQ
          </Link>

          <Link href="/terms" className="text-black hover:text-gray-600 px-2 py-1">
            Terms
          </Link>

          <Link href="/privacy" className="text-black hover:text-gray-600 px-2 py-1">
            Privacy
          </Link>
        </nav>

        {/* Brand */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
          PayWithCryptoCard
        </h2>

        {/* Copyright */}
        <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-10">
          © {currentYear} PayWithCryptoCard, Inc. All Rights Reserved
        </p>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2">
          <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed">
            PayWithCryptoCard is a financial technology company, NOT A BANK.
            PayWithCryptoCard will automatically convert all cryptocurrency to
            U.S. dollars for use in purchases. The PayWithCryptoCard Virtual
            Visa® Card is issued by our partner Financial Institutions,
            pursuant to a license from VISA Inc.
          </p>

          <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed">
            Visa is a registered trademark of Visa International Service
            Association. All trademarks displayed on this website are held by
            their respective owners.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;